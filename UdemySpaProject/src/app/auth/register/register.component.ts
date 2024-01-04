import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../../Services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private AuthService: AuthService, private Router: Router) {}
  ngOnInit(): void {
    this.CreatelogInForm();
  }
  LoginForm: FormGroup;

  CreatelogInForm() {
    this.LoginForm = new FormGroup({
      FullName: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required, Validators.email]),
      Password: new FormControl('', [Validators.required]),
    });
  }
  Login() {
    if (this.LoginForm.invalid) {
      return;
    }
    this.AuthService.Signup(this.LoginForm.value).subscribe({
      next: (res: any) => {
        this.AuthService.SaveTokeninLocalStorage(res);
        this.Router.navigate(['auth/register']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
