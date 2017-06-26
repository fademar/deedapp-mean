import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';



@Injectable()

export class SearchService {

    results: Observable<any> = null;;

  constructor(private http: Http) { }

  clearCache(){
    this.results = null;
  }


  searchEntries(term) {
        if(!this.results) {
            this.results = this.http.get('/api/search/'+term).map(res => res.json());
        }
    return this.results;
  }


}
