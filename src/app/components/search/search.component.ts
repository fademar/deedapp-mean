import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
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

    constructor(private titleService: Title, private fb: FormBuilder, private searchService: SearchService, private router: Router, private route: ActivatedRoute, public auth: AuthService) { 
        
    }

    ngOnInit() {
        this.titleService.setTitle('SEARCH - Russian Deeds App');
        this.searchForm = this.fb.group({
            searchTerm: ['']
        })

        this.sub = this.route
            .queryParams
            .subscribe(params => {
                this.term = params['resultFor'];
                if(this.term) {
                    this.loadData(this.term);
                }
            });

    
    }

    loadData(q) {
        this.searchService.searchPlainText(q).subscribe(results => {
            this.results = results;
            console.log(this.results);
        });
    }

    onSubmit() {
        this.term = this.searchForm.controls.searchTerm.value;
        this.searchService.clearCache();
        this.loadData(this.term);
        localStorage.setItem('results', JSON.stringify(this.loadData(this.term)));
    }

    clearResults() {
        this.searchForm.reset();
        this.results = '';
    }

}
