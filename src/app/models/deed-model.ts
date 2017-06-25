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

export const gender = ['', 'male', 'female', 'body-corporate'];

export const socialBody = ['', 'monks', 'nuns', 'parishioners', 'townsfolk', 'country folk', 'regiment', 'other']

export const transactionTypes = ['', 'money', 'land', 'building', 'soul', 'movable', 'obligation'];

export const currencies = ['rouble', 'altyn', 'denga'];

export const relationtoagents = ['', 'parents', 'corporation members', 'companions', 'other'];

export const agentActionsList = ['', 'agrees to divorce', 'agrees to marry', 'agrees to marry-off', 'bequeaths', 'borrows', 'cedes', 'donates', 'elects', 'engages', 'exchanges', 'manumits', 'mortgages', 'promises', 'puts to rent', 'sells', 'settles', 'signs receipt', 'other'];

export const whatList = ['chattels', 'debt', 'dependent', 'forfeit', 'fugitive souls', 'goods', 'immovable property', 'money', 'parent', 'responsibilities', 'share from estate', 'souls', 'other'];

export const immovablePropertyList = ['', 'поместье', 'вотчина', 'двор городской', 'двор сельский', 'лавочное место', 'огородное место', 'мельница', 'винница', 'пасека', 'лес', 'сенные покосы', 'other'];

export const shareList = ['', '1/2', '1/3', '1/4', 'other'];

export const whomList = ['','parent', 'dependent'];

export const asWhomList = ['', 'as hired worker', 'in household', 'as son-in-law', 'as bondman', 'as peasant', 'as contractor', 'as tax-farmer', 'other'];

export const activityList = ['', 'транспорт', 'строительство', 'поставка вина', 'поставка хлеба', 'other'];

export const typeTaxList = ['', 'мельница', 'рыбная ловля', 'конская площадка', 'мост и перевоз', 'other'];

export const counterAgentActionsList = ['', 'agrees to marry', 'agrees to marry-off', 'cedes', 'exchanges', 'lends', 'pays', 'settles'];
