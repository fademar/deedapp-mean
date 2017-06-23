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
<<<<<<< HEAD
    return this.http.get('/api/search/'+term).map(res => res.json());
=======
        if(!this.results) {
            this.results = this.http.get('http://localhost:3000/api/search/'+term)
                                    .map(res => res.json())
                                    .publishReplay(1)
                                    .refCount();
        }
    return this.results;
>>>>>>> 7983d78abaf2166fb5adaeae390bfe14be9490ae
  }


}
