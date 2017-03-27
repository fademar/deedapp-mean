import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SchemaService {

  constructor(private http: Http) { }
    
    getSchema() {
  		return this.http.get('http://localhost:3000/api/schema').map(res => res.json());	
  	}
}
