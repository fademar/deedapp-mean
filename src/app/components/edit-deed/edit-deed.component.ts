import { Component, OnInit } from '@angular/core';
import { DeedService } from '../../services/deed.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Deed, AgentM, AgentF, ReferentMale, OtherParticipant, Registrator, Fee, gender, transactionTypes, currencies } from '../../models/deed-model'


@Component({
  selector: 'app-edit-deed',
  templateUrl: './edit-deed.component.html',
  styleUrls: ['./edit-deed.component.css']
})
export class EditDeedComponent implements OnInit {
  id;
  deed;
  deedDetails;

  deedForm: FormGroup;
	agent: FormGroup;
	counterAgent: FormGroup;
	coAgent: FormGroup;
	coCounterAgent: FormGroup;
	agentTransactionObject: FormGroup;
	counterAgentTransactionObject: FormGroup;
	scribe: FormGroup;
	registrator: FormGroup;

	deedValue = '';
	agentSex = '';
	counterAgentSex = '';
	coAgentSex = '';
	coCounterAgentSex = '';
	agentTransactionType = '';
	counterAgentTransactionType = '';
  agentSet;

	gender = gender;
	transactionTypes = transactionTypes;
	currencies = currencies;
	scribeOn = this.scribeOn;
	registratorOn = this.registratorOn;

  constructor(private deedService:DeedService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) { 		this.createForm();
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.deedService.getDeed(this.id).subscribe(deed => {
        this.deed = deed;

        switch (this.deed.agentSex) {
          case 'M': {
            this.agentSet = { 
              geogrStatus: this.deed.agent.geogrStatus, 
              socialStatus: this.deed.agent.socialStatus,  
              firstName: this.deed.agent.firstName,
					    patronyme: this.deed.agent.patronyme,
					    lastName: this.deed.agent.lastName,
					    relatedTo: this.deed.agent.relatedTo
            }
            break;
          }
          case 'F': {
            this.agentSet = {
              familyStatus: this.deed.agent.familyStatus,
              firstName: this.deed.agent.firstName,
              patronyme: this.deed.agent.patronyme,
              relatedTo: this.deed.agent.lastName,
              referentMale: {
                relationshipToAgent: this.deed.agent.referenMale.relationshipToAgent,
                geogrStatus: this.deed.agent.referenMale.geogrStatus,
                socialStatus: this.deed.agent.referenMale.socialStatus,
                firstName: this.deed.agent.referenMale.firstName,
                patronyme: this.deed.agent.referenMale.patronyme,
                lastName: this.deed.agent.referenMale.lastName,
                relatedTo: this.deed.agent.referenMale.relatedTo
              }
            }
            break;
          }
        }

        this.deedForm.setValue({
          _id: this.deed._id,
          deedCode: this.deed.deedCode,
			    deedRef: this.deed.deedRef,
			    deedDate: this.deed.deedDate,
			    deedName: this.deed.deedName,
			    deedLanguage: this.deed.deedLanguage,
			    agentSex: this.deed.agentSex,
			    agent: this.agentSet,
			    coAgents: this.fb.array([]),
          counterAgentSex: [''],
          counterAgent: [''],
          coCounterAgents: this.fb.array([]),
          transactions: this.fb.array([
            this.initTransaction(),
          ]),
          whitnesses: this.fb.array([]),
          sureties: this.fb.array([]),
          otherParticipants: this.fb.array([]),
          registrationDate: [''],
          fee: this.fb.group({
            amount: [''],
            currency: [''],
            collected: ['yes']
          }),
          verbatimCitations: [''],
          researcherNotes: ['']



        });



  


    });

  }


  onEditSubmit() {
    let deed = this.deedDetails;

    this.deedService.updateDeed(this.id, deed).subscribe(deed =>{
      this.router.navigate(['/deed/'+this.id]);
    })
  }

  // Create the form

	createForm() {

		this.deedForm = this.fb.group({
      _id: [''],
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
			whitnesses: this.fb.array([]),
			sureties: this.fb.array([]),
			otherParticipants: this.fb.array([]),
			registrationDate: [''],
			fee: this.fb.group({
				amount: [''],
				currency: [''],
				collected: ['yes']
			}),
			verbatimCitations: [''],
			researcherNotes: ['']
		})

	}

  // AGENT METHODS

