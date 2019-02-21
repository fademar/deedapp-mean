import { Component, OnInit, ViewChild, OnDestroy, Inject } from '@angular/core';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, PartialObserver } from 'rxjs'; 
import { map } from 'rxjs/operators';
import { NotificationsService } from 'angular2-notifications';
import { DictionaryService } from '../../services/dictionary.service';
import { FirstNameObject, alphabet } from '../../models/deed-model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { AuthService } from '../../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent implements OnInit {

  constructor(private dictionaryService: DictionaryService, private notificationsService: NotificationsService, private fb: FormBuilder, public auth: AuthService, private router: Router, public dialog: MatDialog) { }

  
  ngOnInit() {
    this.dictionaryService.getFirstnamesFromDictionary().subscribe(data => console.log(data));


  }





}
