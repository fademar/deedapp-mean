import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { DeedService } from '../../services/deed.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AuthService } from '../../services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-deed-details',
  templateUrl: './deed-details.component.html',
  styleUrls: ['./deed-details.component.css'],
  providers: [MatDialog]
})
export class DeedDetailsComponent implements OnInit {
  
  id: string;
  deed;
  sub;
  selectedActions = this.selectedActions;
  selectedAction;
  selectedCounterActions = this.selectedCounterActions;
  selectedCounterAction;
  downloadUri = this.downloadUri;
  downloadName = this.downloadName;
  
  dialogRef: MatDialogRef<ConfirmDialogComponent>;

  term = this.term;
  constructor(private titleService: Title, private deedService:DeedService, private router: Router, private route: ActivatedRoute, public dialog: MatDialog, public auth: AuthService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.titleService.setTitle('DETAILS - Russian Deeds App');
    this.id = this.route.snapshot.params['id'];
    
    this.deedService.getDeed(this.id).subscribe(deed => {
        this.deed = deed;

        // Download Button Function
        let json = JSON.stringify(this.deed);
        this.downloadUri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(json));
        this.downloadName = this.deed.deedCode + '_' + this.deed.deedRef + '.json';
        

        // Populate the dom
        this.selectedActions = [];
        this.selectedCounterActions = [];
        
        this.deed.transactions.forEach(transaction => {
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
        });

      


    });

    this.sub = this.route
      .queryParams
      .subscribe(params => {
        this.term = params['resultFor'] || null;
      });
  }
 
 onDeleteClick(id) {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete the deed?"

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.deedService.deleteDeed(id).subscribe(deed => {
          this.router.navigate(['/list']);
        })
      }
      this.dialogRef = null;
    });

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
