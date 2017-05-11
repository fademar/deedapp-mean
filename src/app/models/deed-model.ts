export class Deed {
	deedCode: '';
	deedRef: '';
	deedDate: ''; 
	deedName: '';
	deedLanguage: '';
	agentSex: '';
	agentSexM: AgentM[];
	agentSexF: AgentF[];
	coAgentSexM: AgentM[];
	coAgentSexF: AgentF[];
	counterAgentSexM: AgentM[];
	counterAgentSexF: AgentF[];
	coCounterAgentSexM: AgentM[];
	coCounterAgentSexF: AgentF[];
	transaction: '';
	agentTransactionObject: '';
	counterAgentTransactionObject: '';
	advancePayment: '';
	contractConditions: '';
	contractDuration: '';
	forfeit: '';
	whitness: AgentM[];
	surety: AgentM[];
	scribe: AgentM[];
	otherParticipant: OtherParticipant[]; 
	registrationDate: '';
	registrator: Registrator[];
	fee: Fee[];
	verbatimCitations: '';
	researcherNotes: ''
}

export class AgentM {
	geogrStatus: '';
	socialStatus: '';
	firstName: '';
	patronyme: '';
	lastName: '';
	relatedTo: ''
}

export class AgentF {
	familyStatus: '';
	firstName: '';
	patronyme: '';
	relatedTo: '';
	referentMale: ReferentMale[]
}

export class ReferentMale {
	relationshipToAgentSexF: '';
	geogrStatus: '';
	socialStatus: '';
	firstName: '';
	patronyme: '';
	lastName: '';
	relatedTo: ''
}

export class OtherParticipant {
	role: '';
	geogrStatus: '';
	socialStatus: '';
	firstName: '';
	patronyme: '';
	lastName: '';
	relatedTo: ''
}

export class Registrator {
	firstName: '';
	patronyme: '';
	lastName: '';
	relatedTo: ''
}	

export class Fee {
	amount: '';
	collected: ''
}

export const gender = ['', 'M', 'F'];

export const transactionTypes = ['money', 'land', 'building', 'soul', 'movable', 'obligation'];

export const currencies = ['rouble', 'altyn', 'denga'];