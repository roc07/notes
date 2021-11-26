import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticateComponent} from './authenticate/authenticate.component';
import {RegisterComponent} from './register/register.component';
import {NotesDisplayComponent} from './notes-display/notes-display.component';
import {AddNoteComponent} from './add-note/add-note.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: AuthenticateComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'notes', component: NotesDisplayComponent },
  { path: 'add-note', component: AddNoteComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
