import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-crypto-ticker',
  templateUrl: './crypto-ticker.component.html',
  styleUrls: ['./crypto-ticker.component.scss']
})
export class CryptoTickerComponent implements OnInit {

  public prices: { [key: string]: any } = {};

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Thinking i should use Coinbase API 
    // not sure if i am being limited with calls?
    // Need to look into that i think it is free but you need a coinbase account


    // TODO:
    // -Look into conventions around rounding crypto
    // -Add a date to the page
    // -Much better styling
    // -Should i code a way to add more stocks? Or to start with these (bitcoin,ethereum,cardano,dogecoin) 
    // and have a drop down to add more to the api request?
    // -Make it responsive down to iphone SE

    this.getData().subscribe((data) => {
      console.log(data);
      for (const coin of data) {
        if (!this.prices[coin.id]) {
          this.prices[coin.id] = {
            symbol: coin.symbol,
            price: coin.priceUsd,
            change: 0
          };
        } else {
          this.prices[coin.id].change = +coin.priceUsd - +this.prices[coin.id].price;
          this.prices[coin.id].price = +coin.priceUsd;
        }
      }
      console.log(this.prices);
    });
  }

  private getData(): Observable<any> {
    return timer(0, 10000).pipe(
      switchMap(() => {
        return this.http.get('https://api.coincap.io/v2/assets?ids=bitcoin,ethereum,cardano,dogecoin');
      }),
      map((res) => res['data'])
    );
  }
}

