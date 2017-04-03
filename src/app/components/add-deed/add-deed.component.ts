import { Component, OnInit, Input } from '@angular/core';
import { DeedService } from '../../services/deed.service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Deed, AgentM, AgentF, ReferentMale, OtherParticipant, Registrator, Fee, gender, transactionTypes, currencies } from '../../models/deed-model'

@Component({
	selector: 'app-add-deed',
	templateUrl: './add-deed.component.html',
	styleUrls: ['./add-deed.component.css']
})
export class AddDeedComponent implements OnInit {
	
	deedForm: FormGroup;
	agent: FormGroup;
	counterAgent: FormGroup;
	gender = gender;
	deedValue = '';
	agentSex = '';
	counterAgentSex = '';
	coAgentSex = '';
	transactionTypes = transactionTypes;
	currencies = currencies;


	constructor(private fb: FormBuilder, private deedService: DeedService, private router: Router) {}

	ngOnInit() {

		this.createForm();
	}

	// Create the form

	createForm() {

		this.deedForm = this.fb.group({
			deedCode: ['', Validators.required],
			deedRef: ['', Validators.required],
			deedDate: [''], 
			deedName: [''],
			deedLanguage: ['russian'],
			agentSex: [''], 
			agent: [''],
			coAgents: this.fb.array([]),
			counterAgentSex: [''],
			counterAgent: [''], 
			coCounterAgents: this.fb.array([]),
			transactions: this.fb.array([
				this.initTransaction(),
			]),
			agentTransactionObject: [''],
			counterAgentTransactionObject: [''],
			advancePayment: [false],
			contractConditions: [''],
			contractDuration: [''],
			forfeit: [''],
			whitness: this.fb.group({
				geogrStatus: [''],
				socialStatus: [''],
				firstName: [''],
				patronyme: [''],
				lastName: [''],
				relatedTo: ['']
			}),
			surety: this.fb.group({
				geogrStatus: [''],
				socialStatus: [''],
				firstName: [''],
				patronyme: [''],
				lastName: [''],
				relatedTo: ['']
			}),
			scribe: this.fb.group({
				geogrStatus: [''],
				socialStatus: [''],
				firstName: [''],
				patronyme: [''],
				lastName: [''],
				relatedTo: ['']
			}),
			otherParticipant: this.fb.group({
				role: [''],
				geogrStatus: [''],
				socialStatus: [''],
				firstName: [''],
				patronyme: [''],
				lastName: [''],
				relatedTo: ['']
			}),
			registrationDate: [''],
			registrator: this.fb.group({
				firstName: [''],
				patronyme: [''],
				lastName: [''],
				relatedTo: ['']
			}),
			fee: this.fb.group({
				amount: [''],
				collected: ['yes']
			}),
			verbatimCitations: [''],
			researcherNotes: ['']
		})
	
	}

	// Submit the form

	onSubmit() {
		this.deedValue = JSON.stringify(this.deedForm.value);
		this.deedService.saveDeed(this.deedValue).subscribe(deed => {
			this.router.navigate(['/']);
		})
	}

	// Get the gender of the main agents (agent and counter-agent)

 	getAgentSex() {
			
		return this.deedForm.get('agentSex').value;
	}

	getCounterAgentSex() {
		return this.deedForm.get('counterAgentSex').value;
	}

	updateAgent() {
			this.agentSex = this.deedForm.get('agentSex').value;

			switch (this.agentSex) {
			case 'M': {
				this.agent = this.fb.group({
					geogrStatus: [''],
					socialStatus: [''],
					firstName: [''],
					patronyme: [''],
					lastName: [''],
					relatedTo: ['']
				})
				break;
			}
			case 'F': {
				this.agent = this.fb.group({
					familyStatus: [''],
					firstName: [''],
					patronyme: [''],
					relatedTo: [''],
					referentMale: this.fb.group({
						relationshipToAgentSexF: [''],
						geogrStatus: [''],
						socialStatus: [''],
						firstName: [''],
						patronyme: [''],
						lastName: [''],
						relatedTo: ['']
					}) 
				})
				break;
			}
		}
		this.deedForm.setControl('agent', this.agent);
	}

	updateCounterAgent() {
			this.counterAgentSex = this.deedForm.get('counterAgentSex').value;

			switch (this.counterAgentSex) {
			case 'M': {
				this.counterAgent = this.fb.group({
					geogrStatus: [''],
					socialStatus: [''],
					firstName: [''],
					patronyme: [''],
					lastName: [''],
					relatedTo: ['']
				})
				break;
			}
			case 'F': {
				this.counterAgent = this.fb.group({
					familyStatus: [''],
					firstName: [''],
					patronyme: [''],
					relatedTo: [''],
					referentMale: this.fb.group({
						relationshipToAgentSexF: [''],
						geogrStatus: [''],
						socialStatus: [''],
						firstName: [''],
						patronyme: [''],
						lastName: [''],
						relatedTo: ['']
					}) 
				})
				break;
			}
		}
		this.deedForm.setControl('counterAgent', this.counterAgent);
	}


