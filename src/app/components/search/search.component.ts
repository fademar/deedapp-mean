import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SearchService]
})
export class SearchComponent implements OnInit {

  results: Object;
  searchTerm = new Subject<string>();

  constructor(private searchService: SearchService) { 
    
  }

  ngOnInit() {
    this.searchService.search(this.searchTerm).subscribe(results => {
        this.results = results;
    });
  }

}
