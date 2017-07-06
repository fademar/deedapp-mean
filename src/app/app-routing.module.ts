import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { DeedsComponent } from './components/deeds/deeds.component';
import { AddDeedComponent } from './components/add-deed/add-deed.component';
import { EditDeedComponent } from './components/edit-deed/edit-deed.component';
import { DeedDetailsComponent } from './components/deed-details/deed-details.component';
import { SchemaComponent } from './components/schema/schema.component';
import { SearchComponent } from './components/search/search.component';

const appRoutes: Routes = [
  {path: 'list', component:DeedsComponent},
  {path: 'deed/add', component:AddDeedComponent},
  {path: 'deed/:id', component:DeedDetailsComponent},
  {path: 'deed/edit/:id', component:EditDeedComponent},
  {path: 'schema', component:SchemaComponent},
  {path: 'search', component:SearchComponent},
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
