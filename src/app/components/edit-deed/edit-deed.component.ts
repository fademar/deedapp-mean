import { Component, OnInit } from '@angular/core';
import { DeedService } from '../../services/deed.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-deed',
  templateUrl: './edit-deed.component.html',
  styleUrls: ['./edit-deed.component.css']
})
export class EditDeedComponent implements OnInit {
  id;
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

  onEditSubmit() {
    let deed = this.deedDetails;

    this.deedService.updateDeed(this.id, deed).subscribe(deed =>{
      this.router.navigate(['/deed/'+this.id]);
    })

  }

}
