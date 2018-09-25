import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable()

export class SearchService {

    results: Observable<any> = null;;

  constructor(private http: HttpClient) { }

  clearCache(){
    this.results = null;
  }

  searchEntries(term) {
    return this.http.get('/api/search/'+term).pipe(map(res => res.json()));
  }


}