	getAgentSex() {
		return this.deedForm.get('agentSex').value;
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
		}
		this.deedForm.setControl('agent', this.agent);
	}

	// COUNTER AGENT METHODS

	getCounterAgentSex() {
		return this.deedForm.get('counterAgentSex').value;
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
		}
		this.deedForm.setControl('counterAgent', this.counterAgent);
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
			case 'M': {
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
			case 'F': {
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


	// Co-Counter Agents Methods (init, add and remove)

	initCoCounterAgent() {
		return this.fb.group({
				coCounterAgentSex: ['']
		});
	}

	updateCoCounterAgent(i) {
		this.coCounterAgentSex = this.deedForm.controls['coCounterAgents']['controls'][i].get('coCounterAgentSex').value;

		switch (this.coCounterAgentSex) {
			case 'M': {
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
			case 'F': {
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


	// Transaction Methods (init, add and remove)

	initTransaction() {
		return this.fb.group({
			transaction: [''],
			agentTransactionType: [''],
			agentTransactionObject: this.fb.group({}),
			counterAgentTransactionType: [''],
			counterAgentTransactionObject: this.fb.group({}),
			advancePayment: ['no'],
			contractConditions: [''],
			contractDuration: [''],
			forfeit: ['']
		});
	}


	getAgentTransactionType(i: number) {

		return this.deedForm.controls.transactions['controls'][i].get('agentTransactionType').value;
	}


	getCounterAgentTransactionType(i: number) {
		return this.deedForm.controls.transactions['controls'][i].get('counterAgentTransactionType').value;
	}


	updateAgentTransactionObject(i: number) {

		this.agentTransactionType = this.deedForm.controls.transactions['controls'][i].get('agentTransactionType').value;

		switch (this.agentTransactionType) {

			case 'money': {
				this.agentTransactionObject = this.fb.group({
					money: this.fb.group({
						amount: [''],
						currency: ['']
					})
				})
				break;
			}
			case 'land': {
				this.agentTransactionObject = this.fb.group({
					land: this.fb.group({
						juridicalStatus: [''],
						localisation: [''],
						surface: [''],
						population: [''],
						construction: [''],
						dependencies: ['']
					})
				})
				break;
			}
			case 'building': {
				this.agentTransactionObject = this.fb.group({
					building: this.fb.group({
						destination: [''],
						localisation: [''],
						description: ['']
					})
				})
				break;
			}
			case 'soul': {
				this.agentTransactionObject = this.fb.group({
					soul: this.fb.group({
						juridicalStatus: [''],
						sex: [''],
						name: ['']
					})
				})
				break;
			}
			case 'movable': {
				this.agentTransactionObject = this.fb.group({
					movable: this.fb.group({
						definition: [''],
						description: ['']
					})
				})
				break;
			}
			case 'obligation': {
				this.agentTransactionObject = this.fb.group({
					obligation: this.fb.group({
						nature: [''],
						subjects: [''],
						conditions: ['']
					})
				})
				break;
			}
		}
		this.deedForm.controls.transactions['controls'][i].setControl('agentTransactionObject', this.agentTransactionObject);

	}

	updateCounterAgentTransactionObject(i: number) {

		this.counterAgentTransactionType = this.deedForm.controls.transactions['controls'][i].get('counterAgentTransactionType').value;

		switch (this.counterAgentTransactionType) {

			case 'money': {
				this.counterAgentTransactionObject = this.fb.group({
					money: this.fb.group({
						amount: [''],
						currency: ['']
					})
				})
				break;
			}
			case 'land': {
				this.counterAgentTransactionObject = this.fb.group({
					land: this.fb.group({
						juridicalStatus: [''],
						localisation: [''],
						surface: [''],
						population: [''],
						construction: [''],
						dependencies: ['']
					})
				})
				break;
			}
			case 'building': {
				this.counterAgentTransactionObject = this.fb.group({
					building: this.fb.group({
						destination: [''],
						localisation: [''],
						description: ['']
					})
				})
				break;
			}
			case 'soul': {
				this.counterAgentTransactionObject = this.fb.group({
					soul: this.fb.group({
						juridicalStatus: [''],
						sex: [''],
						name: ['']
					})
				})
				break;
			}
			case 'movable': {
				this.counterAgentTransactionObject = this.fb.group({
					movable: this.fb.group({
						definition: [''],
						description: ['']
					})
				})
				break;
			}
			case 'obligation': {
				this.counterAgentTransactionObject = this.fb.group({
					obligation: this.fb.group({
						nature: [''],
						subjects: [''],
						conditions: ['']
					})
				})
				break;
			}
		}

		this.deedForm.controls.transactions['controls'][i].setControl('counterAgentTransactionObject', this.counterAgentTransactionObject);

	}

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
