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
    return timer(0, 5000).pipe(
      switchMap(() => {
        return this.http.get('https://api.coincap.io/v2/assets?ids=bitcoin,ethereum,cardano,dogecoin');
      }),
      map((res) => res['data'])
    );
  }
}

