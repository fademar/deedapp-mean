import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class DeedService {

  constructor(private http: Http) { }

  	getDeeds() {
  		return this.http.get('http://localhost:8080/api/deeds').map(res => res.json());  		
  	}

	saveDeed(deed) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.post('http://localhost:8080/api/deeds', deed, {headers: headers}).map(res => res.json());
	}

	getDeed(id) {
  		return this.http.get('http://localhost:8080/api/deed/'+id).map(res => res.json());  		
  	}

	updateDeed(id, deed) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.put('http://localhost:8080/api/deed/'+id, deed, {headers: headers}).map(res => res.json());
	}

	deleteDeed(id) {
  		return this.http.delete('http://localhost:8080/api/deed/'+id).map(res => res.json());  		
  	}

	getLastDeed() {
		return this.http.get('http://localhost:8080/api/lastdeed/').map(res => res.json());
	}


}
