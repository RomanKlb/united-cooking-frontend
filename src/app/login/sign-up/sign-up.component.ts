import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SignUpMemberRequest } from 'src/app/_common/_models/login/sign-up-member-request';
import { AuthService } from 'src/app/_common/_services/_jwt/auth.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {


  message: string = 'null';


  constructor(private fb: FormBuilder, private authService: AuthService) { }

  profileForm = this.fb.group({
    pseudo: ['', [Validators.required, Validators.pattern('^([A-Za-z0-9]+)*')]],
    // birthdate: [new Date().toISOString().slice(0, 10), [Validators.required, this.releaseDateValidator()]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    name: ['', [Validators.required,]],
    surname: ['', [Validators.required,]]

  });

  ngOnInit(): void {
  }

  get pseudoForm(): FormControl {
    return this.profileForm.get('pseudo') as FormControl;
  }
  get passwordForm(): FormControl {
    return this.profileForm.get('password') as FormControl;
  }
  get emailForm(): FormControl {
    return this.profileForm.get('email') as FormControl;
  }
  get nameForm(): FormControl {
    return this.profileForm.get('name') as FormControl;
  }
  get surnameForm(): FormControl {
    return this.profileForm.get('surname') as FormControl;
  }

  private ignoreError = (error: Error): void => {
    console.log(error);
    this.message = `Ce joueur existe déjà !`;
  };

  // createNewGamer() {
  //   this.profileForm.patchValue({
  //     'pseudo' : 'NinjaGamer',
  //     'password' : 'azerty',
  //     'birthdate' : '1990-07-28',
  //     'email' : 'ninja-gamer@gmail.com'
  //   })
  // }

  constructMemberDto(): SignUpMemberRequest {
    return {
      pseudo: this.pseudoForm.value,
      password: this.passwordForm.value,
      email: this.emailForm.value,
      name: this.nameForm.value,
      surname: this.surnameForm.value
    }
  }

  private createMember = (data: any): any => {
    this.message = data.message;
  }

  formSending() {
    const memberDto = this.constructMemberDto();
    this.authService.signupMember$(memberDto).subscribe(({
      next: this.createMember,
      error: this.ignoreError
    }))
  }

}
