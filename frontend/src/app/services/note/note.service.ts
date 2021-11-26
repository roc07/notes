import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {SecurityTestDto} from "../home/model/security.test.dto";

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private httpClient: HttpClient) { }

  private ENDPOINT = `${environment.apiUrl}`;

  private static prepareHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      Authorization: `${token}`
    });
  }

  public saveNote(token: string): Observable<void> {
    const options = {headers: NoteService.prepareHeaders(token)};
    return this.httpClient.post<void>(`${this.ENDPOINT}/notes/saveNote`, {}, options);
  }

}
