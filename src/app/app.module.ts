import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { MdDialogModule } from '@angular/material';
import { MdProgressSpinnerModule } from '@angular/material';
import { MdSlideToggleModule } from '@angular/material';
import { MdButtonModule } from '@angular/material';
import { MdIconModule } from '@angular/material';
import { MdTooltipModule } from '@angular/material';
import { MdMenuModule } from '@angular/material';
import { MdCardModule } from '@angular/material';
import { MdPaginatorModule } from '@angular/material';
import { MdTableModule } from '@angular/material';
import { MdSortModule } from '@angular/material';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { NavbarComponent } from './components/navbar/navbar.component';
import { DeedsComponent } from './components/deeds/deeds.component';
import { AddDeedComponent } from './components/add-deed/add-deed.component';
import { EditDeedComponent } from './components/edit-deed/edit-deed.component';
import { DeedDetailsComponent } from './components/deed-details/deed-details.component';
import { SchemaComponent } from './components/schema/schema.component';
import { SearchComponent } from './components/search/search.component';
import { CallbackComponent } from './components/callback/callback.component';
import { HomeComponent } from './components/home/home.component';


import { DeedService } from './services/deed.service';
import { SchemaService } from './services/schema.service';
import { SearchService } from './services/search.service';
import { PagerService } from './services/pager.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/guard.service';

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
    ConfirmDialogComponent,
    CallbackComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    SimpleNotificationsModule.forRoot(),
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    MdDialogModule,
    MdProgressSpinnerModule,
    MdSlideToggleModule,
    MdButtonModule,
    MdIconModule,
    MdTooltipModule,
    MdMenuModule,
    MdCardModule,
    MdPaginatorModule,
    MdTableModule,
    MdSortModule
  ],
  entryComponents: [ConfirmDialogComponent],
  providers: [DeedService, SchemaService, SearchService, PagerService, AuthService, AuthGuard],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
