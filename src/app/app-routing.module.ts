import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { DeedsComponent } from './components/deeds/deeds.component';
import { AddDeedComponent } from './components/add-deed/add-deed.component';
import { EditDeedComponent } from './components/edit-deed/edit-deed.component';
import { DeedDetailsComponent } from './components/deed-details/deed-details.component';
import { SchemaComponent } from './components/schema/schema.component';
import { SearchComponent } from './components/search/search.component';
import { CallbackComponent } from './components/callback/callback.component';
import { HomeComponent } from './components/home/home.component';

import { AuthGuard } from './services/guard.service';

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component:HomeComponent},
  {path: 'list', component:DeedsComponent, canActivate: [AuthGuard]},
  {path: 'deed/add', component:AddDeedComponent, canActivate: [AuthGuard]},
  {path: 'deed/:id', component:DeedDetailsComponent, canActivate: [AuthGuard]},
  {path: 'deed/edit/:id', component:EditDeedComponent, canActivate: [AuthGuard]},
  {path: 'schema', component:SchemaComponent, canActivate: [AuthGuard]},
  {path: 'search', component:SearchComponent, canActivate: [AuthGuard]},
  {path: 'callback', component:CallbackComponent},
]


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
