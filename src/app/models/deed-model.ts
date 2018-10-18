
export class Male {
	geogrStatus: '';
	socialStatus: '';
	firstName: '';
	patronyme: '';
	lastName: '';
	relatedTo: '';
}

export class Female {
	familyStatus: '';
	firstName: '';
	patronyme: '';
	relatedTo: '';
	referentMale: {
		relationshipToAgentSexF: '';
		geogrStatus: '';
		socialStatus: '';
		firstName: '';
		patronyme: '';
		lastName: '';
		relatedTo: '';
	}
}

export class BodyCorporate {
	geogrStatus: '';
	socialStatus: '';
	corporationName: '';
	nbParticipants: '';
	names: '';
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

export class FirstNameObject {
	sex: string = '';
	firstname: string = '';
	deedId: string = '';
	constructor(sex: string, firstname: string, deedId: string) {
		this.sex = sex;
		this.firstname = firstname;
		this.deedId = deedId;
	}
	getSex() {
		return this.sex;
	}
	getFirstname() {
		return this.firstname;
	}
	getId() {
		return this.deedId;
	}
}

export const gender = ['', 'male', 'female', 'body-corporate'];

export const socialBody = ['', 'monks', 'nuns', 'parishioners', 'townsfolk', 'country folk', 'regiment', 'other']

export const transactionTypes = ['', 'money', 'land', 'building', 'soul', 'movable', 'obligation'];

export const currencies = ['', 'rouble', 'altyn', 'denga'];

export const relationtoagents = ['', 'parents', 'corporation members', 'companions', 'other'];

export const agentActionsList = ['', 'agrees to divorce', 'agrees to marry', 'agrees to marry-off', 'bequeaths', 'borrows', 'cedes', 'donates', 'elects', 'engages', 'exchanges', 'manumits', 'mortgages', 'promises', 'puts to rent', 'sells', 'settles', 'signs receipt'];

export const whatList = ['', 'chattels', 'debt', 'dependent', 'forfeit', 'fugitive souls', 'goods', 'immovable property', 'money', 'parent', 'responsibilities', 'share from estate', 'souls'];

export const immovablePropertyList = ['', 'поместье', 'вотчина', 'двор городской', 'двор сельский', 'лавочное место', 'огородное место', 'мельница', 'винница', 'пасека', 'лес', 'сенные покосы'];

export const shareList = ['', '1/2', '1/3', '1/4', 'other'];

export const whomList = ['', 'parent', 'dependent'];

export const asWhomList = ['', 'as hired worker', 'in household', 'as son-in-law', 'as bondman', 'as peasant', 'as contractor', 'as tax-farmer', 'other'];

export const activityList = ['', 'транспорт', 'строительство', 'поставка вина', 'поставка хлеба', 'other'];

export const typeTaxList = ['', 'мельница', 'рыбная ловля', 'конская площадка', 'мост и перевоз', 'other'];

export const counterAgentActionsList = ['', 'agrees to marry', 'agrees to marry-off', 'cedes', 'exchanges', 'lends', 'pays', 'settles'];

export const alphabet = ["#", "А", "Б", "В", "Г", "Д", "Е", "Ё", "Ж", "З", "И", "Й", "К", "Л", "М", "Н", "О", "П", "Р", "С", "Т", "У", "Ф", "Х", "Ц", "Ч", "Ш", "Щ", "Ъ", "Ы", "Ь", "Э", "Ю", "Я"];