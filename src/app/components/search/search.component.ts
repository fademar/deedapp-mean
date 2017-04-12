import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { DeedService } from '../../services/deed.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {

  data;



  constructor(private searchservice: SearchService, private deedService: DeedService) { }

  ngOnInit() {
    this.data = this.deedService.getDeeds();
    console.log(this.data);   
    


  }
}
