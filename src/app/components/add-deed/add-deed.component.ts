import { Component, OnInit } from '@angular/core';
import { DeedService } from '../../services/deed.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Deed, AgentM, AgentF, ReferentMale, OtherParticipant, Registrator, Fee, gender } from '../../models/deed-model'

@Component({
	selector: 'app-add-deed',
	templateUrl: './add-deed.component.html',
	styleUrls: ['./add-deed.component.css']
})
export class AddDeedComponent implements OnInit {

	deedForm: FormGroup;
	gender = gender;
	deedValue = '';

	constructor(private fb: FormBuilder, private deedService: DeedService, private router: Router) {}

	ngOnInit() {

		this.createForm();

	}

	createForm() {

		this.deedForm = this.fb.group({
			deedCode: ['', Validators.required],
			deedRef: ['', Validators.required],
			deedDate: [''], 
			deedName: [''],
			deedLanguage: ['russian'],
			agentSex: [''], 
			agentSexM: this.fb.group({
				geogrStatus: [''],
				socialStatus: [''],
				firstName: [''],
				patronyme: [''],
				lastName: [''],
				relatedTo: ['']
			}),
			agentSexF: this.fb.group({
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
			}),
			// coAgentSexM: this.fb.group(new AgentM()),
			// coAgentSexF: this.fb.group(new AgentF()),
			// counterAgentSexM: this.fb.group(new AgentM),
			// counterAgentSexF: this.fb.group(new AgentF),
			// coCounterAgentSexM: this.fb.group(new AgentM),
			// coCounterAgentSexF: this.fb.group(new AgentF),
			transaction: [''],
			agentTransactionObject: [''],
			counterAgentTransactionObject: [''],
			advancePayment: [false],
			contractConditions: [''],
			contractDuration: [''],
			forfeit: [''],
			// whitness: this.fb.group(new AgentM),
			// surety: this.fb.group(new AgentM),
			// scribe: this.fb.group(new AgentM),
			otherParticipant: this.fb.group(new OtherParticipant),
			registrationDate: [''],
			registrator: this.fb.group(new Registrator),
			fee: this.fb.group(new Fee),
			verbatimCitations: [''],
			researcherNotes: ['']
		})
	}

	onSubmit() {
		this.deedValue = JSON.stringify(this.deedForm.value);
		this.deedService.saveDeed(this.deedValue).subscribe(deed => {
			this.router.navigate(['/']);
		})
	}

	getAgentSex() {
		return this.deedForm.get('agentSex').value;
	}

}

