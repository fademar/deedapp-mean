import { Component, OnInit, ViewChild, OnDestroy, Inject } from '@angular/core';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, PartialObserver } from 'rxjs'; import { map } from 'rxjs/operators';
import { NotificationsService } from 'angular2-notifications';
import { FirstnamesService } from '../../services/firstnames.service';
import { FirstNameObject, alphabet } from '../../models/deed-model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { AuthService } from '../../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})

export class ToolsComponent implements OnInit, OnDestroy {

  public options = {
    position: ['bottom', 'right'],
    timeOut: 2000,
    showProgressBar: false,
    pauseOnHover: false,
    animate: 'fade'
  }

  form: FormGroup;
  firstNames;
  firstNamesSorted;
  alphabet = alphabet;
  nameForm;
  control;
  formValue;
  navigationSubscription;


  constructor(private firstnamesService: FirstnamesService, private notificationsService: NotificationsService, private fb: FormBuilder, public auth: AuthService, private router: Router, public dialog: MatDialog) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initializeComponent();
      }
    });
  }

  initializeComponent() {
    this.form = this.fb.group({});
    this.firstNames = [];
    this.formValue = [];
    this.firstNamesSorted = [];
    this.firstnamesService.getFirstNames().subscribe(data => {
      this.firstNamesSorted = data;
      for (let index = 0; index < data.length; index++) {
        const control = new FormControl;
        this.form.addControl(index.toString(), control);
      }
    });
  }

  ngOnInit() {
    this.initializeComponent();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    // avoid memory leaks here by cleaning up after ourselves. If we  
    // don't then we will continue to run our initialiseInvites()   
    // method on every navigationEnd event.
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  updateFirstName() {
    for (const key in this.form.value) {
      if (this.form.value[key] !== null) {
        const newName = this.form.value[key];
        this.firstNamesSorted[key].idsAndFields.forEach(element => {
          const placeholder = {};
          placeholder[element.field] = newName;
          this.formValue.push({ 'id': element.id, placeholder, 'oldName': this.firstNamesSorted[key].name, 'newName': newName});
        });
      }
    }
    this.firstnamesService.updateFirstnames(this.formValue).subscribe(data => {
      if (Number.isInteger(data)) {
        if (data === 1) {
          this.notificationsService.success(
            'Success',
            'One document has been successfully updated.',
          );
        } else {
          this.openDialog();
          this.notificationsService.success(
            'Success',
            data + ' documents have been successfully updated.',
          );
        }
      } else {
        this.notificationsService.error(
          'Error',
          data
        )
      }
    });

    // setTimeout(() => {
    //   this.initializeComponent();
    // }, 2000);
  }

  insertFirstNames(index) {
    this.firstNamesSorted.forEach(element => {
      element['versions'] = [];
    });
    let chunkedList = _.chunk(this.firstNamesSorted, 100);
    this.firstnamesService.insertFirstnames(chunkedList[index]).subscribe(data => {
      this.notificationsService.success(
        'Success',
        'documents have been successfully inserted.',
      );
    });
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogTools, {
      width: '250px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }




}



@Component({
  selector: 'tools-dialog-component',
  templateUrl: './tools-dialog-component.html',
})
export class DialogTools {}
