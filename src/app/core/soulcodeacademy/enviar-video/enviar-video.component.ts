import { Component, OnInit, ViewEncapsulation, TemplateRef, ViewChild  } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AngularFireFunctions } from "@angular/fire/compat/functions";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { Processo } from "src/app/shared/models/processo";
import { CoursesService } from "src/app/shared/services/courses.service";

@Component({
  selector: "app-enviar-video",
  templateUrl: "./enviar-video.component.html",
  styleUrls: ["./enviar-video.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class EnviarVideoComponent implements OnInit {
  @ViewChild('idNotFound', {static: true}) idNotFound : TemplateRef<any>;
  @ViewChild('videoSent', {static: true}) videoSent : TemplateRef<any>;

  curso: string = this.coursesService.formatarNomeDoCurso(
    this.route.snapshot.url.join("")
  );
  detalhesDoCurso: Processo = this.coursesService.detalhesDoCurso(this.curso);
  formEnvio: FormGroup;

  videoFile: File | null = null;
  labelArquivoMessage: string = "Selecionar arquivo";
  progress$: Observable<number>;
  sendButton: any = {
    icon: "cloud-upload",
    text: "ENVIAR VÍDEO",
    disabled: false,
  };
  title: string = `Enviar Vídeo ${this.detalhesDoCurso.tipo} - SoulCode Academy`;
  constructor(
    private coursesService: CoursesService,
    private route: ActivatedRoute,
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private fn: AngularFireFunctions,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private titleService: Title,

  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    
    this.formEnvio = this.fb.group({
      curso: [this.detalhesDoCurso.idTeachable, Validators.required],
      email: ["", [Validators.required, Validators.email]],
      file: [""],
    });
  }

  changeFile(e: any) {
    const file = e.target.files[0];
    if (file) {
      this.videoFile = file;
      // document.getElementById("labelArquivo").removeAttribute("style");
      this.labelArquivoMessage =
        file.name.length > 20 ? file.name.substring(0, 20) + "..." : file.name;
    } else {
      this.labelArquivoMessage = "Selecionar arquivo";
      document
        .getElementById("labelArquivo")
        .setAttribute(
          "style",
          "width: 100%; border-radius: 3px; border: 1px solid #ffffff; color: #767676; background: #ffffff;"
        );
      this.videoFile = null;
    }
  }
  onSubmit() {
    if (this.videoFile && this.formEnvio.valid) {
      this.sendButton.disabled = true;      
      this.sendButton.text = "ENVIANDO...";
      this.sendButton.icon = "clock";
      this.fn
        .httpsCallable("getEnrollmentId")({
          email: this.formEnvio.value.email,
          course: this.detalhesDoCurso.idTeachable,
        })
        .subscribe((enrollmentId) => {
          if (enrollmentId) {
            const filePath = `Processo Seletivo/Videos/${this.detalhesDoCurso.turma}/${enrollmentId}`;
            const fileRef = this.storage.ref(filePath);
            const task = this.storage.upload(filePath, this.videoFile);
            this.progress$ = task.percentageChanges()
            
            task
              .snapshotChanges()
              .pipe(
                finalize(() => {
                  fileRef.getDownloadURL().subscribe((url) => {
                    if (url) {
                      this.db.collection("Inscricao").doc(enrollmentId).update({
                        videoUrl: url,
                        videoStatus: "enviado",
                        videoEnviadoEm: new Date().toISOString(),
                      });
                      // this.progress$ = null;
                      // this.sendButton.disabled = false;
                      this.sendButton.text = "VÍDEO ENVIADO!";
                      this.sendButton.icon = "check";
                      this.modalService.open(this.videoSent, { centered: true });

                      
                      this.createUploadAttemptSuccess(enrollmentId, this.formEnvio.value.email, this.detalhesDoCurso.idTeachable, "Arquivo enviado com sucesso pelo usuário")
                    } else {
                      this.db.collection("Inscricao").doc(enrollmentId).update({
                        videoUrl: "",
                        videoStatus: "error",
                        videoEnviadoEm: "",
                      });
                      this.progress$ = null;
                      this.sendButton.disabled = false;
                      this.sendButton.text = "ENVIAR VÍDEO";
                      this.sendButton.icon = "cloud-upload";
                      this.createUploadAttemptError(enrollmentId, this.formEnvio.value.email, this.detalhesDoCurso.idTeachable, "Erro ao enviar arquivo")
                    }
                  });

                  this.sendButton.disabled = false;
                })
                
              )
              .subscribe();
          } else {
            this.modalService.open(this.idNotFound, { centered: true });
            this.sendButton.disabled = false;
            this.sendButton.text = "ENVIAR VÍDEO";
            this.sendButton.icon = "cloud-upload";
          }
        });

    }
  }

  async createUploadAttemptError(enrollmentId, email, course, message) {
    const docRef = this.db.collection("UploadVideo");
    try {
      if (enrollmentId) {
        await docRef.doc(enrollmentId).set({
          email,
          status: "error",
          message,
          courseIdAttempt: course,
          timestamp: Date.now()
        });
      } else {
        await docRef.add({
          email,
          status: "error",
          message,
          courseIdAttempt: course,
          timestamp: Date.now()
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async createUploadAttemptSuccess(enrollmentId, email, course, message) {
    const docRef = this.db.collection("UploadVideo");
    try {
        await docRef.doc(enrollmentId).set({
          email,
          status: "success",
          message,
          courseIdAttempt: course,
          timestamp: Date.now()
        });
    } catch (error) {
      console.error(error);
    }
  }
}
