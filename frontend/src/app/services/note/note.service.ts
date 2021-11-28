import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {SessionService} from '../../session/state/session.service';
import {NoteDto} from './model/noteDto';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private ENDPOINT = `${environment.apiUrl}`;
  private PAGE_SIZE = 4;

  constructor(private httpClient: HttpClient, private sessionService: SessionService) { }

  private static prepareHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      Authorization: `${token}`
    });
  }

  public addNote(note: NoteDto): Observable<void> {
    const params = new HttpParams().append('userId', `${this.sessionService.getRawUserId()}`);
    const options = {headers: NoteService.prepareHeaders(this.sessionService.getRawToken()), params};
    return this.httpClient.post<void>(`${this.ENDPOINT}/notes/saveNote`, note, options);
  }

  public getNotesByUserIdAndPage(page: number): Observable<NoteDto[]> {
    const params = new HttpParams()
      .append('userId', `${this.sessionService.getRawUserId()}`)
      .append('page', `${page}`)
      .append('size', `${this.PAGE_SIZE}`);
    const options = {headers: NoteService.prepareHeaders(this.sessionService.getRawToken()), params};
    return this.httpClient.get<NoteDto[]>(`${this.ENDPOINT}/notes/getNotesByUserIdAndPage`, options);
  }

  public deleteNote(noteId: number): Observable<void> {
    const params = new HttpParams()
      .append('userId', `${this.sessionService.getRawUserId()}`)
      .append('noteId', `${noteId}`);
    const options = {headers: NoteService.prepareHeaders(this.sessionService.getRawToken()), params};
    return this.httpClient.delete<void>(`${this.ENDPOINT}/notes/deleteNote`, options);
  }
}
