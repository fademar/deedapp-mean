import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DeedsComponent } from './components/deeds/deeds.component';
import { AddDeedComponent } from './components/add-deed/add-deed.component';
import { EditDeedComponent } from './components/edit-deed/edit-deed.component';
import { DeedDetailsComponent } from './components/deed-details/deed-details.component';
import { SchemaComponent } from './components/schema/schema.component';
import { DynamicFormQuestionComponent } from './components/dynamic-form-question/dynamic-form-question.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';


import { DeedService } from './services/deed.service';
import { SchemaService } from './services/schema.service';
import { QuestionControlService } from './services/question-control.service';
import { QuestionService } from './services/question.service';


const appRoutes: Routes = [
  {path: '', component:DeedsComponent},
  {path: 'deed/add', component:AddDeedComponent},
  {path: 'deed/:id', component:DeedDetailsComponent},
  {path: 'deed/edit/:id', component:EditDeedComponent},
  {path: 'schema', component:SchemaComponent}
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
    DynamicFormQuestionComponent,
    DynamicFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DeedService, SchemaService, QuestionControlService, QuestionService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
