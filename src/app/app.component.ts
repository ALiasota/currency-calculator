import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],  
})

export class AppComponent implements OnInit{
  inputVar1 = 1;
  inputVar2 = 1;
  currency1 = 1;
  currency2 = 1;
  

  constructor(    
    private http: HttpClient,      
      ) {}

  states = [{
    cc: 'GRN', 
    r030 : '',
    txt: "Гривня",
    rate: 1,    
    exchangedate: Date.now()
  },];  
  
  onInputChange1(e:number): void {
    this.inputVar2 = e * this.currency1 /this.currency2;
    console.log('onInputChange1');
    console.log(this.inputVar1, 'inp1');
    console.log(this.inputVar2, 'inp2');
    console.log(this.currency1, 'currency1');
    console.log(this.currency2, 'currency2');
  }

  onInputChange2(e:number): void {
    this.inputVar1 = e * this.currency2 /  this.currency1;
    console.log('onInputChange2');
    console.log(this.inputVar1, 'inp1');
    console.log(this.inputVar2, 'inp2');
    console.log(this.currency1, 'currency1');
    console.log(this.currency2, 'currency2');
  }

  onSelectChange1(e:number): void {
    this.currency1 = e;
    if(this.currency1 !== 1) {
      if(this.currency2 !== 1) {
        this.inputVar2 = this.currency2 / this.currency1 * this.inputVar1;
      } else{
         this.inputVar2 = this.currency1 / this.currency2 * this.inputVar1;
      }     
    } else {
      this.inputVar2 = e * this.inputVar1 / this.currency2; 
    }
       
    console.log('onSelectChange1');
    console.log(this.inputVar1, 'inp1');
    console.log(this.inputVar2, 'inp2');
    console.log(this.currency1, 'currency1');
    console.log(this.currency2, 'currency2');
  }
  onSelectChange2(e:number): void {
    this.currency2 = e;
    if(this.currency2 !== 1) {
      if(this.currency1 !== 1) {
        this.inputVar1 = this.currency1 / this.currency2 * this.inputVar2;
      }
      this.inputVar1 = this.currency2 / this.currency1 * this.inputVar2;
    } else{
      this.inputVar1 = e * this.inputVar2 / this.currency1;      
    }
    console.log('onSelectChange2');
    console.log(this.inputVar1, 'inp1');
    console.log(this.inputVar2, 'inp2');
    console.log(this.currency1, 'currency1');
    console.log(this.currency2, 'currency2');
  }

  
  ngOnInit(): void { 
    this.getCurrencies();   
  }

  getCurrencies(): void {
    this.http.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
    .subscribe((response: any) => {     
      const states = response.filter((item: any) => item.cc === 'USD' || item.cc === 'EUR'
      )      
      this.states = [...this.states, ...states];      
    })    
  }  
}
