import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserDto} from "../shared/model/user.dto";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private ENDPOINT = `${environment.apiUrl}/user/createUser`;

  constructor(private httpClient: HttpClient) { }

  public registerUser(userDto: UserDto): Observable<number> {
    console.log("REQUEST EP: " + this.ENDPOINT)
    return this.httpClient.post<number>(this.ENDPOINT, userDto);
  }

}
