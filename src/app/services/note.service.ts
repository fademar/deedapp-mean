import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class NoteService {

  constructor(private http: HttpClient) { }
  
    getNotes() {
      return this.http.get('/api/notes').map(res => res.json());  		
    }
  
    saveNote(note) {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      return this.http.post('/api/notes', note, {headers: headers}).map(res => res.json());
    }
  
    getNote(id) {
      return this.http.get('/api/note/'+id).map(res => res.json());  		
    }
  
    updateNote(id, note) {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'application/json');
      return this.http.put('/api/note/'+id, note, {headers: headers}).map(res => res.json());
    }
  
    deleteNote(id) {
        return this.http.delete('/api/note/'+id).map(res => res.json());  		
    }
  

}
