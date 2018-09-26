import { Component, OnInit } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificationsService } from 'angular2-notifications';
import { FirstnamesService } from '../../services/firstnames.service';

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

  firstNamesMaleSorted;
  firstNamesFemaleSorted;


  constructor(private firstnamesService: FirstnamesService, private notificationsService: NotificationsService) { }

  ngOnInit() {
  
    this.firstnamesService.getFirstNamesM().pipe(map(data => this.firstNamesMaleSorted));
    this.firstnamesService.getFirstNamesF().pipe(map(data => this.firstNamesFemaleSorted));
    console.log(this.firstNamesMaleSorted);
    console.log(this.firstNamesFemaleSorted);
  }

  






}
