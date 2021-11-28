import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NoteService} from '../services/note/note.service';
import {SessionService} from '../session/state/session.service';
import {GeneralUtil} from '../services/shared/util/general.util';

@Component({
  selector: 'app-notes-display',
  templateUrl: './notes-display.component.html',
  styleUrls: ['./notes-display.component.css']
})
export class NotesDisplayComponent implements OnInit {

  private generalUtil: GeneralUtil = new GeneralUtil(this.sessionService, this.router);

  constructor(private router: Router, private noteService: NoteService, private sessionService: SessionService) { }

  ngOnInit(): void {
    this.generalUtil.navigateUnregisteredUsersToLoginPage();
  }

  logout(): void {
    this.router.navigate(['']);
  }

  goToAddNote(): void {
    this.router.navigate(['/add-note']);
  }

  getNotes(): void {
    this.noteService.getNotesByUserIdAndPage(1).subscribe(r => console.log(r));
  }
}
