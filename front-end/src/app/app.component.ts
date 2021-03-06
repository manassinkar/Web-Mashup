import { Component } from '@angular/core';

import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-end';
  public dateFactForm: FormGroup;
  public yearFactForm: FormGroup;
  public generateTokenForm: FormGroup;
  public verifyTokenForm: FormGroup;
  public dateFactYear:string="";
  public errmsgsDate:string="";
  public errmsgsYear:string="";
  public errmsgsToken:string="";
  public errmsgsData:string="";
  public dateFact:string="";
  public yearFact:string="";
  public yearFactDate:string="";
  public resultToken:string="";
  public resultEmail:string="";
  public resultName:string="";
  public resultPassword:string="";
  constructor(private authservice: AuthService, private fb: FormBuilder, public router: Router) { }

  ngOnInit() {
    this.dateFactForm = this.fb.group({
      day: [''],
      month: ['']
    });
    this.generateTokenForm = this.fb.group({
      email: [''],
      name: [''],
      password: ['']
    });
    this.yearFactForm = this.fb.group({
      year: ['']
    });
    this.verifyTokenForm = this.fb.group({
      token: ['']
    });
  }

  public get day()  {
    return this.dateFactForm.controls.day;
  }

  public get month()  {
    return this.dateFactForm.controls.month;
  }

  public get year()  {
    return this.yearFactForm.controls.year;
  }

  public get token()  {
    return this.verifyTokenForm.controls.token;
  }

  public get email()  {
    return this.generateTokenForm.controls.email;
  }

  public get name()  {
    return this.generateTokenForm.controls.name;
  }

  public get password()  {
    return this.generateTokenForm.controls.password;
  }
  
  copy(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  onSubmitDate() {
      const day: string = this.dateFactForm.get('day').value;
      const month: string = this.dateFactForm.get('month').value;
      this.authservice.dateFactService(day,month).subscribe(
        dateFact => {
          this.dateFact=dateFact.text;
          this.dateFactYear=dateFact.year;
          this.errmsgsDate="";
        },
        error => {
          this.errmsgsDate=error.error.message;
          this.dateFact="";
          this.dateFactYear="";
        }
      );
    }

  onSubmitYear() {
      const year: string = this.yearFactForm.get('year').value;
      this.authservice.yearFactService(year).subscribe(
        yearFact => {
          this.yearFact=yearFact.text;
          this.yearFactDate=yearFact.date;
          this.errmsgsYear="";
        },
        error => {
          this.errmsgsYear=error.error.message;
          this.yearFact="";
          this.yearFactDate="";
        }
      );
    }

    onSubmitData() {
      const email: string = this.generateTokenForm.get('email').value;
      const name: string = this.generateTokenForm.get('name').value;
      const password: string = this.generateTokenForm.get('password').value;
      this.authservice.generateTokenService(email,name,password).subscribe(
        result => {
          this.resultToken=result.token;
          this.errmsgsData="";
        },
        error => {
          this.errmsgsData=error.error.message;
          this.resultToken="";
        }
      );
    }

    onSubmitToken() {
      const token: string = this.verifyTokenForm.get('token').value;
      this.authservice.verifyTokenService(token).subscribe(
        data => {
          this.resultEmail=data.email;
          this.resultName=data.name;
          this.resultPassword=data.password;
          this.errmsgsToken="";
        },
        error => {
          this.errmsgsToken=error.error.message;
          this.resultEmail="";
          this.resultName="";
          this.resultPassword="";
        }
      );
    }
}
