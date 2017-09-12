import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class DeedService {

  constructor(private http: Http) { }

  	getDeeds() {
  		this.http.get('/api/deeds').map(res => {
			  let response = res.json();
			  console.log(response);
			  return response;
		});
		  		
  	}

	saveDeed(deed) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.post('/api/deeds', deed, {headers: headers}).map(res => res.json());
	}

	getDeed(id) {
  		return this.http.get('/api/deed/'+id).map(res => res.json());  		
  	}

	updateDeed(id, deed) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.put('/api/deed/'+id, deed, {headers: headers}).map(res => res.json());
	}

	deleteDeed(id) {
  		return this.http.delete('/api/deed/'+id).map(res => res.json());  		
  	}

	getLastDeed() {
		return this.http.get('/api/lastdeed/').map(res => res.json());
	}


}
