import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoTickerComponent } from './crypto-ticker.component';

describe('CryptoTickerComponent', () => {
  let component: CryptoTickerComponent;
  let fixture: ComponentFixture<CryptoTickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CryptoTickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoTickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
