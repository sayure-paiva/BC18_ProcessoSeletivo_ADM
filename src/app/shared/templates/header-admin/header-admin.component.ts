import { Component, OnInit } from '@angular/core';
import { IsAdminGuard } from '../../guards/isAdmin/is-admin.guard';
import { IsRecruiterGuard } from '../../guards/isRecruiter/is-recruiter.guard';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent implements OnInit {

  isAdmin: boolean;
  isRecruiter = this.recruiterGuard.isRecruiter;

  constructor(
    public recruiterGuard: IsRecruiterGuard,
    public adminGuard: IsAdminGuard,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.adminGuard.isAthorized(true).subscribe((boolean) => {
      this.isAdmin = boolean;
    });
  }

}
