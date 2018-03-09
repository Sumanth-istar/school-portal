import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticateService } from '../services/authService/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService, SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  private user: SocialUser;
  private loggedIn: boolean;

  constructor(private authService: AuthService, private router: Router, private spinnerService: Ng4LoadingSpinnerService, private route: ActivatedRoute, private http: HttpClient, private auth: AuthenticateService) { }

  ngOnInit() {

    this.form = new FormGroup({
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
    });




  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.signUpUsingGoogle();

  }

  public signUpUsingGoogle() {

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.loggedIn);
      if (this.loggedIn) {
        console.log(this.user.name);
        console.log(this.user.email);
        const req = this.auth.authenticateBySocialLogin(this.user.email);
        req.subscribe(
          // Successful responses call the first callback.
          data => {
            console.log(data['data']);
            this.auth.login(data['data']);
            this.router.navigate(['../dashboard'], { relativeTo: this.route });
          },
          // Errors will call this callback instead:
          err => {
            console.log('Something went wrong!');
          }
        );
      }

    });


  }


  signOut(): void {
    this.authService.signOut();
  }

  isFieldValid(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }

  isValid(field: string) {

    return this.form.get(field).valid && this.form.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-danger': this.isFieldValid(field),
      'has-success': this.isValid(field)
    };
  }

  onSubmit() {

    if (this.form.valid) {
      this.spinnerService.show();
      console.log('form submitted');

      const req = this.auth.authenticate(this.form.get('email').value, this.form.get('password').value);
      req.subscribe(
        // Successful responses call the first callback.
        data => {
          console.log(data['data']);
          this.auth.login(data['data']);
          this.spinnerService.hide();
          this.router.navigate(['../dashboard'], { relativeTo: this.route });
        },
        // Errors will call this callback instead:
        err => {
          console.log('Something went wrong!');
        }
      );

    } else {
      console.log('form invalid');
      Object.keys(this.form.controls).forEach(field => { // {1}
        const control = this.form.get(field);            // {2}
        control.markAsTouched({ onlySelf: true });       // {3}
      });

    }
  }
}
