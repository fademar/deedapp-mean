import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, PartialObserver } from 'rxjs'; import { map } from 'rxjs/operators';
import { NotificationsService } from 'angular2-notifications';
import { FirstnamesService } from '../../services/firstnames.service';
import { FirstNameObject, alphabet } from '../../models/deed-model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {


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

  constructor(private firstnamesService: FirstnamesService, private notificationsService: NotificationsService, private fb: FormBuilder) { }

  ngOnInit() {
    this.form = new FormGroup({});
    this.firstNames = [];
    this.firstNamesSorted = [];
    this.firstnamesService.getFirstNames().subscribe(data => {
      this.firstNamesSorted = this.getFirstnamesSorted(data);
      for (let index = 0; index < this.firstNamesSorted.length; index++) {
        const controlName: string = 'control-'+ index;
        const control = new FormControl;
        this.form.addControl(controlName, control);
      }
    });
  }




  getFirstnamesSorted(data) {
    let array = [];
    data.forEach(element => {
      let nameAndSex = {'name':element.getFirstname(), 'sex':element.getSex(), 'ids':[element.getId()]}
      let indexName = _.findIndex(array, (o) => {return o.name === nameAndSex.name});
      if (indexName === -1) {
        array.push(nameAndSex);
      } else {
        array[indexName].ids.push(element.getId());
      }
    });

    array.sort((a, b) => a.name.localeCompare(b.name, 'ru', {}));
    return array
  }


  updateFirstName() {
    console.log(this.form.value);
  }


}
