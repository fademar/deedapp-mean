import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NoteService } from '../../services/note.service';
import { DatePipe } from '@angular/common';
import { NgClass } from '@angular/common';
import * as _ from 'lodash';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  providers: [MatDialog]
})
export class NotesComponent implements OnInit {

  noteForm: FormGroup;
  user: FormControl;
  date: FormGroup;
  content: FormControl;
  noteValue;
  note;
  notes;
  noteFull = this.noteFull;
  contentClass = this.contentClass;
  editMode = false;
  noteId = null;
  editor;
  currentUser;
  isNotUser = false;

  dialogRef: MatDialogRef<ConfirmDialogComponent>;

  constructor(private titleService: Title, private noteService: NoteService, private fb: FormBuilder, public auth: AuthService, public dialog: MatDialog) { }

  ngOnInit() {
    this.titleService.setTitle('NOTES - Russian Deeds App');
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
      this.notes = _.orderBy(notes, 'date', 'desc');
    });
  }


  getUser() {
    let username = localStorage.getItem('userName');
    return username;
  }

  onSubmit() {
    let time = Date.now()
    let userName = this.getUser();
    this.noteForm.patchValue({
      date: time,
      user: userName
    });
    this.noteValue = this.noteForm.value;
    if (this.editMode) {
      this.noteService.updateNote(this.noteId, this.noteValue).subscribe(note => {
        this.showNotes();
        this.noteId = null;
        this.editMode = false;
      });
    } else {
      this.noteService.saveNote(this.noteValue).subscribe(note => {
        this.showNotes();
      });
    }
    this.noteForm.reset();
  }


  onEditClick(id) {
    this.editMode = true;
    this.isNotUser = false;
    this.noteId = id;
    this.currentUser = this.getUser();
    this.noteService.getNote(id).subscribe(note => {
      this.noteFull = note;
      if (this.noteFull.user !== this.currentUser) {
        this.isNotUser = true;
      }
      this.noteForm.patchValue({
        content: this.noteFull.content
      });
    });
  }

  onDeleteClick(id) {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete this note?"

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.noteService.deleteNote(id).subscribe(note => {
          this.showNotes();
          this.noteForm.reset();
        })
      }
      this.dialogRef = null;
    });
  }
}
