import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {SecurityTestDto} from './model/security.test.dto';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpClient: HttpClient) { }

  private ENDPOINT = `${environment.apiUrl}`;

  private static prepareHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      Authorization: `${token}`
    });
  }

  public testSecurity(token: string): Observable<SecurityTestDto> {
    const options = {headers: HomeService.prepareHeaders(token)};
    return this.httpClient.post<SecurityTestDto>(`${this.ENDPOINT}/testSecurity`, {}, options);
  }

}
