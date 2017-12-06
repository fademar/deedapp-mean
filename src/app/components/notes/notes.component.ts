import { Component, OnInit, AfterViewInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NoteService } from '../../services/note.service';
import { DatePipe } from '@angular/common';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit, AfterViewInit, OnDestroy {

  @Output() onEditorKeyup = new EventEmitter<any>();

  noteForm: FormGroup;
  user: FormControl;
  date: FormGroup;
  content: FormControl;
  noteValue;
  note;
  notes;
  contentClass = this.contentClass;
  editMode = false;
  noteId = null;
  editor;

  constructor(private noteService: NoteService, private fb: FormBuilder, public auth: AuthService) { }

  ngOnInit() {
    this.initForm();
    this.showNotes();
  }

  ngAfterViewInit() {
    tinymce.init({
      selector: '#editor',
      plugins: ['link', 'paste', 'table'],
      skin_url: 'assets/skins/lightgray',
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
        });
      },
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
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
    });
  }


  getUser() {
    return localStorage.getItem('userName');
  }

  onSubmit() {
    let time = Date.now()
    let userName = this.getUser();
		this.noteForm.patchValue({
      date: time, 
      user: userName
    });
    this.noteValue = JSON.stringify(this.noteForm.value);
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
    this.noteId = id;
    this.noteService.getNote(id).subscribe(note => {
      this.note = note;
      this.noteForm.patchValue({
        content: this.note.content
      });
    });
  }

  onDeleteClick(id) {
    this.noteService.deleteNote(id).subscribe(note => {
      this.showNotes();
    });
  }


}
