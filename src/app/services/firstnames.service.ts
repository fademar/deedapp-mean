import { Injectable } from '@angular/core';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, PartialObserver, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { tap, map, filter, scan, catchError } from 'rxjs/operators';
import { DeedService } from './deed.service';
import * as _ from 'lodash';
import { FirstNameObject } from '../models/deed-model';



@Injectable({
    providedIn: 'root'
})
export class FirstnamesService {


    constructor(private deedService: DeedService, private http: HttpClient) { }


    createFirstNamesArray(deeds) {
        let firstNames: FirstNameObject[] = [];

        deeds.forEach(deed => {
            if ((deed.agentSex === 'male' || deed.agentSex === 'female') && deed.agent.firstName !== '') {
                firstNames.push(new FirstNameObject(deed.agentSex, _.trim(deed.agent.firstName), deed._id, 'agent.firstName'));
            }
            if ((deed.counterAgentSex === 'male' || deed.counterAgentSex === 'female') && deed.counterAgent.firstName !== '') {
                firstNames.push(new FirstNameObject(deed.counterAgentSex, _.trim(deed.counterAgent.firstName), deed._id, 'counterAgent.firstName'));
            }
            if (deed.agentSex === 'female' && deed.agent.referentMale.firstName !== '') {
                firstNames.push(new FirstNameObject('male', _.trim(deed.agent.referentMale.firstName), deed._id, 'agent.referentMale.firstName'));
            }
            if (deed.counterAgentSex === 'female' && deed.counterAgent.referentMale.firstName !== '') {
                firstNames.push(new FirstNameObject('male', _.trim(deed.counterAgent.referentMale.firstName), deed._id, 'counterAgent.referentMale.firstName'));
            }
            if (deed.coAgents.length > 0) {
                for (let index = 0; index < deed.coAgents.length; index++) {
                    const coAgent = deed.coAgents[index];
                    if ((coAgent.coAgentSex === 'male' || coAgent.coAgentSex === 'female') && coAgent.coAgent.firstName !== '') {
                        firstNames.push(new FirstNameObject(coAgent.coAgentSex, _.trim(coAgent.coAgent.firstName), deed._id, 'coAgents.' + index.toString() + '.coAgent.firstName'));
                    }
                    if (coAgent.coAgentSex === 'female' && coAgent.coAgent.referentMale.firstName !== '') {
                        firstNames.push(new FirstNameObject('male', _.trim(coAgent.coAgent.referentMale.firstName), deed._id, 'coAgents.' + index.toString() + '.coAgent.referentMale.firstName'));
                    }
                }
            }
            if (deed.coCounterAgents.length > 0) {
                for (let index = 0; index < deed.coCounterAgents.length; index++) {
                    const coCounterAgent = deed.coCounterAgents[index];
                    if ((coCounterAgent.coCounterAgentSex === 'male' || coCounterAgent.coCounterAgentSex === 'female') && coCounterAgent.coCounterAgent.firstName !== '') {
                        firstNames.push(new FirstNameObject(coCounterAgent.coCounterAgentSex, _.trim(coCounterAgent.coCounterAgent.firstName), deed._id, 'coCounterAgents.' + index.toString() + '.coCounterAgent.firstName'));
                    }
                    if (coCounterAgent.coCounterAgentSex === 'female' && coCounterAgent.coCounterAgent.referentMale.firstName !== '') {
                        firstNames.push(new FirstNameObject('male', _.trim(coCounterAgent.coCounterAgent.referentMale.firstName), deed._id, 'coCounterAgents.' + index.toString() + '.coCounterAgent.referentMale.firstName'));
                    }
                }

            }

            if (deed.transactions.length > 0) {
                for (let i = 0; i < deed.transactions.length; i++) {
                    const transaction = deed.transactions[i];
                    if (transaction.agentTransactionObjects.length > 0) {
                        for (let j = 0; j < transaction.agentTransactionObjects.length; j++) {
                            const agentTransactionObject = transaction.agentTransactionObjects[j];
                            if (agentTransactionObject.dependent && agentTransactionObject.dependent.firstName !== '') {
                                firstNames.push(new FirstNameObject('male', _.trim(agentTransactionObject.dependent.firstName), deed._id, 'transactions.' + i.toString() + '.agentTransactionObjects[' + j.toString() + '].dependent.firstName'));
                            }
                        }

                    }
                    if (transaction.counterAgentTransactionObjects.length > 0) {
                        for (let j = 0; j < transaction.counterAgentTransactionObjects.length; j++) {
                            const counterAgentTransactionObject = transaction.counterAgentTransactionObjects[j];
                            if (counterAgentTransactionObject.dependent && counterAgentTransactionObject.dependent.firstName !== '') {
                                firstNames.push(new FirstNameObject('male', _.trim(counterAgentTransactionObject.dependent.firstName), deed._id, 'transactions.' + i.toString() + '.counterAgentTransactionObjects[' + j.toString() + '].dependent.firstName'));
                            }
                        }
                    }
                }
            } // END IF TRANSACTION

            if (deed.scribe && deed.scribe.firstName !== '') {
                firstNames.push(new FirstNameObject('undefined', _.trim(deed.scribe.firstName), deed._id, 'scribe.firstName'));
            }

            if (deed.whitnesses.length > 0) {
                for (let index = 0; index < deed.whitnesses.length; index++) {
                    const whitness = deed.whitnesses[index];
                    if (whitness.firstName !== '') {
                        firstNames.push(new FirstNameObject('undefined', _.trim(whitness.whitness.firstName), deed._id, 'whitnesses.' + index.toString() + '.whitness.firstName'));
                    }
                }
            }

            if (deed.sureties.length > 0) {
                for (let index = 0; index < deed.sureties.length; index++) {
                    const surety = deed.sureties[index];
                    if (surety.firstName !== '') {
                        firstNames.push(new FirstNameObject('undefined', _.trim(surety.surety.firstName), deed._id, 'sureties.' + index.toString() + '.surety.firstName'));
                    }
                }
            }

            if (deed.otherParticipants.length > 0) {
                for (let index = 0; index < deed.otherParticipants.length; index++) {
                    const otherParticipant = deed.otherParticipants[index];
                    if (otherParticipant.firstName !== '') {
                        firstNames.push(new FirstNameObject('undefined', _.trim(otherParticipant.otherParticipant.firstName), deed._id, 'otherParticipants.' + index.toString() + '.otherParticipant.firstName'));
                    }
                }

            }

            if (deed.registrator && deed.registrator.firstName !== '') {
                firstNames.push(new FirstNameObject('undefined', _.trim(deed.registrator.firstName), deed._id, 'registrator.firstName'));
            }

        }); //END FOREACH
        return firstNames;

    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    };

    getFirstNames(): Observable<any> {

        return this.deedService.getDeeds().pipe(
            map((data) => this.createFirstNamesArray(data))
        )

    }

    updateFirstnames(data): Observable<any> {
        return this.http.put('/api/firstnames', data, this.deedService.httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    // test

}
