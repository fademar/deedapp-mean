import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { MatDialogModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material';
import { MatSlideToggleModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material';
import { MatMenuModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material';
import { MatTableModule } from '@angular/material';
import { MatSortModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TypeaheadModule } from 'ngx-bootstrap';
import { MatAutocompleteModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatRadioModule } from '@angular/material';
import { MatButtonToggleModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { QuillModule } from 'ngx-quill';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { InputTrimModule } from 'ng2-trim-directive';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { NavbarComponent } from './components/navbar/navbar.component';
import { DeedsComponent } from './components/deeds/deeds.component';
import { AddDeedComponent } from './components/add-deed/add-deed.component';
import { EditDeedComponent } from './components/edit-deed/edit-deed.component';
import { DeedDetailsComponent } from './components/deed-details/deed-details.component';
import { SearchComponent } from './components/search/search.component';
import { CallbackComponent } from './components/callback/callback.component';
import { HomeComponent } from './components/home/home.component';


import { DeedService } from './services/deed.service';
import { SearchService } from './services/search.service';
import { PagerService } from './services/pager.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/guard.service';
import { DownloadService } from './services/download.service';
import { NoteService } from './services/note.service';
import { FirstnamesService } from './services/firstnames.service';


import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { NoteComponent } from './shared/note/note.component';
import { NoteDialog } from './shared/note/note.component';
import { NotesComponent } from './components/notes/notes.component';
import { NewWindowDirective } from './directives/new-window.directive';
import { ExcerptPipe } from './pipes/excerpt.pipe';
import { HighlightPipe } from './pipes/highlight.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { ToolsComponent } from './components/tools/tools.component';
import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DeedsComponent,
    AddDeedComponent,
    EditDeedComponent,
    DeedDetailsComponent,
    SearchComponent,
    ConfirmDialogComponent,
    CallbackComponent,
    HomeComponent,
    NoteComponent,
    NoteDialog,
    NotesComponent,
    NewWindowDirective,
    ExcerptPipe,
    HighlightPipe,
    SortPipe,
    ToolsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot(),
    NgbModule.forRoot(),
    TypeaheadModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatAutocompleteModule,
    MatInputModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatSidenavModule,
    QuillModule,
    MatExpansionModule,
    NgxJsonViewerModule,
    InputTrimModule,
    MatTabsModule,
    EditorModule
  ],
  entryComponents: [ConfirmDialogComponent, NoteDialog],
  providers: [Title, DeedService, SearchService, PagerService, AuthService, AuthGuard, DownloadService, NoteService, FirstnamesService],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
