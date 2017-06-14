import { Component, OnInit, Input } from '@angular/core';
import { DeedService } from '../../services/deed.service';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Deed, AgentM, AgentF, ReferentMale, OtherParticipant, Registrator, Fee, gender, transactionTypes, currencies, socialBody, relationtoagents, agentActionsList, agentTransactionObjectList } from '../../models/deed-model'
import { NotificationsService } from 'angular2-notifications';

@Component({
	selector: 'app-add-deed',
	templateUrl: './add-deed.component.html',
	styleUrls: ['./add-deed.component.css']
})

export class AddDeedComponent implements OnInit {

	deedForm: FormGroup;
	agent: FormGroup;
	counterAgent: FormGroup;
	coAgent: FormGroup;
	coCounterAgent: FormGroup;
	collectiveCoAgent: FormGroup;
	collectiveCoCounterAgent: FormGroup;
	agentWhat: FormArray;
	agentAsWhom: FormGroup;
	agentWhom: FormGroup;
	accusationAgainstAgent: FormControl;
	scribe: FormGroup;
	registrator: FormGroup;

	deed;
	deedValue = '';
	agentSex = '';
	socialStatus;
	relationToAgent;
	relationToCounterAgent;
	otherSocialStatus;
	otherRelationToAgent;
	otherRelationToCounterAgent;
	counterAgentSex = '';
	coAgentSex = '';
	coCounterAgentSex = '';
	agentAction;
	agentTransactionType = '';
	counterAgentTransactionType = '';
	lastDeed;
	lastDeedCode;
	lastDeedRef;

	gender = gender;
	socialBody = socialBody;
	agentActionsList = agentActionsList;
	agentTransactionObjectList = agentTransactionObjectList;
	transactionTypes = transactionTypes;
	relationtoagents = relationtoagents;
	currencies = currencies;

	collectiveCoAgentOn = this.collectiveCoAgentOn;
	collectiveCoCounterAgentOn = this.collectiveCoCounterAgentOn;
	scribeOn = this.scribeOn;
	registratorOn = this.registratorOn;
	selectedAction = this.selectedAction;

	public options = {
		position: ["top", "left"],
		timeOut: 2000,
		showProgressBar: false,
		pauseOnHover: false,
		animate: "fromLeft"
	}

	constructor(private fb: FormBuilder, private deedService: DeedService, private router: Router, private notificationsService: NotificationsService) { }

	ngOnInit() {
		this.initForm();
	}

	// Create the form

	initForm() {

		this.deedForm = this.fb.group({
			deedCode: ['', Validators.required],
			deedRef: ['', Validators.required],
			deedDate: [''],
			deedName: [''],
			deedLanguage: ['russian'],
			agentSex: [''],
			agent: this.fb.group({}),
			coAgents: this.fb.array([]),
			counterAgentSex: [''],
			counterAgent: this.fb.group({}),
			coCounterAgents: this.fb.array([]),
			transactions: this.fb.array([
				this.initTransaction(),
			]),
			whitnesses: this.fb.array([]),
			sureties: this.fb.array([]),
			otherParticipants: this.fb.array([]),
			registrationDate: [''],
			fee: this.fb.group({
				rouble: [''],
				altyn: [''],
				dynga: [''],
				chekhi: [''],
				collected: ['yes']
			}),
			verbatimCitations: [''],
			researcherNotes: [''],
			incomplete: [false]
		})

	}

	insertLastDeedCode() {
		this.deedService.getLastDeed().subscribe(result => {
			this.lastDeed = result;
			if (this.lastDeed.length < 1) {
				this.deedForm.patchValue({
					deedCode: "No deed saved yet"
				});
			}
			else {
				this.lastDeedCode = this.lastDeed[0].deedCode;
				this.deedForm.patchValue({
					deedCode: this.lastDeedCode
				});
			}
		});
	}

