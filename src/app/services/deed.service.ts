import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class DeedService {

  constructor(private http: Http, private authHttp: AuthHttp) { }

  	getDeeds() {
  		return this.authHttp.get('http://localhost:3000/api/deeds').map(res => res.json());  		
  	}

	saveDeed(deed) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.authHttp.post('http://localhost:3000/api/deeds', deed, {headers: headers}).map(res => res.json());
	}

	getDeed(id) {
  		return this.authHttp.get('http://localhost:3000/api/deed/'+id).map(res => res.json());  		
  	}

	updateDeed(id, deed) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.authHttp.put('http://localhost:3000/api/deed/'+id, deed, {headers: headers}).map(res => res.json());
	}

	deleteDeed(id) {
  		return this.authHttp.delete('http://localhost:3000/api/deed/'+id).map(res => res.json());  		
  	}

	getLastDeed() {
		return this.authHttp.get('http://localhost:3000/api/lastdeed/').map(res => res.json());
	}


}
