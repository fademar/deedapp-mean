import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DeedsComponent } from './components/deeds/deeds.component';
import { AddDeedComponent } from './components/add-deed/add-deed.component';
import { EditDeedComponent } from './components/edit-deed/edit-deed.component';
import { DeedDetailsComponent } from './components/deed-details/deed-details.component';

import { DeedService } from './services/deed.service';

const appRoutes: Routes = [
  {path:'', component:DeedsComponent},
  {path:'deed/add', component:AddDeedComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DeedsComponent,
    AddDeedComponent,
    EditDeedComponent,
    DeedDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DeedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
