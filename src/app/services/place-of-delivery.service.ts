import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlaceOfDelivery } from '@models/place-of-delivery';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PlaceOfDeliveryService {

  private baseUrl : string = `${environment.baseUrl}api/PlaceOfDelivery`;

  constructor(private http: HttpClient) { }

  public getAll() : Observable<PlaceOfDelivery[]>{
    return this.http.get<PlaceOfDelivery[]>(this.baseUrl);
  }

  public getOne(id: number) : Observable<PlaceOfDelivery>{
    return this.http.get<PlaceOfDelivery>(`${this.baseUrl}/${id}`);
  }

  public addPlaceOfDelivery(PlaceOfDelivery: PlaceOfDelivery) : Observable<PlaceOfDelivery>{
    return this.http.post<PlaceOfDelivery>(`${this.baseUrl}`,PlaceOfDelivery);
  }

  public updatePlaceOfDelivery(PlaceOfDelivery: PlaceOfDelivery) : Observable<PlaceOfDelivery>{
    return this.http.put<PlaceOfDelivery>(`${this.baseUrl}`,PlaceOfDelivery);
  }

  public deletePlaceOfDelivery(id: number) : Observable<PlaceOfDelivery>{
    return this.http.delete<PlaceOfDelivery>(`${this.baseUrl}/${id}`);
  }
}
