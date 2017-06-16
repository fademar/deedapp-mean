import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { MdAutocompleteModule, MdInputModule, MdCheckboxModule, MdSelectModule, MdRadioModule, MdButtonModule } from '@angular/material';
import { SelectModule } from 'ng2-select';

import { AppComponent } from './app.component';
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


const appRoutes: Routes = [
  {path: '', component:DeedsComponent},
  {path: 'deed/add', component:AddDeedComponent},
  {path: 'deed/:id', component:DeedDetailsComponent},
  {path: 'deed/edit/:id', component:EditDeedComponent},
  {path: 'schema', component:SchemaComponent},
  {path: 'search', component:SearchComponent},

]


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DeedsComponent,
    AddDeedComponent,
    EditDeedComponent,
    DeedDetailsComponent,
    SchemaComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    SimpleNotificationsModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    MdAutocompleteModule, 
    MdInputModule, 
    MdCheckboxModule, 
    MdSelectModule, 
    MdRadioModule, 
    MdButtonModule,
    SelectModule
  ],
  providers: [DeedService, SchemaService, SearchService, PagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
