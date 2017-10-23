import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NoteService {

  constructor(private http: Http) { }
  
    getNotes() {
      return this.http.get('/api/notes').map(res => res.json());  		
    }
  
    saveNote(note) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.post('/api/notes', note, {headers: headers}).map(res => res.json());
    }
  
    getNote(id) {
        return this.http.get('/api/note/'+id).map(res => res.json());  		
    }
  
    updateNote(id, note) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.put('/api/note/'+id, note, {headers: headers}).map(res => res.json());
    }
  
    deleteNote(id) {
        return this.http.delete('/api/note/'+id).map(res => res.json());  		
    }
  

}
