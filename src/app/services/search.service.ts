import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';



@Injectable()

export class SearchService {

    results: Observable<any> = null;;

  constructor(private http: Http) { }

  clearCache(){
    this.results = null;
  }


  searchEntries(term) {
    return this.http.get('/api/search/'+term).pipe(map(res => res.json()));
  }


}
