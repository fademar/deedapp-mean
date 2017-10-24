import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NoteService } from '../../services/note.service';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  
  constructor(public dialog: MatDialog) {}

  ngOnInit() {
  }

  openNotes(): void {
    let dialogRef = this.dialog.open(NoteDialog, {
      width: '400px',
      disableClose: false
    });

  }

}


@Component({
  selector: 'app-note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrls: ['./note-dialog.component.css']
})
export class NoteDialog implements OnInit {

  noteForm: FormGroup;
  user: FormControl;
  date: FormGroup;
  content: FormControl;
  noteValue;
  note;
  notes;

  constructor(public dialogRef: MatDialogRef<NoteDialog>, private noteService: NoteService, private fb: FormBuilder, public auth: AuthService) { }


  ngOnInit() {
    this.initForm();
    this.showNotes();
 
  }

  initForm() {
    this.noteForm = this.fb.group({
      user: [''],
      date: [''],
      content: ['']
    })
  }

  showNotes() {
    this.noteService.getNotes().subscribe(notes => {
      this.notes = notes;
      console.log(this.notes);
    });
  }


  getUser() {
    return localStorage.getItem('nickName');
  }

  onSubmit() {
    let time = Date.now()
    let nickName = this.getUser();
		this.noteForm.patchValue({
      date: time, 
      user: nickName
    });
    this.noteValue = JSON.stringify(this.noteForm.value);
    this.noteService.saveNote(this.noteValue).subscribe(note => {
        this.note = note;
    });
    this.showNotes();
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }



}
