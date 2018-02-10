import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/authService/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  constructor(private router: Router, private spinnerService: Ng4LoadingSpinnerService, private route: ActivatedRoute, private http: HttpClient, private auth: AuthService) { }

  ngOnInit() {

    this.form = new FormGroup({
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
    });

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
      alert('please fill the required fields');

    }
  }
}
