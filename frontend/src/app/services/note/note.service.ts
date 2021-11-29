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

  public getNotesByUserIdAndPage(page: number, size: number): Observable<NoteDto[]> {
    const params = new HttpParams()
      .append('userId', `${this.sessionService.getRawUserId()}`)
      .append('page', `${page}`)
      .append('size', `${size}`);
    const options = {headers: NoteService.prepareHeaders(this.sessionService.getRawToken()), params};
    return this.httpClient.get<NoteDto[]>(`${this.ENDPOINT}/notes/getNotesByUserIdAndPage`, options);
  }

  public getNotesCountForUser(): Observable<number> {
    const params = new HttpParams()
      .append('userId', `${this.sessionService.getRawUserId()}`);
    const options = {headers: NoteService.prepareHeaders(this.sessionService.getRawToken()), params};
    return this.httpClient.get<number>(`${this.ENDPOINT}/notes/getNotesCountForUser`, options);
  }

  public deleteNote(noteId: number): Observable<void> {
    const params = new HttpParams()
      .append('userId', `${this.sessionService.getRawUserId()}`)
      .append('noteId', `${noteId}`);
    const options = {headers: NoteService.prepareHeaders(this.sessionService.getRawToken()), params};
    return this.httpClient.delete<void>(`${this.ENDPOINT}/notes/deleteNote`, options);
  }
}
