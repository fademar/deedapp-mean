import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

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
    
    term;
    results;

    constructor(private fb: FormBuilder, private searchService: SearchService) { 
        
    }

    ngOnInit() {
        
        this.searchForm = this.fb.group({
            searchTerm: ['']
        })
    
    }

    onSubmit() {
        this.term = JSON.stringify(this.searchForm.controls.searchTerm.value);
        this.searchService.searchEntries(this.term).subscribe(results => this.results = results);

    }



}
