import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseComponent } from '../../shared/base-component';
import { AuthService } from '../../core/service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent {

  loginForm = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService) {
    super();
  }

  init(): void {
  }

  destroy(): void {
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.addSubscription(
      this.authService.login(this.controls.email.value, this.controls.password.value)
        .subscribe(value => {
          if (value) {
            this.router.navigate(['app/dashboard']);
          } else {
            this.addPageErrors([{message: 'Invalid Email and/or Password'}]);
          }
        })
    );
  }

  get controls(): { [p: string]: AbstractControl } {
    return this.loginForm.controls;
  }

}
