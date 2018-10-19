import { Injectable } from '@angular/core';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, PartialObserver } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { tap, map, filter, scan } from 'rxjs/operators';
import { DeedService } from './deed.service';
import * as _ from 'lodash';
import { FirstNameObject } from '../models/deed-model';


@Injectable({
    providedIn: 'root'
})
export class FirstnamesService {

    constructor(private deedService: DeedService) { }


    createFirstNamesArray(deeds) {
        const firstNames: FirstNameObject[] = [];
        const inDeeds = {'id':0,'fields':[]};

        deeds.forEach(deed => {
            inDeeds.id = deed._id;
            if ((deed.agentSex === 'male' || deed.agentSex === 'female') && deed.agent.firstName !== '') {
                inDeeds.fields.push('deed.agent.firstName');
                firstNames.push(new FirstNameObject(deed.agentSex, _.trim(deed.agent.firstName), inDeeds));
            }
            if ((deed.counterAgentSex === 'male' || deed.counterAgentSex === 'female') && deed.counterAgent.firstName !== '') {
                inDeeds.fields.push('deed.counterAgent.firstName');
                firstNames.push(new FirstNameObject(deed.counterAgentSex, _.trim(deed.counterAgent.firstName), inDeeds));
            }
            if (deed.agentSex === 'female' && deed.agent.referentMale.firstName !== '') {
                inDeeds.fields.push('deed.agent.referentMale.firstName');
                firstNames.push(new FirstNameObject('male', _.trim(deed.agent.referentMale.firstName), inDeeds));
            }
            if (deed.counterAgentSex === 'female' && deed.counterAgent.referentMale.firstName !== '') {
                inDeeds.fields.push('deed.counterAgent.referentMale.firstName');
                firstNames.push(new FirstNameObject('male', _.trim(deed.counterAgent.referentMale.firstName), inDeeds));
            }
            if (deed.coAgents.length > 0) {
                deed.coAgents.forEach(coAgent => {
                    if ((coAgent.coAgentSex === 'male' || coAgent.coAgentSex === 'female') && coAgent.coAgent.firstName !== '') {
                        inDeeds.fields.push('coAgent.coAgent.firstName');
                        firstNames.push(new FirstNameObject(coAgent.coAgentSex, _.trim(coAgent.coAgent.firstName), inDeeds));
                    }
                    if (coAgent.coAgentSex === 'female' && coAgent.coAgent.referentMale.firstName !== '') {
                        inDeeds.fields.push('coAgent.coAgent.referentMale.firstName');
                        firstNames.push(new FirstNameObject('male', _.trim(coAgent.coAgent.referentMale.firstName), inDeeds));
                    }
                });
            }
            if (deed.coCounterAgents.length > 0) {
                deed.coCounterAgents.forEach(coCounterAgent => {
                    if ((coCounterAgent.coCounterAgentSex === 'male' || coCounterAgent.coCounterAgentSex === 'female') && coCounterAgent.coCounterAgent.firstName !== '') {
                        inDeeds.fields.push('coCounterAgent.coCounterAgent.firstName');
                        firstNames.push(new FirstNameObject(coCounterAgent.coCounterAgentSex, _.trim(coCounterAgent.coCounterAgent.firstName), inDeeds));
                    }
                    if (coCounterAgent.coCounterAgentSex === 'female' && coCounterAgent.coCounterAgent.referentMale.firstName !== '') {
                        inDeeds.fields.push('coCounterAgent.coCounterAgent.referentMale.firstName');
                        firstNames.push(new FirstNameObject('male', _.trim(coCounterAgent.coCounterAgent.referentMale.firstName), inDeeds));
                    }
                });
            }

            if (deed.transactions.length > 0) {
                deed.transactions.forEach(transaction => {
                    if (transaction.agentTransactionObjects.length > 0) {
                        transaction.agentTransactionObjects.forEach(agentTransactionObject => {
                            if (agentTransactionObject.dependent && agentTransactionObject.dependent.firstName !== '') {
                                inDeeds.fields.push('agentTransactionObject.dependent.firstName');
                                firstNames.push(new FirstNameObject('male', _.trim(agentTransactionObject.dependent.firstName), inDeeds));
                            }
                        });
                    }
                    if (transaction.counterAgentTransactionObjects.length > 0) {
                        transaction.counterAgentTransactionObjects.forEach(counterAgentTransactionObject => {
                            if (counterAgentTransactionObject.dependent && counterAgentTransactionObject.dependent.firstName !== '') {
                                inDeeds.fields.push('counterAgentTransactionObject.dependent.firstName');
                                firstNames.push(new FirstNameObject('male', _.trim(counterAgentTransactionObject.dependent.firstName), inDeeds));
                            }
                        });
                    }
                }); // END FOREACH TRANSACTION
            } // END IF TRANSACTION

            if (deed.scribe && deed.scribe.firstName !== '') {
                inDeeds.fields.push('deed.scribe.firstName');
                firstNames.push(new FirstNameObject('undefined', _.trim(deed.scribe.firstName), inDeeds));
            }

            if (deed.whitnesses.length > 0) {
                deed.whitnesses.forEach(whitness => {
                    if (whitness.firstName !== '') {
                        inDeeds.fields.push('whitness.whitness.firstName');
                        firstNames.push(new FirstNameObject('undefined', _.trim(whitness.whitness.firstName), inDeeds));
                    }
                });

            }

            if (deed.sureties.length > 0) {
                deed.sureties.forEach(surety => {
                    if (surety.firstName !== '') {
                        inDeeds.fields.push('surety.surety.firstName');
                        firstNames.push(new FirstNameObject('undefined', _.trim(surety.surety.firstName), inDeeds));
                    }
                });

            }

            if (deed.otherParticipants.length > 0) {
                deed.otherParticipants.forEach(otherParticipant => {
                    if (otherParticipant.firstName !== '') {
                        inDeeds.fields.push('otherParticipant.otherParticipant.firstName');
                        firstNames.push(new FirstNameObject('undefined', _.trim(otherParticipant.otherParticipant.firstName), inDeeds));
                    }
                });

            }

            if (deed.registrator && deed.registrator.firstName !== '') {
                inDeeds.fields.push('deed.registrator.firstName');
                firstNames.push(new FirstNameObject('undefined', _.trim(deed.registrator.firstName), inDeeds));
            }

        }); //END FOREACH
        return firstNames;

    }


