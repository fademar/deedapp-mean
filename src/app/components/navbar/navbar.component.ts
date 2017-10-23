import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { NoteComponent } from '../../shared/note/note.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  dialogRef: MatDialogRef<NoteComponent>;
  
  constructor(public auth: AuthService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  openNotes() {
    this.dialogRef = this.dialog.open(NoteComponent, {
      disableClose: false
    });
  }

}
