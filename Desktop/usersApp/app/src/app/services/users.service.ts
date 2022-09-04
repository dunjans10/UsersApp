import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserTrackerError } from '../models/user-tracker-error';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl:string = environment.apiURL;

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization:
      'Bearer 712b7dfdfad3c752011968c5893be55978cf14247b964c68ce385b24827523da',
  });

  constructor(private http:HttpClient) { }

  getUsers(page:number):Observable<User[] | UserTrackerError> {

    let params = new HttpParams();

    params = params.append('page', page);

    return this.http.get<User[]>(this.apiUrl, {
      params,
      headers: this.headers,
    })
    .pipe(map((users:User[]) => {
        return users;
      }),
      catchError((err) => this.handleHttpError(err))
      )
  }

  getUserById(id:number):Observable<User> {
    return this.http.get<User>(`${this.apiUrl} ${id}`, {
      headers: this.headers,
    })
  }

  addUser(newUser:User):Observable<User> {
    return this.http.post<User>(this.apiUrl, newUser, {
      headers: this.headers,
    })
  }

  updateUser(id:number, updateUser:User):Observable<void> {
    return this.http.put<void>(`${this.apiUrl} ${id}`,updateUser, {
      headers:this.headers,
    })
  }

  deleteUser(userId:number):Observable<void> {
    return this.http.delete<void>(`${this.apiUrl} ${userId}`, {
      headers: this.headers,
    })
  }

  private handleHttpError(error:HttpErrorResponse):Observable<UserTrackerError> {
    const dataError: UserTrackerError = {
      error:error.error,
      message:error.statusText,
      friendlyMessage:'An error occurred retriving data',
    }
    return throwError(dataError);
  }


}



