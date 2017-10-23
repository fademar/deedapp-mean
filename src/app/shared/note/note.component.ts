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

  noteForm: FormGroup;
  user: FormControl;
  date: FormGroup;
  content: FormControl;
  noteValue;
  note;
  notes;

  constructor(public dialogRef: MatDialogRef<NoteComponent>, private noteService: NoteService, private fb: FormBuilder, public auth: AuthService) { }


  ngOnInit() {
    this.initForm();
    this.noteService.getNotes().subscribe(notes => {
      this.notes = notes;
      console.log(this.notes);
    });
 
  }

  initForm() {
    this.noteForm = this.fb.group({
      user: [''],
      date: [''],
      content: ['']
    })
  }

  getUser() {
    this.auth.getUserInfo();
  }


  onSubmit() {
    let time = Date.now()
		this.noteForm.patchValue({date: time});
    this.noteValue = JSON.stringify(this.noteForm.value);
    this.noteService.saveNote(this.noteValue).subscribe(note => {
        this.note = note;
    });
  }


  onCloseClick(): void {
    this.dialogRef.close();
  }



}
