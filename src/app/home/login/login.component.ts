import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoginResponse } from 'src/app/_common/_models/login/login-response';
import { SignInRequest } from 'src/app/_common/_models/login/sign-in-request';
import { AuthService } from 'src/app/_common/_services/auth.service';
import { TokenStorageService } from 'src/app/_common/_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signInRequest: SignInRequest = new SignInRequest();

  profileForm = this.fb.group({
    pseudo: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private fb: FormBuilder,
    private tokenStorage: TokenStorageService,
    private authService: AuthService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  formSending(): void {
    this.signInRequest.pseudo = this.pseudoForm.value;
    this.signInRequest.password = this.passwordForm.value;
    this.authService.signin$(this.signInRequest).subscribe(({ next: this.loadUser, error: this.errorSignIn }))
  }

  reloadPage(): void {
    window.location.reload();
  }

  private errorSignIn = (error: Error): void => {
    this.errorMessage = error.message;
    this.isLoginFailed = true;
  };

  private loadUser = (data: LoginResponse): void => {
    this.tokenStorage.saveToken(data.token);
    this.tokenStorage.saveUser(data);
    this.isLoginFailed = false;
    this.isLoggedIn = true;
    this.roles = this.tokenStorage.getUser().roles;
    this.reloadPage();
  }

  get pseudoForm(): FormControl {
    return this.profileForm.get('pseudo') as FormControl;
  }
  get passwordForm(): FormControl {
    return this.profileForm.get('password') as FormControl;
  }

  logout(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }

}
