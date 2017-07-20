import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { SelectModule } from 'ng2-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MdDialogModule } from '@angular/material';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { NavbarComponent } from './components/navbar/navbar.component';
import { DeedsComponent } from './components/deeds/deeds.component';
import { AddDeedComponent } from './components/add-deed/add-deed.component';
import { EditDeedComponent } from './components/edit-deed/edit-deed.component';
import { DeedDetailsComponent } from './components/deed-details/deed-details.component';
import { SchemaComponent } from './components/schema/schema.component';
import { SearchComponent } from './components/search/search.component';


import { DeedService } from './services/deed.service';
import { SchemaService } from './services/schema.service';
import { SearchService } from './services/search.service';
import { PagerService } from './services/pager.service';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DeedsComponent,
    AddDeedComponent,
    EditDeedComponent,
    DeedDetailsComponent,
    SchemaComponent,
    SearchComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    SimpleNotificationsModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    SelectModule,
    NgbModule.forRoot(),
    MdDialogModule
  ],
  entryComponents: [ConfirmDialogComponent],
  providers: [DeedService, SchemaService, SearchService, PagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