    getFirstNames(): Observable<any> {

        return this.deedService.getDeeds().pipe(
            map((data) => this.createFirstNamesArray(data))
        )

    }

    


    //   getFirstNamesM(): Observable<any> {
    //     const firstNamesMale = [];

    //     this.deedService.getDeeds().map(deeds => {
    //         deeds.forEach(deed => {
    //             if (deed.agentSex === 'male' && deed.agent.firstName) {
    //                 firstNamesMale.push(_.trim(deed.agent.firstName));

    //             }
    //             if (deed.agentSex === 'female' && deed.agent.referentMale.firstName) {
    //                 firstNamesMale.push(_.trim(deed.agent.referentMale.firstName));
    //             }
    //             if (deed.counterAgentSex === 'male' && deed.counterAgent.firstName) {
    //                 firstNamesMale.push(_.trim(deed.counterAgent.firstName));
    //             }
    //             if (deed.counterAgentSex === 'female' && deed.counterAgent.referentMale.firstName) {
    //                 firstNamesMale.push(_.trim(deed.counterAgent.referentMale.firstName));
    //             }
    //             if (deed.coAgents.length > 0) {
    //                 deed.coAgents.forEach(element => {
    //                     if (element.coAgentSex === 'male' && element.coAgent.firstName) {
    //                         firstNamesMale.push(_.trim(element.coAgent.firstName));
    //                     }
    //                     if (element.coAgentSex === 'female' && element.coAgent.referentMale.firstName) {
    //                         firstNamesMale.push(_.trim(element.coAgent.referentMale.firstName));
    //                     }
    //                 });
    //             }
    //             if (deed.coCounterAgents.length > 0) {
    //                 deed.coCounterAgents.forEach(element => {
    //                     if (element.coCounterAgentSex === 'male' && element.coCounterAgent.firstName) {
    //                         firstNamesMale.push(_.trim(element.coCounterAgent.firstName));
    //                     }
    //                     if (element.coCounterAgentSex === 'female' && element.coCounterAgent.referentMale.firstName) {
    //                         firstNamesMale.push(_.trim(element.coCounterAgent.referentMale.firstName));
    //                     }
    //                 });
    //             }
    //         }); //END FOREACH

    //         firstNamesMale.sort(new Intl.Collator('ru').compare);
    //         console.log(firstNamesMale);
    //     });
    //     console.log(_.sortedUniq(firstNamesMale));
    //     return ;
    // }

    // getFirstNamesF(): Observable<any> {
    //     const firstNamesFemale = [];

    //     this.deedService.getDeeds().subscribe(deeds => {
    //         deeds.forEach(deed => {
    //             if (deed.agentSex === 'female' && deed.agent.firstName) {
    //                 firstNamesFemale.push(_.trim(deed.agent.firstName));
    //             }
    //             if (deed.counterAgentSex === 'female' && deed.counterAgent.firstName) {
    //                 firstNamesFemale.push(_.trim(deed.counterAgent.firstName));
    //             }
    //             if (deed.coAgents.length > 0) {
    //                 deed.coAgents.forEach(coAgent => {
    //                     if (coAgent.coAgentSex === 'female' && coAgent.firstName) {
    //                         firstNamesFemale.push(_.trim(coAgent.firstName));
    //                     }
    //                 });
    //             }
    //             if (deed.coCounterAgents.length > 0) {
    //                 deed.coCounterAgents.forEach(coCounterAgent => {
    //                     if (coCounterAgent.coCounterAgentSex === 'female' && coCounterAgent.firstName) {
    //                         firstNamesFemale.push(_.trim(coCounterAgent.firstName));
    //                     }
    //                 });
    //             }
    //         });
    //         firstNamesFemale.sort(new Intl.Collator('ru').compare);
    //     });
    //     return  Observable.of(_.sortedUniq(firstNamesFemale));
    // }

    // getFirstNamesAll() {
    //     this.deedService.getDeeds().subscribe(deeds => {
    //         deeds.forEach(deed => {



    //         }); // END FOREACH DEEDS

    //         this.firstNamesAllRaw = _.concat(this.firstNamesAll, this.firstNamesMale, this.firstNamesFemale);
    //         this.firstNamesAllRaw.sort(new Intl.Collator('ru').compare);
    //         this.firstNamesAllSorted = _.sortedUniq(this.firstNamesAllRaw);


    //     }); // END SUBSCRIBE

    // }





}