	insertLastDeedRef() {
		this.deedService.getLastDeed().subscribe(result => {
			this.lastDeed = result;
			if (this.lastDeed.length < 1) {
				this.deedForm.patchValue({
					deedRef: "No deed saved yet"
				});
			}
			else {
				this.lastDeedRef = this.lastDeed[0].deedRef;
				this.deedForm.patchValue({
					deedRef: this.lastDeedRef
				});
			}
		});
	}

	// Submit the form

	onSubmit() {
		this.deedValue = JSON.stringify(this.deedForm.value);
		this.deedService.saveDeed(this.deedValue).subscribe(deed => {
			this.deed = deed;
			if (this.deed._id) {
				this.notificationsService.success(
					'Success',
					'The deed has been successfully saved in the database with id ' + this.deed._id,
				);
			}
		});
		setTimeout(() => {
			this.initForm();
		}, 2000);
	}


	// AGENT METHODS

	getAgentSex() {
		return this.deedForm.get('agentSex').value;
	}

	updateAgent() {
		this.agentSex = this.deedForm.get('agentSex').value;

		switch (this.agentSex) {
			case 'male': {
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
			case 'female': {
				this.agent = this.fb.group({
					familyStatus: [''],
					firstName: [''],
					patronyme: [''],
					relatedTo: [''],
					referentMale: this.fb.group({
						relationshipToAgent: [''],
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
			case 'body-corporate': {
				this.agent = this.fb.group({
					geogrStatus: [''],
					socialStatus: [''],
					corporationName: [''],
					patronyme: [''],
					nbParticipants: [''],
					names: ['']
				})
				break;
			}
			default: {
				break;
			}
		}
		this.deedForm.setControl('agent', this.agent);
	}

	updateSocialStatusAgent() {
		this.socialStatus = this.agent.get('socialStatus').value;
		if (this.socialStatus == 'other') {
			this.otherSocialStatus = new FormControl;
			this.agent.addControl('otherSocialStatus', this.otherSocialStatus);
			return true;
		}
	}


	// COUNTER AGENT METHODS

	getCounterAgentSex() {
		return this.deedForm.get('counterAgentSex').value;
	}

	updateCounterAgent() {
		this.counterAgentSex = this.deedForm.get('counterAgentSex').value;

		switch (this.counterAgentSex) {
			case 'male': {
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
			case 'female': {
				this.counterAgent = this.fb.group({
					familyStatus: [''],
					firstName: [''],
					patronyme: [''],
					relatedTo: [''],
					referentMale: this.fb.group({
						relationshipToCounterAgent: [''],
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
			case 'body-corporate': {
				this.counterAgent = this.fb.group({
					geogrStatus: [''],
					socialStatus: [''],
					corporationName: [''],
					patronyme: [''],
					nbParticipants: [''],
					names: ['']
				})
				break;
			}
			default: {
				break
			}
		}
		this.deedForm.setControl('counterAgent', this.counterAgent);
	}

	updateSocialStatusCounterAgent() {
		this.socialStatus = this.counterAgent.get('socialStatus').value;
		if (this.socialStatus == 'other') {
			this.otherSocialStatus = new FormControl;
			this.counterAgent.addControl('otherSocialStatus', this.otherSocialStatus);
			return true;
		}
	}


	// Co-Agents Methods (init, add and remove)

	initCoAgent() {
		return this.fb.group({
			coAgentSex: ['']
		});
	}

	updateCoAgent(i) {
		this.coAgentSex = this.deedForm.controls['coAgents']['controls'][i].get('coAgentSex').value;

		switch (this.coAgentSex) {
			case 'male': {
				this.coAgent = this.fb.group({
					geogrStatus: [''],
					socialStatus: [''],
					firstName: [''],
					patronyme: [''],
					lastName: [''],
					relatedTo: ['']
				})
				break;
			}
			case 'female': {
				this.coAgent = this.fb.group({
					familyStatus: [''],
					firstName: [''],
					patronyme: [''],
					relatedTo: [''],
					referentMale: this.fb.group({
						relationshipToCoAgent: [''],
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
			case 'body-corporate': {
				this.coAgent = this.fb.group({
					geogrStatus: [''],
					socialStatus: [''],
					corporationName: [''],
					patronyme: [''],
					nbParticipants: [''],
					names: ['']
				})
				break;
			}
			default: {
				break
			}
		}
		this.deedForm.controls['coAgents']['controls'][i].setControl('coAgent', this.coAgent);
	}

	getCoAgentSex(i) {
		return this.deedForm.controls['coAgents']['controls'][i].get('coAgentSex').value;
	}

	addCoAgent() {
		const control = <FormArray>this.deedForm.controls['coAgents'];
		control.push(this.initCoAgent());
	}

	removeCoAgent(i: number) {
		const control = <FormArray>this.deedForm.controls['coAgents'];
		control.removeAt(i);
	}

	updateSocialStatusCoAgent() {
		this.socialStatus = this.coAgent.get('socialStatus').value;
		if (this.socialStatus == 'other') {
			this.otherSocialStatus = new FormControl;
			this.coAgent.addControl('otherSocialStatus', this.otherSocialStatus);
			return true;
		}
	}

	// Co-Counter Agents Methods (init, add and remove)

	initCoCounterAgent() {
		return this.fb.group({
			coCounterAgentSex: ['']
		});
	}

	updateCoCounterAgent(i) {
		this.coCounterAgentSex = this.deedForm.controls['coCounterAgents']['controls'][i].get('coCounterAgentSex').value;

		switch (this.coCounterAgentSex) {
			case 'male': {
				this.coCounterAgent = this.fb.group({
					geogrStatus: [''],
					socialStatus: [''],
					firstName: [''],
					patronyme: [''],
					lastName: [''],
					relatedTo: ['']
				})
				break;
			}
			case 'female': {
				this.coCounterAgent = this.fb.group({
					familyStatus: [''],
					firstName: [''],
					patronyme: [''],
					relatedTo: [''],
					referentMale: this.fb.group({
						relationshipToCoCounterAgent: [''],
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
			case 'body-corporate': {
				this.coCounterAgent = this.fb.group({
					geogrStatus: [''],
					socialStatus: [''],
					corporationName: [''],
					patronyme: [''],
					nbParticipants: [''],
					names: ['']
				})
				break;
			}
			default: {
				break
			}
		}
		this.deedForm.controls['coCounterAgents']['controls'][i].setControl('coCounterAgent', this.coCounterAgent);
	}

	getCoCounterAgentSex(i) {
		return this.deedForm.controls['coCounterAgents']['controls'][i].get('coCounterAgentSex').value;
	}

	addCoCounterAgent() {
		const control = <FormArray>this.deedForm.controls['coCounterAgents'];
		control.push(this.initCoCounterAgent());
	}

	removeCoCounterAgent(i: number) {
		const control = <FormArray>this.deedForm.controls['coCounterAgents'];
		control.removeAt(i);
	}

	updateSocialStatusCoCounterAgent() {
		this.socialStatus = this.coCounterAgent.get('socialStatus').value;
		if (this.socialStatus == 'other') {
			this.otherSocialStatus = new FormControl;
			this.coCounterAgent.addControl('otherSocialStatus', this.otherSocialStatus);
			return true;
		}
	}


	// Collective Co-Agent Methods

	addCollectiveCoAgent() {
		this.collectiveCoAgent = this.fb.group({
			relationToAgent: [''],
			numberOfParticipants: [''],
			statusesNames: ['']
		});

		this.deedForm.addControl('collectiveCoAgent', this.collectiveCoAgent);
		return this.collectiveCoAgentOn = true;
	}

	removeCollectiveCoAgent() {
		this.deedForm.removeControl('collectiveCoAgent');
		return this.collectiveCoAgentOn = false;
	}


	updateRelationToAgent() {
		this.relationToAgent = this.collectiveCoAgent.get('relationToAgent').value;
		if (this.relationToAgent == 'other') {
			this.otherRelationToAgent = new FormControl;
			this.collectiveCoAgent.addControl('otherRelationToAgent', this.otherRelationToAgent);
			return true;
		}
	}

	// Collective Co Counter-Agent Methods

	addCollectiveCoCounterAgent() {
		this.collectiveCoCounterAgent = this.fb.group({
			relationToCounterAgent: [''],
			numberOfParticipants: [''],
			statusesNames: ['']
		});

		this.deedForm.addControl('collectiveCoCounterAgent', this.collectiveCoCounterAgent);
		return this.collectiveCoCounterAgentOn = true;
	}

	removeCollectiveCoCounterAgent() {
		this.deedForm.removeControl('collectiveCoCounterAgent');
		return this.collectiveCoCounterAgentOn = false;
	}


	updateRelationToCounterAgent() {
		this.relationToCounterAgent = this.collectiveCoCounterAgent.get('relationToCounterAgent').value;
		if (this.relationToCounterAgent == 'other') {
			this.otherRelationToCounterAgent = new FormControl;
			this.collectiveCoCounterAgent.addControl('otherRelationToAgent', this.otherRelationToCounterAgent);
			return true;
		}
	}



	// Transaction Methods (init, add and remove)

	initTransaction() {
		return this.fb.group({
			agentAction: [''],
			agentTransactionObjects: this.fb.array([]),
			counterAgentAction: [''],
			counterAgentTransactionObject: this.fb.group({}),
			advancePayment: ['no'],
			contractConditions: [''],
			contractDuration: [''],
			forfeit: ['']
		});
	}


	updateAgentAction(i: number) {

		this.agentAction = this.deedForm.controls.transactions['controls'][i].get('agentAction').value;

		switch (this.agentAction) {

			case 'bequeaths':
			case 'cedes': 
			case 'exchanges':
			case 'mortgages': 
			case 'puts to rent': 
			case 'sells':
			case 'donates':
			case 'borrows': {
				this.selectedAction = 'what';
				break;
			}
			case 'agrees to marry-off': {
				this.selectedAction = 'whom';
				break;
			}
			case 'engages': {
				this.selectedAction = 'asWhom';
				break;
			}
			case 'settles': {
				this.selectedAction = 'accusationAgainstAgent';
				break;
			}
			default: 
				break;
		}
	}

	updateAgentTransactionObject(i: number) {
		
	} 

	// getCounterAgentTransactionType(i: number) {
	// 	return this.deedForm.controls.transactions['controls'][i].get('counterAgentTransactionType').value;
	// }


	// updateCounterAgentTransactionObject(i: number) {

	// 	this.counterAgentTransactionType = this.deedForm.controls.transactions['controls'][i].get('counterAgentTransactionType').value;
	// 	if (this.counterAgentTransactionType == '' && ('counterAgentTransactionObject' in this.deedForm.controls.transactions['controls'][i]['controls'])) {
	// 		this.deedForm.controls.transactions['controls'][i].removeControl('counterAgentTransactionObject');
	// 	}
	// 	else {
	// 		switch (this.counterAgentTransactionType) {

	// 			case 'money': {
	// 				this.counterAgentTransactionObject = this.fb.group({
	// 					money: this.fb.group({
	// 						rouble: [''],
	// 						altyn: [''],
	// 						dynga: [''],
	// 						chekhi: ['']
	// 					})
	// 				})
	// 				break;
	// 			}
	// 			case 'land': {
	// 				this.counterAgentTransactionObject = this.fb.group({
	// 					land: this.fb.group({
	// 						juridicalStatus: [''],
	// 						localisation: [''],
	// 						surface: this.fb.group({
	// 							cheti: [''],
	// 							sazheni: [''],
	// 							arshin: ['']
	// 						}),
	// 						population: [''],
	// 						construction: [''],
	// 						dependencies: ['']
	// 					})
	// 				})
	// 				break;
	// 			}
	// 			case 'building': {
	// 				this.counterAgentTransactionObject = this.fb.group({
	// 					building: this.fb.group({
	// 						destination: [''],
	// 						localisation: [''],
	// 						description: ['']
	// 					})
	// 				})
	// 				break;
	// 			}
	// 			case 'soul': {
	// 				this.counterAgentTransactionObject = this.fb.group({
	// 					soul: this.fb.group({
	// 						juridicalStatus: [''],
	// 						sex: [''],
	// 						name: ['']
	// 					})
	// 				})
	// 				break;
	// 			}
	// 			case 'movable': {
	// 				this.counterAgentTransactionObject = this.fb.group({
	// 					movable: this.fb.group({
	// 						definition: [''],
	// 						description: ['']
	// 					})
	// 				})
	// 				break;
	// 			}
	// 			case 'obligation': {
	// 				this.counterAgentTransactionObject = this.fb.group({
	// 					obligation: this.fb.group({
	// 						nature: [''],
	// 						subjects: [''],
	// 						conditions: ['']
	// 					})
	// 				})
	// 				break;
	// 			}
	// 			default: {
	// 				break
	// 			}
	// 		}

	// 		this.deedForm.controls.transactions['controls'][i].setControl('counterAgentTransactionObject', this.counterAgentTransactionObject);
	// 	}
	// }

	addTransaction() {
		const control = <FormArray>this.deedForm.controls['transactions'];
		control.push(this.initTransaction());
	}

	removeTransaction(i: number) {
		const control = <FormArray>this.deedForm.controls['transactions'];
		control.removeAt(i);
	}


	// Whitnesses Methods (init, add, remove)

	initWhitness() {

		return this.fb.group({
			whitness: this.fb.group({
				geogrStatus: [''],
				socialStatus: [''],
				firstName: [''],
				patronyme: [''],
				lastName: [''],
				relatedTo: ['']
			})
		});
	}

	addWhitness() {
		const control = <FormArray>this.deedForm.controls['whitnesses'];
		control.push(this.initWhitness());
	}

	removeWhitness(i: number) {
		const control = <FormArray>this.deedForm.controls['whitnesses'];
		control.removeAt(i);
	}


	// Sureties Methods (init, add, remove)

	initSurety() {

		return this.fb.group({
			surety: this.fb.group({
				geogrStatus: [''],
				socialStatus: [''],
				firstName: [''],
				patronyme: [''],
				lastName: [''],
				relatedTo: ['']
			})
		});
	}

	addSurety() {
		const control = <FormArray>this.deedForm.controls['sureties'];
		control.push(this.initSurety());
	}

	removeSurety(i: number) {
		const control = <FormArray>this.deedForm.controls['sureties'];
		control.removeAt(i);
	}

	// Scribe Methods (add, remove)


	addScribe() {

		this.scribe = this.fb.group({
			geogrStatus: [''],
			socialStatus: [''],
			firstName: [''],
			patronyme: [''],
			lastName: [''],
			relatedTo: ['']
		});

		this.deedForm.addControl('scribe', this.scribe);
		return this.scribeOn = true;
	}

	removeScribe() {
		this.deedForm.removeControl('scribe');
		return this.scribeOn = false;
	}


	// Other Participants Methods (init, add, remove)

	initOtherParticipant() {

		return this.fb.group({
			otherParticipant: this.fb.group({
				role: [''],
				geogrStatus: [''],
				socialStatus: [''],
				firstName: [''],
				patronyme: [''],
				lastName: [''],
				relatedTo: ['']
			})
		});
	}

	addOtherParticipant() {
		const control = <FormArray>this.deedForm.controls['otherParticipants'];
		control.push(this.initOtherParticipant());
	}

	removeOtherParticipant(i: number) {
		const control = <FormArray>this.deedForm.controls['otherParticipants'];
		control.removeAt(i);
	}

	// Registrator Methods (add, remove)


	addRegistrator() {

		this.registrator = this.fb.group({
			firstName: [''],
			patronyme: [''],
			lastName: [''],
			relatedTo: ['']
		});

		this.deedForm.addControl('registrator', this.registrator);
		return this.registratorOn = true;
	}

	removeRegistrator() {
		this.deedForm.removeControl('registrator');
		return this.registratorOn = false;
	}





}
