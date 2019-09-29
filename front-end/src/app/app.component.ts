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
  public dateFactYear:string="";
  public errmsgs:string="";
  public dateFact:string="";
  public yearFact:string="";
  public yearFactDate:string="";
  constructor(private authservice: AuthService, private fb: FormBuilder, public router: Router) { }

  ngOnInit() {
    this.dateFactForm = this.fb.group({
      day: [''],
      month: ['']
    });
    this.yearFactForm = this.fb.group({
      year: ['']
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
  
  onSubmitDate() {
      const day: string = this.dateFactForm.get('day').value;
      const month: string = this.dateFactForm.get('month').value;
      this.authservice.dateFactService(day,month).subscribe(
        dateFact => {
          this.dateFact=dateFact.text;
          this.dateFactYear=dateFact.year;
        },
        error => {
          console.log(error);
          this.errmsgs=error.error.message;
        }
      );
    }

  onSubmitYear() {
      const year: string = this.yearFactForm.get('year').value;
      this.authservice.yearFactService(year).subscribe(
        yearFact => {
          this.yearFact=yearFact.text;
          this.yearFactDate=yearFact.date;
        },
        error => {
          console.log(error);
          this.errmsgs=error.error.message;
        }
      );
    }
}
