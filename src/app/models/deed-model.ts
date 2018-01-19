
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

export const gender = ['', 'male', 'female', 'body-corporate'];

export const socialBody = ['', 'monks', 'nuns', 'parishioners', 'townsfolk', 'country folk', 'regiment', 'other']

export const transactionTypes = ['', 'money', 'land', 'building', 'soul', 'movable', 'obligation'];

export const currencies = ['', 'rouble', 'altyn', 'denga'];

export const relationtoagents = ['', 'parents', 'corporation members', 'companions', 'other'];

export const agentActionsList = ['', 'agrees to divide property', 'agrees to divorce', 'agrees to marry', 'agrees to marry-off', 'bequeaths', 'borrows', 'cedes', 'donates', 'elects', 'engages', 'exchanges', 'manumits', 'mortgages', 'promises', 'puts to rent', 'sells', 'settles', 'signs receipt'];

export const whatList = ['', 'chattels', 'debt', 'dependent', 'forfeit', 'fugitive souls', 'goods', 'immovable property', 'money', 'parent', 'responsibilities', 'share from estate', 'souls'];

export const whatListM = ['', 'money', 'chattels', 'debt', 'dependent', 'forfeit', 'fugitive souls', 'goods', 'immovable property', 'parent', 'responsibilities', 'share from estate', 'souls'];

export const immovablePropertyList = ['', 'поместье', 'вотчина', 'двор городской', 'двор сельский', 'лавочное место', 'огородное место', 'мельница', 'винница', 'пасека', 'лес', 'сенные покосы', 'деревня', 'починок', 'жилое помещение', 'займище', 'участок земли'];

export const shareList = ['', '1/2', '1/3', '1/4', 'other'];

export const whomList = ['', 'parent', 'dependent'];

export const asWhomList = ['', 'as hired worker', 'in household', 'as son-in-law', 'as bondman', 'as peasant', 'as contractor', 'as tax-farmer', 'as teacher', 'other'];

export const activityList = ['', 'транспорт', 'строительство', 'поставка вина', 'поставка хлеба', 'поставка разных товаров', 'поставка сала', 'изготовление/поставка ремесленных изделий', 'other'];

export const typeTaxList = ['', 'мельница', 'рыбная ловля', 'конская площадка', 'мост и перевоз', 'other'];

export const counterAgentActionsList = ['', 'agrees to divide property', 'agrees to marry', 'agrees to marry-off', 'cedes', 'exchanges', 'lends', 'pays', 'settles'];
