import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-crypto-ticker',
  templateUrl: './crypto-ticker.component.html',
  styleUrls: ['./crypto-ticker.component.scss']
})
export class CryptoTickerComponent implements OnInit {

  private socket$: Subject<any> = new Subject<any>();
  public prices: { [key: string]: number } = {};

  constructor() { }

  ngAfterViewInit() {
    this.socket$.subscribe(
      (event) => {
        // console.log(event);
        Object.assign(this.prices, event);
        console.log(this.prices);

      },
      (error) => {
        console.error(error);
      }
    );
  }


  ngOnInit() {

    // const assets = 'bitcoin,ethereum,litecoin';
    // const ws = new WebSocket(`wss://ws.coincap.io/prices?assets=${assets}`);
    const ws = new WebSocket(`wss://ws.coincap.io/prices?assets=ALL`);

    ws.onmessage = (event) => {
      this.socket$.next(JSON.parse(event.data));
    };

    ws.onerror = (event) => {
      this.socket$.error(event);
    };
  }

}
