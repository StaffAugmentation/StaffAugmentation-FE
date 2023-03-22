import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '@models/category';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl : string = `${environment.baseUrl}api/Category`;

  constructor(private http: HttpClient) { }

  public getAll() : Observable<Category[]>{
    return this.http.get<Category[]>(this.baseUrl);
  }

  public getOne(id: number) : Observable<Category>{
    return this.http.get<Category>(`${this.baseUrl}/${id}`);
  }

  public addCategory(category: Category) : Observable<Category>{
    return this.http.post<Category>(`${this.baseUrl}`,category);
  }

  public updateCategory(category: Category) : Observable<Category>{
    return this.http.put<Category>(`${this.baseUrl}`,category);
  }
  public deleteCategory(id: number) : Observable<Category>{
    return this.http.delete<Category>(`${this.baseUrl}/${id}`);
  }
}
