import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NoteService} from '../services/note/note.service';
import {SessionService} from '../session/state/session.service';
import {GeneralUtil} from '../services/shared/util/general.util';
import {ToolbarService} from '../services/toolbar/toolbar.service';
import {faArrowAltCircleRight, faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons';
import {NoteDto} from '../services/note/model/noteDto';

@Component({
  selector: 'app-notes-display',
  templateUrl: './notes-display.component.html',
  styleUrls: ['./notes-display.component.css']
})
export class NotesDisplayComponent implements OnInit {

  private generalUtil: GeneralUtil = new GeneralUtil(this.sessionService, this.router);
  faArrowRight = faArrowAltCircleRight;
  faArrowLeft = faArrowAltCircleLeft;
  notes: NoteDto[];

  initialPage = 0;
  currentPage = this.initialPage;
  currentSize = 4;
  totalNotesCount = 0;
  displayNextPage;

  constructor(private router: Router, private noteService: NoteService, private sessionService: SessionService,
              private toolbarService: ToolbarService) { }

  ngOnInit(): void {
    this.generalUtil.navigateUnregisteredUsersToLoginPage();
    this.toolbarService.showToolbar();
    this.toolbarService.updateWelcomeText(`Welcome ${this.sessionService.getUsername()}`);
    this.getNotes();
    this.preparePageNumbers();
  }

  logout(): void {
    this.router.navigate(['']);
  }

  goToAddNote(): void {
    this.router.navigate(['/add-note']);
  }

  getNotes(): void {
    this.noteService.getNotesByUserIdAndPage(this.currentPage, this.currentSize)
      .subscribe(result => this.notes = result);
  }

  deleteNote(noteId: number): void {
    this.noteService.deleteNote(noteId)
      .subscribe(() => {
        this.notes = this.notes.filter(i => i.id !== noteId);
      });
  }

  private preparePageNumbers(): void {
    this.noteService.getNotesCountForUser()
      .subscribe(notesCount => {
        this.totalNotesCount = notesCount;
        this.displayNextPage = this.calculateDisplayCurrentPage();
      });
  }

  private calculateDisplayCurrentPage(): boolean {
    return (((this.currentPage + 1) * this.currentSize) < this.totalNotesCount);
  }

  increasePage(): void {
    if (this.displayNextPage) {
      this.currentPage++;
      this.displayNextPage = this.calculateDisplayCurrentPage();
      this.getNotes();
    }
  }

  decreasePage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.displayNextPage = this.calculateDisplayCurrentPage();
      this.getNotes();
    }
  }
}
