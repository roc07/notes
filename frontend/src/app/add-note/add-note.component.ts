import { Component, OnInit } from '@angular/core';
import {NoteService} from '../services/note/note.service';
import {AppPaths} from '../shared/app.paths';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {GeneralUtil} from '../services/shared/util/general.util';
import {SessionService} from '../session/state/session.service';
import {ToolbarService} from '../services/toolbar/toolbar.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {

  showShortError = false;
  showNoteError = false;
  noteForm = this.formBuilder.group({
    shortName: '',
    noteText: ''
  });
  private generalUtil: GeneralUtil = new GeneralUtil(this.sessionService, this.router);

  constructor(private noteService: NoteService, private router: Router, private formBuilder: FormBuilder,
              private sessionService: SessionService, private toolbarService: ToolbarService) { }

  ngOnInit(): void {
    this.generalUtil.navigateUnregisteredUsersToLoginPage();
    this.toolbarService.showToolbar();
    this.toolbarService.updateWelcomeText(`Add-a-Note`);
  }

  addNote(): void {
    const shortName = this.noteForm.value.shortName.trim();
    if (this.generalUtil.stringIsInvalid(shortName)) {
      this.showShortError = true;
      return;
    }
    this.showShortError = false;

    const noteText = this.noteForm.value.noteText.trim();
    if (this.generalUtil.stringIsInvalid(noteText)) {
      this.showNoteError = true;
      return;
    }
    this.showNoteError = false;

    this.noteService.addNote({shortName, noteText})
      .subscribe(() => {
          this.goToNotes();
        });
  }

  goToNotes(): void {
    this.router.navigate([AppPaths.notes]);
  }

}
