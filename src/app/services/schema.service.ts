import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class SchemaService {

  constructor(private http: Http) { }
    
    getSchema() {
  		return this.http.get('http://localhost:3000/api/schema').pipe(map(res => res.json()));	
  	}
}
