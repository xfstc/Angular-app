import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User = {
    userName: "",
    password: "",
    _id: null
  }
  public warning: any;
  public loading: boolean = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.user = new User();
  }

  onSubmit(f: NgForm) {
    if (f.value.userName != "" && f.value.password != "") {
      this.loading = true;
      this.auth.login(this.user).subscribe((success) => {
        this.loading = false;
        localStorage.setItem('access_token', success.token);
        this.router.navigate(['/newReleases'])
      },
        (err) => {
          this.warning = err.error.message;
          this.loading = false;
        }
      )
    }
  }
}
