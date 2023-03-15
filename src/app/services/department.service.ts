import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '@models/department';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private baseUrl : string = `${environment.baseUrl}api/Department`;

  constructor(private http: HttpClient) { }

  public getAll() : Observable<Department[]>{
    return this.http.get<Department[]>(this.baseUrl);
  }

  public getOne(Id: number) : Observable<Department>{
    return this.http.get<Department>(`${this.baseUrl}/${Id}`);
  }

  public addDepartment(department: Department) : Observable<Department>{
    return this.http.post<Department>(`${this.baseUrl}`,department);
  }

  public updateDepartment(department: Department) : Observable<Department>{
    return this.http.put<Department>(`${this.baseUrl}`,department);
  }
  public deleteDepartment(Id: number) : Observable<Department>{
    return this.http.delete<Department>(`${this.baseUrl}/${Id}`);
  }
}
