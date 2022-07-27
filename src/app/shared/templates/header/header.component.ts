import { Component, OnInit } from '@angular/core';
import { IsRecruiterGuard } from '../../guards/isRecruiter/is-recruiter.guard';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isRecruiter: boolean;

  constructor(
    private recruiterGuard: IsRecruiterGuard,
  ) { }

  ngOnInit(): void {
    this.recruiterGuard.isAthorized().subscribe(res => {
      this.isRecruiter = res;
    })
  }

}
