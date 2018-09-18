import { Component, OnInit } from '@angular/core';
import { DeedService } from '../../services/deed.service';
import { NotificationsService } from 'angular2-notifications';


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

  constructor(private deedService: DeedService, private notificationsService: NotificationsService) { }

  ngOnInit() {
  
    
  
  
  }

}
