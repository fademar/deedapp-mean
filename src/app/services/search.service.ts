import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';


@Injectable()

export class SearchService {


  constructor(private http: Http) { }


  search(terms: Observable<string>) {
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.searchEntries(term));
  }

  initSearch() {
    return this.http.get('/api/search/').map(res => res.json());
  }

  searchEntries(term) {
    return this.http.get('/api/search/'+term).map(res => res.json());
  }


}
