import { Component, OnInit } from '@angular/core';
import { DeedService } from '../../services/deed.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as _ from "lodash";

@Component({
  selector: 'app-deed-details',
  templateUrl: './deed-details.component.html',
  styleUrls: ['./deed-details.component.css']
})
export class DeedDetailsComponent implements OnInit {
  
  id: string;
  deed;
  sub;
  term = this.term;

  constructor(private deedService:DeedService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    
    

    this.sub = this.route
      .queryParams
      .subscribe(params => {
        this.term = params['resultFor'] || null;
        this.deedService.getDeed(this.id).subscribe(deed => {
          
          if (this.term !== null) {
            this.deed = this.highlight(deed, this.term);
          } else {
             this.deed = deed;
             console.log(this.deed);
          }
        }); 
        
      });
  }
 
 onDeleteClick(id) {
    this.deedService.deleteDeed(id).subscribe(deed => {
      this.router.navigate(['/']);
    })
  }

  getCoAgentSex(i) {
		return this.deed.coAgents[i].coAgentSex;
	}
  
  getCoCounterAgentSex(i) {
		return this.deed.coCounterAgents[i].coCounterAgentSex;
	}

  getAgentAction(i) {
    return this.deed.transactions[i].agentAction;
  }

  getCounterAgentAction(i) {
    return this.deed.transactions[i].counterAgentAction;
  }

  highlight(results: Object, term:string) {

    let collection = JSON.stringify(results);

    // let highlightTerm = _.escape('<p class="highlighting">'+term+'</p>');

    let resultHighlight = _.replace(collection, new RegExp(term, 'g'), '<myHighlight>'+term+'</myHighlight>');
    console.log(resultHighlight);
    return JSON.parse(resultHighlight);

  }


}
