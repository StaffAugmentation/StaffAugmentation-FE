import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentTerm } from '@models/paymentTerm';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentTermService {

  private baseUrl : string = `${environment.baseUrl}api/PaymentTerm`;

  constructor(private http: HttpClient) { }

  public getAll() : Observable<PaymentTerm[]>{
    return this.http.get<PaymentTerm[]>(this.baseUrl);
  }

  public getOne(id: number) : Observable<PaymentTerm>{
    return this.http.get<PaymentTerm>(`${this.baseUrl}/${id}`);
  }

  public addPaymentTerm(paymentTerm: PaymentTerm) : Observable<PaymentTerm>{
    return this.http.post<PaymentTerm>(`${this.baseUrl}`,paymentTerm);
  }

  public updatePaymentTerm(paymentTerm: PaymentTerm) : Observable<PaymentTerm>{
    return this.http.put<PaymentTerm>(`${this.baseUrl}`,paymentTerm);
  }
  public deletePaymentTerm(id: number) : Observable<PaymentTerm>{
    return this.http.delete<PaymentTerm>(`${this.baseUrl}/${id}`);
  }
}
