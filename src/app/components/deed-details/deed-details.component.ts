import { Component, OnInit } from '@angular/core';
import { DeedService } from '../../services/deed.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-deed-details',
  templateUrl: './deed-details.component.html',
  styleUrls: ['./deed-details.component.css']
})
export class DeedDetailsComponent implements OnInit {

  id: string;
  deed;
  deedDetails;

  constructor(private deedService:DeedService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.deedService.getDeed(this.id).subscribe(deed => {
      this.deed = deed;
      this.deedDetails = JSON.stringify(deed, null, '\t');
    });
  }
 
 onDeleteClick(id) {
    this.deedService.deleteDeed(id).subscribe(deed => {
      this.router.navigate(['/']);
    })
  }

}
