import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';


import { SearchService } from '../../services/search.service';
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SearchService]
})



export class SearchComponent implements OnInit {


    searchForm: FormGroup;
    searchTerm: FormControl;
    
    term = this.term;
    results;
    sub;

    constructor(private fb: FormBuilder, private searchService: SearchService, private router: Router, private route: ActivatedRoute) { 
        
    }

    ngOnInit() {
        this.searchForm = this.fb.group({
            searchTerm: ['']
        })

        this.sub = this.route
            .queryParams
            .subscribe(params => {
                this.term = params['resultFor'];
                if(this.term) {
                    console.log(this.term);
                    this.loadData(this.term);
                }
            });

    
    }

    loadData(q) {
        this.searchService.searchEntries(q).subscribe(results => this.results = results);
    }

    onSubmit() {
        this.term = this.searchForm.controls.searchTerm.value;
        this.loadData(this.term);
    }



}
