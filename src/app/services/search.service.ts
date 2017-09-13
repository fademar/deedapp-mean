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
    return this.http.get('http://localhost:3000/api/search/'+term).map(res => res.json());
  }


}