	// Co-Agents Methods (init, add and remove)

	initCoAgent() {
		
		return this.fb.group({
			coAgentSexM: this.fb.group({
				geogrStatus: [''],
				socialStatus: [''],
				firstName: [''],
				patronyme: [''],
				lastName: [''],
				relatedTo: ['']
			}),
			coAgentSexF: this.fb.group({
				familyStatus: [''],
				firstName: [''],
				patronyme: [''],
				relatedTo: [''],
				referentMale: this.fb.group({
					relationshipToAgentSexF: [''],
					geogrStatus: [''],
					socialStatus: [''],
					firstName: [''],
					patronyme: [''],
					lastName: [''],
					relatedTo: ['']
					}) 
				})
			});
	}

	addCoAgent() {
		const control = <FormArray>this.deedForm.controls['coAgents'];
		control.push(this.initCoAgent());
	}

	removeCoAgent(i: number) {
		const control = <FormArray>this.deedForm.controls['coAgents'];
		control.removeAt(i);
	}

	// Co-Counter Agents Methods (init, add and remove)

	initCoCounterAgent() {
		
		return this.fb.group({
			coCounterAgentSexM: this.fb.group({
				geogrStatus: [''],
				socialStatus: [''],
				firstName: [''],
				patronyme: [''],
				lastName: [''],
				relatedTo: ['']
			}),
			coCounterAgentSexF: this.fb.group({
				familyStatus: [''],
				firstName: [''],
				patronyme: [''],
				relatedTo: [''],
				referentMale: this.fb.group({
					relationshipToAgentSexF: [''],
					geogrStatus: [''],
					socialStatus: [''],
					firstName: [''],
					patronyme: [''],
					lastName: [''],
					relatedTo: ['']
					}) 
				})
			});
	}

	addCoCounterAgent() {
		const control = <FormArray>this.deedForm.controls['coCounterAgents'];
		control.push(this.initCoCounterAgent());
	}

	removeCoCounterAgent(i: number) {
		const control = <FormArray>this.deedForm.controls['coCounterAgents'];
		control.removeAt(i);
	}

	// Transaction Methods (init, add and remove)

	initTransaction() {
        return this.fb.group({
            transaction: [''],
			agentTransactionType: [''],
			agentTransactionObject: this.fb.group({
				money: this.fb.group({
					amount: [''],
					currency: ['']
				}),
				land: this.fb.group({
					juridicalStatus: [''],
					localisation: [''],
					surface: [''],
					population: [''],
					construction: [''],
					dependencies: ['']
				}),
				building: this.fb.group({
					destination: [''],
					localisation: [''],
					description: ['']
				}),
				soul: this.fb.group({
					juridicalStatus: [''],
					sex: [''],
					name: ['']
				}),
				movable: this.fb.group({
					definition: [''],
					description: ['']
				}),
				obligation: this.fb.group({
					nature: [''],
					subjects: [''],
					conditions: ['']
				})
			}),
			counterAgentTransactionObject: this.fb.group({
				money: this.fb.group({
					amount: [''],
					currency: ['']
				}),
				land: this.fb.group({
					juridicalStatus: [''],
					localisation: [''],
					surface: [''],
					population: [''],
					construction: [''],
					dependencies: ['']
				}),
				building: this.fb.group({
					destination: [''],
					localisation: [''],
					description: ['']
				}),
				soul: this.fb.group({
					juridicalStatus: [''],
					sex: [''],
					name: ['']
				}),
				movable: this.fb.group({
					definition: [''],
					description: ['']
				}),
				obligation: this.fb.group({
					nature: [''],
					subjects: [''],
					conditions: ['']
				})
			}),
			advancePayment: ['no'],
			contractConditions: [''],
			contractDuration: [''],
			forfeit: ['']
        });
    }

	addTransaction() {
		const control = <FormArray>this.deedForm.controls['transactions'];
		control.push(this.initTransaction());
	}

	removeTransaction(i: number) {
		const control = <FormArray>this.deedForm.controls['transactions'];
		control.removeAt(i);
	}

	getAgentTransactionType(i: number) {

		return this.deedForm.controls.transactions['controls'][i].get('agentTransactionType').value;
	}


}
