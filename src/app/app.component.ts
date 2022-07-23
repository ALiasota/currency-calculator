import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';






@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})

export class AppComponent implements OnInit{
  input1 = 1;
  input2 = 1;
  currency1 = 1;
  currency2 = 1;
  form2: any; 

constructor(    
  private http: HttpClient,      
    ) {}

  states = [{
    cc: 'GRN', 
    r030 : '',
    txt: "Гривня",
    rate: 1,    
    exchangedate: ""
  },];

  firstValues = {
    sum1: 1,
    sum2: 1,
    currency1: 1,
    currency2: 1,     
  }


  
  
  onInputChange1(e:number) {
    this.input2 = e * this.currency1 /this.currency2;
    console.log('onInputChange1');
    console.log(this.input1, 'inp1');
    console.log(this.input2, 'inp2');
    console.log(this.currency1, 'currency1');
    console.log(this.currency2, 'currency2');
  }

  onInputChange2(e:number) {
    this.input1 = e * this.currency2 /  this.currency1;
    console.log('onInputChange2');
    console.log(this.input1, 'inp1');
    console.log(this.input2, 'inp2');
    console.log(this.currency1, 'currency1');
    console.log(this.currency2, 'currency2');
  }
  onSelectChange1(e:number) {
    this.currency1 = e;
    if(this.currency1 !== 1) {
      this.input2 = this.currency1 / this.currency2 * this.input1;
    } else {
      this.input2 = e * this.input1 / this.currency2; 
    }
       
    console.log('onSelectChange1');
    console.log(this.input1, 'inp1');
    console.log(this.input2, 'inp2');
    console.log(this.currency1, 'currency1');
    console.log(this.currency2, 'currency2');
  }
  onSelectChange2(e:number) {
    this.currency2 = e;
    if(this.currency2 !== 1) {
      this.input1 = this.currency2 / this.currency1 * this.input2;
    } else{
      this.input1 = e * this.input2 / this.currency1;      
    }
    console.log('onSelectChange2');
      console.log(this.input1, 'inp1');
      console.log(this.input2, 'inp2');
      console.log(this.currency1, 'currency1');
      console.log(this.currency2, 'currency2');
  }

  ngOnInit() { 
    this.search();
   
  }
  search() {
    this.http.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
    .subscribe((response: any) => {     
      const states = response.filter((item: any) => item.cc === 'USD' || item.cc === 'EUR'
      )      
      this.states = [...this.states, ...states];
      console.log(this.states);
    })    
  }

  
}
