import { Component, OnInit, OnChanges } from '@angular/core';
import { DeedService } from '../../services/deed.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Deed, AgentM, AgentF, ReferentMale, OtherParticipant, Registrator, Fee,
gender, transactionTypes, currencies } from '../../models/deed-model'


@Component({
    selector: 'app-edit-deed',
    templateUrl: './edit-deed.component.html',
    styleUrls: ['./edit-deed.component.css']
})
export class EditDeedComponent implements OnInit {
    id;
    deed;

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

    gender = gender;
    transactionTypes = transactionTypes;
    currencies = currencies;
    scribeOn = this.scribeOn;
    registratorOn = this.registratorOn;

    constructor(private fb: FormBuilder, private deedService: DeedService,
    private router: Router, private route: ActivatedRoute) {
        this.initForm(); 
    }



    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.deedService.getDeed(this.id).subscribe(deed => {

            // Getting deed values from db
            this.deed = deed;

            // Populating first FormControlNames with values
            this.deedForm.patchValue({
                _id: this.id,
                deedCode: this.deed.deedCode,
                deedRef: this.deed.deedRef,
                deedDate: this.deed.deedDate,
                deedName: this.deed.deedName,
                deedLanguage: this.deed.deedLanguage,
                registrationDate: this.deed.registrationDate,
                fee: this.deed.fee,
                verbatimCitations: this.deed.verbatimCitations,
                researcherNotes: this.deed.researcherNotes,
                incomplete: this.deed.incomplete
            });

            // Populate Agent depending on AgentSex
            switch (this.deed.agentSex) {
                case 'male': {
                    this.agent = this.fb.group({
                        geogrStatus: [''],
                        socialStatus: [''],
                        firstName: [''],
                        patronyme: [''],
                        lastName: [''],
                        relatedTo: ['']
                    });
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
                    });
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
                    });
                    break;
                }
            }

            this.deedForm.setControl('agent', this.agent);
            this.deedForm.patchValue({
                agentSex: this.deed.agentSex,
                agent: this.deed.agent
            });

            // Populate Counter Agent depending on CounterAgentSex
            switch (this.deed.counterAgentSex) {
                case 'male': {
                    this.counterAgent = this.fb.group({
                        geogrStatus: [''],
                        socialStatus: [''],
                        firstName: [''],
                        patronyme: [''],
                        lastName: [''],
                        relatedTo: ['']
                    });
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
                    });
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
                    });
                    break;
                }
            }
            this.deedForm.setControl('counterAgent', this.counterAgent);
            this.deedForm.patchValue({
                counterAgentSex: this.deed.counterAgentSex,
                counterAgent: this.deed.counterAgent
            });


            // Populating coAgents
            if (this.deed.coAgents.length > 0) {

                for (let i = 0; i < this.deed.coAgents.length; i++) {
                    const element = this.deed.coAgents[i];
                    const control = <FormArray>this.deedForm.controls['coAgents'];
                    control.push(this.initCoAgent());
                    this.deedForm.controls['coAgents']['controls'][i].patchValue({
                        coAgentSex: element.coAgentSex
                    })

                    switch (element.coAgentSex) {
                        case 'male': {
                            this.coAgent = this.fb.group({
                                geogrStatus: [''],
                                socialStatus: [''],
                                firstName: [''],
                                patronyme: [''],
                                lastName: [''],
                                relatedTo: ['']
                            });
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
                            });
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
                            });
                            break;
                        }
                    } // end switch

                    this.deedForm.controls['coAgents']['controls'][i].setControl('coAgent', this.coAgent);
                    this.deedForm.controls['coAgents']['controls'][i].patchValue({
                        coAgent: element.coAgent
                    });

                } // endfor
            } // endif coagents

            // Populating coCounterAgents
            if (this.deed.coCounterAgents.length > 0) {
                for (let i = 0; i < this.deed.coCounterAgents.length; i++) {
                    const element = this.deed.coCounterAgents[i];
                    const control = <FormArray>this.deedForm.controls['coCounterAgents'];
                    control.push(this.initCoCounterAgent());
                    this.deedForm.controls['coCounterAgents']['controls'][i].patchValue({
                        coCounterAgentSex: element.coCounterAgentSex
                    });

                    switch (element.coCounterAgentSex) {
                        case 'male': {
                            this.coCounterAgent = this.fb.group({
                                geogrStatus: [''],
                                socialStatus: [''],
                                firstName: [''],
                                patronyme: [''],
                                lastName: [''],
                                relatedTo: ['']
                            });
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
                            });
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
                            });
                            break;
                        }
                    } // end switch

                    this.deedForm.controls['coCounterAgents']['controls'][i].setControl('coCounterAgent', this.coCounterAgent);
                    this.deedForm.controls['coCounterAgents']['controls'][i].patchValue({
                        coCounterAgent: element.coCounterAgent
                    });

                } // endfor
            } // endif coCounteragents

            // Populating Transactions
            if (this.deed.transactions.length > 0) {
                for (let i = 0; i < this.deed.transactions.length; i++) {

                    const transaction = this.deed.transactions[i];
                    const control = <FormArray>this.deedForm.controls['transactions'];
                    control.push(this.initTransaction());

                    this.deedForm.controls['transactions']['controls'][i].patchValue({
                        agentAction: transaction.agentAction,
                        counterAgentAction: transaction.counterAgentTransactionType,
                        advancePayment: element.advancePayment,
                        contractConditions: element.contractConditions,
                        contractDuration: element.contractDuration,
                        forfeit: element.forfeit
                    })

                    if (transaction.agentAction !== '') {
                        switch (element.agentTransactionType) {

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
                    } else {
                        this.agentTransactionObject = this.fb.group({});
                    }

                    this.deedForm.controls.transactions['controls'][i].setControl('agentTransactionObject', this.agentTransactionObject);
                    this.deedForm.controls.transactions['controls'][i].patchValue({
                        agentTransactionObject: element.agentTransactionObject
                    });


                    if (element.counterAgentTransactionType !== '') {
                        switch (element.counterAgentTransactionType) {
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
                    }
                    else {
                        this.counterAgentTransactionObject = this.fb.group({});
                    }

                    this.deedForm.controls.transactions['controls'][i].setControl('counterAgentTransactionObject', this.counterAgentTransactionObject);

                    this.deedForm.controls.transactions['controls'][i].patchValue({
                        counterAgentTransactionObject: element.counterAgentTransactionObject
                    });
                } //endfor
            } // endif


            // Populating Whitnesses
            if (this.deed.whitnesses.length > 0) {
                for (var i = 0; i < this.deed.whitnesses.length; i++) {
                    var element = this.deed.whitnesses[i];
                    const control = <FormArray>this.deedForm.controls['whitnesses'];
                    control.push(this.initWhitness());
                    this.deedForm.controls['whitnesses']['controls'][i].patchValue({
                        whitness: element.whitness
                    })
                }
            }

            // Populating Sureties
            if (this.deed.sureties.length > 0) {
                for (var i = 0; i < this.deed.sureties.length; i++) {
                    var element = this.deed.sureties[i];
                    const control = <FormArray>this.deedForm.controls['sureties'];
                    control.push(this.initSurety());
                    this.deedForm.controls['sureties']['controls'][i].patchValue({
                        surety: element.surety
                    })
                }
            }

            // Populating Scribe
            if (this.deed.scribe) {
                this.addScribe();
                this.deedForm.patchValue({
                    scribe: this.deed.scribe
                })
            }

            // Populating Other Participants
            if (this.deed.otherParticipants.length > 0) {
                for (var i = 0; i < this.deed.otherParticipants.length; i++) {
                    var element = this.deed.otherParticipants[i];
                    const control = <FormArray>this.deedForm.controls['otherParticipants'];
                    control.push(this.initOtherParticipant());
                    this.deedForm.controls['otherParticipants']['controls'][i].patchValue({
                        otherParticipant: element.otherParticipant
                    })
                }
            }

            // Populating Registrator
            if (this.deed.registrator) {
                this.addRegistrator();
                this.deedForm.patchValue({
                    registrator: this.deed.registrator
                })
            }



        }); // end Subscribe
} // end NgOnInit

// Create the form
initForm() {

    this.deedForm = this.fb.group({
        _id: [{ value: '', disabled: true }],
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
        transactions: this.fb.array([]),
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






// Submit the form
onSubmit() {
    this.deedValue = JSON.stringify(this.deedForm.value);
    this.deedService.updateDeed(this.id, this.deedValue).subscribe(deed => {
        this.router.navigate(['/']);
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
        default: {
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
                    rouble: [''],
                    altyn: [''],
                    dynga: [''],
                    chekhi: ['']
                })
            })
            break;
        }
        case 'land': {
            this.agentTransactionObject = this.fb.group({
                land: this.fb.group({
                    juridicalStatus: [''],
                    localisation: [''],
                    surface: this.fb.group({
                        cheti: [''],
                        sazheni: [''],
                        arshin: ['']
                    }),
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
                    rouble: [''],
                    altyn: [''],
                    dynga: [''],
                    chekhi: ['']
                })
            })
            break;
        }
        case 'land': {
            this.counterAgentTransactionObject = this.fb.group({
                land: this.fb.group({
                    juridicalStatus: [''],
                    localisation: [''],
                    surface: this.fb.group({
                        cheti: [''],
                        sazheni: [''],
                        arshin: ['']
                    }),
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
