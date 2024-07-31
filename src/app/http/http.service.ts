import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  httpClient = inject(HttpClient);
  constructor() {}

  calculate(payload: any) {
    return this.httpClient.post('http://127.0.0.1:8000/calculate', payload);
  }
}
