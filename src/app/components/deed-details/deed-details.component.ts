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
  sub;
  selectedActions = this.selectedActions;
  selectedAction;
  selectedCounterActions = this.selectedCounterActions;
  selectedCounterAction;
  

  term = this.term;
  constructor(private deedService:DeedService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    
    this.deedService.getDeed(this.id).subscribe(deed => {
      this.deed = deed;
      this.selectedActions = [];
      this.selectedCounterActions = [];

      this.deed.transactions.forEach(transaction => {
        console.log(transaction);
        switch (transaction.agentAction) {

            case 'cedes': {
                this.selectedAction = 'what';
                this.selectedCounterAction = 'what';
                break;
            }
            case 'exchanges': {
                this.selectedAction = 'what';
                this.selectedCounterAction = 'what';
                break;
            }
            case 'mortgages': {
                this.selectedAction = 'what';
                this.selectedCounterAction = 'what';
                break;
            }
            case 'puts to rent': {
                this.selectedAction = 'what';
                this.selectedCounterAction = 'what';
                break;
            }
            case 'sells': {
                this.selectedAction = 'what';
                this.selectedCounterAction = 'what';
                break;
            }
            case 'donates':
            case 'borrows': {
                this.selectedAction = 'what';
                this.selectedCounterAction = '';
                break;
            }
            case 'agrees to marry-off': {
                this.selectedAction = 'whom';
                break;
            }
            case 'engages': {
                this.selectedAction = 'asWhom';
                this.selectedCounterAction = 'what';
                break;
            }
            case 'bequeaths': {
                this.selectedAction = 'bequeaths';
                break;
            }
            case 'settles': {
                this.selectedAction = 'settles';
                this.selectedCounterAction = 'settles';
                
                break;
            }
            case 'agrees to marry': {
                this.selectedAction = '';
                break;
            }
            case 'manumits': {
                this.selectedAction = '';
                this.selectedCounterAction = 'what';
                break;
            }
            case 'agrees to divorce':
            case 'promises':
            case 'elects':
            case 'signs receipt': {
                this.selectedAction = '';
                this.selectedCounterAction = '';
                break;
            }
            case 'other': {
                this.selectedAction = 'other';         
                break;
            }
            default: {
                this.selectedAction = '';
                this.selectedCounterAction = '';
                break;
            }
        }
      
      
        this.selectedActions.push(this.selectedAction);
        this.selectedCounterActions.push(this.selectedCounterAction);  
        console.log(this.selectedActions);
        console.log(this.selectedCounterActions);
      });

      


    });

    this.sub = this.route
      .queryParams
      .subscribe(params => {
        this.term = params['resultFor'] || null;
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
}
