import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export class Employee{
  constructor(
    public empId:string,
    public name:string,
    public designation:string,
    public salary:string,
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient:HttpClient) {}

  getEmployees() : Observable<any> {
    return this.httpClient.get(baseUrl + '/employees');
  }


}
