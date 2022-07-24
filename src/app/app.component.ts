import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { GetCurrencies } from './app.service';
import { IStastes } from './app.service';

@UntilDestroy()
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
   
  states:IStastes[] = [{
    cc: 'GRN', 
    r030 : '',
    txt: "Гривня",
    rate: 1,    
    exchangedate: ''
  },];  

  constructor(    
    private _GetCurrencies: GetCurrencies      
      ) {}

  onInputChange1(e:number): void {
    this.inputVar2 = e * this.currency1 / this.currency2;    
  }

  onInputChange2(e:number): void {
    this.inputVar1 = e * this.currency2 /  this.currency1;   
  }

  onSelectChange1(e:number): void {
    this.currency1 = e;
    if(this.currency1 !== 1) {
      this.currency2 !== 1 ? this.inputVar2 = this.currency2 / this.currency1 * this.inputVar1      
      :this.inputVar2 = this.currency1 / this.currency2 * this.inputVar1;
           
    } else {
      this.inputVar2 = e * this.inputVar1 / this.currency2; 
    }   
  }
  onSelectChange2(e:number): void {
    this.currency2 = e;
    if(this.currency2 !== 1) {
      this.currency1 !== 1 ? this.inputVar1 = this.currency1 / this.currency2 * this.inputVar2      
      :this.inputVar1 = this.currency2 / this.currency1 * this.inputVar2;
    } else{
      this.inputVar1 = e * this.inputVar2 / this.currency1;      
    }
    console.log('onSelectChange2');   
  }
  
   ngOnInit() { 
    this._GetCurrencies.getCurrencies()
    .pipe(untilDestroyed(this))
    .subscribe((response: any) => {     
      const states = response.filter((item: any) => item.cc === 'USD' || item.cc === 'EUR'
      )      
      this.states = [...this.states, ...states];                
    })   
  }  
}
