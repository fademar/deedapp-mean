import { NgModule }              from '@angular/core';
import { RouterModule, Routes, CanActivate }  from '@angular/router';

import { AuthGuard } from './services/auth-guard.service';

import { DeedsComponent } from './components/deeds/deeds.component';
import { AddDeedComponent } from './components/add-deed/add-deed.component';
import { EditDeedComponent } from './components/edit-deed/edit-deed.component';
import { DeedDetailsComponent } from './components/deed-details/deed-details.component';
import { SchemaComponent } from './components/schema/schema.component';
import { SearchComponent } from './components/search/search.component';
import { HomeComponent } from './components/home/home.component';
import { CallbackComponent } from './components/callback/callback.component';

const appRoutes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'list', component:DeedsComponent, canActivate: [AuthGuard]},
  {path: 'deed/add', component:AddDeedComponent, canActivate: [AuthGuard]},
  {path: 'deed/:id', component:DeedDetailsComponent, canActivate: [AuthGuard]},
  {path: 'deed/edit/:id', component:EditDeedComponent, canActivate: [AuthGuard]},
  {path: 'schema', component:SchemaComponent, canActivate: [AuthGuard]},
  {path: 'search', component:SearchComponent, canActivate: [AuthGuard]},
  {path: 'callback', component: CallbackComponent},
  {path: '**', redirectTo: '' }
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
