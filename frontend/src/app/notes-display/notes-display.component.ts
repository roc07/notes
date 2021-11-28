import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NoteService} from '../services/note/note.service';
import {SessionService} from '../session/state/session.service';
import {GeneralUtil} from '../services/shared/util/general.util';
import {ToolbarService} from '../services/toolbar/toolbar.service';
import {faArrowAltCircleRight, faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons';
import {NoteDto} from "../services/note/model/noteDto";

@Component({
  selector: 'app-notes-display',
  templateUrl: './notes-display.component.html',
  styleUrls: ['./notes-display.component.css']
})
export class NotesDisplayComponent implements OnInit {

  private generalUtil: GeneralUtil = new GeneralUtil(this.sessionService, this.router);
  faArrowRight = faArrowAltCircleRight;
  faArrowLeft = faArrowAltCircleLeft;
  initialPage = 0;
  currentPage = this.initialPage;
  notes: NoteDto[];

  constructor(private router: Router, private noteService: NoteService, private sessionService: SessionService,
              private toolbarService: ToolbarService) { }

  ngOnInit(): void {
    this.generalUtil.navigateUnregisteredUsersToLoginPage();
    this.toolbarService.showToolbar();
    this.toolbarService.updateWelcomeText(`Welcome ${this.sessionService.getUsername()}`);
    this.getNotes();
  }

  logout(): void {
    this.router.navigate(['']);
  }

  goToAddNote(): void {
    this.router.navigate(['/add-note']);
  }

  getNotes(): void {
    this.noteService.getNotesByUserIdAndPage(this.currentPage)
      .subscribe(result => this.notes = result);
  }

  deleteNote(noteId: number): void {
    this.noteService.deleteNote(noteId)
      .subscribe(() => {
        this.notes = this.notes.filter(i => i.id !== noteId);
      });
  }

  editNote(noteId: number): void {

  }
}
