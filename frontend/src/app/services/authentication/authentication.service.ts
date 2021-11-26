import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {UserLoginInformationDto} from "../shared/model/user.login.information.dto";
import {UserDto} from "../shared/model/user.dto";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private ENDPOINT = `${environment.apiUrl}/authentication`;

  constructor(private httpClient: HttpClient) { }

  public authenticate(userDto: UserDto): Observable<UserLoginInformationDto> {
    console.log("REQUEST EP: " + this.ENDPOINT)
    return this.httpClient.post<UserLoginInformationDto>(`${this.ENDPOINT}/authenticate`, userDto);
  }

}
