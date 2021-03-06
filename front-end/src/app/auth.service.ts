import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  dateFactService(day: string, month:string) {

      return this.http.get<any>(`http://localhost:3000/dateFact?day=`+day+'&month='+month)
          .pipe(map(dateFact => {
              return dateFact;
          }));
  }

  yearFactService(year: string) {

    return this.http.get<any>(`http://localhost:3000/yearFact?year=`+year)
        .pipe(map(yearFact => {
            return yearFact;
        }));
  }

  generateTokenService(email: string, name: string, password: string) {

    return this.http.get<any>(`http://localhost:3000/generateToken?email=`+email+'&name='+name+'&password='+password)
        .pipe(map(result => {
            return result;
        }));
  }

  verifyTokenService(token: string) {

    return this.http.get<any>(`http://localhost:3000/verifyToken?token=`+token)
        .pipe(map(data => {
            return data;
        }));
  }
}