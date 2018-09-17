import { Component, OnInit } from '@angular/core';
import { DeedService } from '../../services/deed.service';
import { NotificationsService } from 'angular2-notifications';


@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {

  constructor(private deedService: DeedService, private notificationsService: NotificationsService) { }

  ngOnInit() {
  
    
  
  
  }

}
