import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DeedService {

  constructor(private http: Http) { }

  	getDeeds() {
  		return this.http.get('http://localhost:3000/api/deeds').map(res => res.json());
  		
  	}

}
