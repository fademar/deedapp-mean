import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const apiUrl = "/api/deeds";



@Injectable()
export class DeedService {


	constructor(private http: HttpClient) { }


	private handleError(error: HttpErrorResponse) {
		if (error.error instanceof ErrorEvent) {
			// A client-side or network error occurred. Handle it accordingly.
			console.error('An error occurred:', error.error.message);
		} else {
			// The backend returned an unsuccessful response code.
			// The response body may contain clues as to what went wrong,
			console.error(
				`Backend returned code ${error.status}, ` +
				`body was: ${error.error}`);
		}
		// return an observable with a user-facing error message
		return throwError('Something bad happened; please try again later.');
	};

	private extractData(res: Response) {
		let body = res;
		return body || {};
	}

	getDeeds(): Observable<any> {
		return this.http.get(apiUrl).pipe(
			map(this.extractData),
			catchError(this.handleError));
	}

	getDeed(id: string): Observable<any> {
		const url = `${apiUrl}/${id}`;
		return this.http.get(url).pipe(
			map(this.extractData),
			catchError(this.handleError));
	}

	saveDeed(data): Observable<any> {
		return this.http.post(apiUrl, data, httpOptions)
			.pipe(
				catchError(this.handleError)
			);
	}

	updateDeed(id: string, data): Observable<any> {
		const url = `${apiUrl}/${id}`;
		return this.http.put(url, data, httpOptions)
			.pipe(
				catchError(this.handleError)
			);
	}

	deleteDeed(id: string): Observable<{}> {
		const url = `${apiUrl}/${id}`;
		return this.http.delete(url)
			.pipe(
				catchError(this.handleError)
			);
	}


	getLastDeed() {
		return this.http.get('/api/lastdeed/').pipe(
			map(this.extractData),
			catchError(this.handleError));
	}


}
