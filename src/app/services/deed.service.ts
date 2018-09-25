import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class DeedService {

  constructor(private http: HttpClient) { }

  	getDeeds() {
  		return this.http.get('/api/deeds').pipe(map(res => res.json()));  		
  	}

	saveDeed(deed) {
		let headers = new HttpHeaders();
		headers.append('Content-Type', 'application/json');
		return this.http.post('/api/deeds', deed, {headers: headers}).pipe(map(res => res.json()));
	}

	getDeed(id) {
  		return this.http.get('/api/deed/'+id).pipe(map(res => res.json()));  		
  	}

	updateDeed(id, deed) {
		let headers = new HttpHeaders();
		headers.append('Content-Type', 'application/json');
		return this.http.put('/api/deed/'+id, deed, {headers: headers}).pipe(map(res => res.json()));
	}

	deleteDeed(id) {
  		return this.http.delete('/api/deed/'+id).pipe(map(res => res.json()));  		
  	}

	getLastDeed() {
		return this.http.get('/api/lastdeed/').pipe(map(res => res.json()));
	}


}
