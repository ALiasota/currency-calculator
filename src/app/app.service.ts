import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface IStastes  {
  cc: string;
  r030: string;
  txt: string;
  rate: number;
  exchangedate: string
  }
  
  @Injectable({
    providedIn: 'root'
})

export class GetCurrencies {    
    constructor(    
        private http: HttpClient,      
          ) {}
    
    getCurrencies(): Observable<Object> {
       return this.http.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')          
      }  
  }