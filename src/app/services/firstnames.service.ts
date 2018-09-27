import { Injectable } from '@angular/core';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, PartialObserver } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { tap, map, filter, scan } from 'rxjs/operators';
import { DeedService } from './deed.service';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class FirstnamesService {

    constructor(private deedService: DeedService, private observable: Observable<any>) { }



    createFirstNamesArray(obj, lookup) {
        let values = [];
        for (obj.keys in obj) {
          if (obj.keys == lookup) {
            values.push(_.trim(obj[obj.keys]));
          } else if (obj[obj.keys] instanceof Object) {
            this.createFirstNamesArray(obj[obj.jeys], lookup);
          }
        }
        return _.sortedUniq(values);
    }


    getFirstNames(): Observable<any> {
        
        return  this.deedService.getDeeds().pipe(
                    tap((data) => console.log('entering the service' + data)),
                    map((data: Object) => _.size(data)),
                    tap((data) => console.log('after service' + data))
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
//             if (deed.transactions.length > 0) {
//                 deed.transactions.forEach(transaction => {
//                     if (transaction.agentTransactionObjects.length > 0) {
//                         transaction.agentTransactionObjects.forEach(agentTransactionObject => {
//                             if (agentTransactionObject.dependent && agentTransactionObject.dependent.firstName !== '') {
//                                 this.firstNamesAll.push(_.trim(agentTransactionObject.dependent.firstName));
//                             }
//                         });
//                     }
//                     if (transaction.counterAgentTransactionObjects.length > 0) {
//                         transaction.counterAgentTransactionObjects.forEach(counterAgentTransactionObject => {
//                             if (counterAgentTransactionObject.dependent && counterAgentTransactionObject.dependent.firstName !== '') {
//                                 this.firstNamesAll.push(_.trim(counterAgentTransactionObject.dependent.firstName));
//                             }
//                         });
//                     }
//                 }); // END FOREACH TRANSACTION
//             }

//             if (deed.scribe && deed.scribe.firstName) {
//                 this.firstNamesAll.push(_.trim(deed.scribe.firstName));
//             }

//             if (deed.whitnesses.length > 0) {
//                 deed.whitnesses.forEach(whitness => {
//                     if (whitness.firstName) {
//                         this.firstNamesAll.push(_.trim(whitness.firstName));
//                     }
//                 });

//             }

//             if (deed.sureties.length > 0) {
//                 deed.sureties.forEach(surety => {
//                     if (surety.firstName) {
//                         this.firstNamesAll.push(_.trim(surety.firstName));
//                     }
//                 });

//             }

//             if (deed.otherParticipants.length > 0) {
//                 deed.otherParticipants.forEach(otherParticipant => {
//                     if (otherParticipant.firstName) {
//                         this.firstNamesAll.push(_.trim(otherParticipant.firstName));
//                     }
//                 });

//             }

//             if (deed.registrator && deed.registrator.firstName) {
//                 this.firstNamesAll.push(_.trim(deed.registrator.firstName));
//             }


//         }); // END FOREACH DEEDS

//         this.firstNamesAllRaw = _.concat(this.firstNamesAll, this.firstNamesMale, this.firstNamesFemale);
//         this.firstNamesAllRaw.sort(new Intl.Collator('ru').compare);
//         this.firstNamesAllSorted = _.sortedUniq(this.firstNamesAllRaw);


//     }); // END SUBSCRIBE

// }





}
