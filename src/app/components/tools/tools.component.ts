import { Component, OnInit } from '@angular/core';
import { DeedService } from '../../services/deed.service';
import { NotificationsService } from 'angular2-notifications';
import * as _ from 'lodash';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {


  public options = {
    position: ['bottom', 'right'],
    timeOut: 2000,
    showProgressBar: false,
    pauseOnHover: false,
    animate: 'fade'
  }

  firstNamesMale = [];
  firstNamesFemale = [];
  firstNamesAll = [];
  firstNamesAllRaw = [];
  firstNamesAllSorted = [];
  firstNamesMaleSorted = [];
  firstNamesFemaleSorted = [];


  constructor(private deedService: DeedService, private notificationsService: NotificationsService) { }

  ngOnInit() {
  
    this.getFirstNamesM();
    this.getFirstNamesF();
    this.getFirstNamesAll();
    console.log(this.firstNamesAllSorted);
  }

  getFirstNamesM() {
    this.deedService.getDeeds().subscribe(deeds => {
        deeds.forEach(deed => {
            if (deed.agentSex === 'male' && deed.agent.firstName) {
                this.firstNamesMale.push(_.trim(deed.agent.firstName));

            }
            if (deed.agentSex === 'female' && deed.agent.referentMale.firstName) {
                this.firstNamesMale.push(_.trim(deed.agent.referentMale.firstName));
            }
            if (deed.counterAgentSex === 'male' && deed.counterAgent.firstName) {
                this.firstNamesMale.push(_.trim(deed.counterAgent.firstName));
            }
            if (deed.counterAgentSex === 'female' && deed.counterAgent.referentMale.firstName) {
                this.firstNamesMale.push(_.trim(deed.counterAgent.referentMale.firstName));
            }
            if (deed.coAgents.length > 0) {
                deed.coAgents.forEach(element => {
                    if (element.coAgentSex === 'male' && element.coAgent.firstName) {
                        this.firstNamesMale.push(_.trim(element.coAgent.firstName));
                    }
                    if (element.coAgentSex === 'female' && element.coAgent.referentMale.firstName) {
                        this.firstNamesMale.push(_.trim(element.coAgent.referentMale.firstName));
                    }
                });
            }
            if (deed.coCounterAgents.length > 0) {
                deed.coCounterAgents.forEach(element => {
                    if (element.coCounterAgentSex === 'male' && element.coCounterAgent.firstName) {
                        this.firstNamesMale.push(_.trim(element.coCounterAgent.firstName));
                    }
                    if (element.coCounterAgentSex === 'female' && element.coCounterAgent.referentMale.firstName) {
                        this.firstNamesMale.push(_.trim(element.coCounterAgent.referentMale.firstName));
                    }
                });
            }
        }); //END FOREACH

        this.firstNamesMale.sort(new Intl.Collator('ru').compare);
        this.firstNamesMaleSorted = _.sortedUniq(this.firstNamesMale);
    });
}

getFirstNamesF() {
    this.deedService.getDeeds().subscribe(deeds => {
        deeds.forEach(deed => {
            if (deed.agentSex === 'female' && deed.agent.firstName) {
                this.firstNamesFemale.push(_.trim(deed.agent.firstName));
            }
            if (deed.counterAgentSex === 'female' && deed.counterAgent.firstName) {
                this.firstNamesFemale.push(_.trim(deed.counterAgent.firstName));
            }
            if (deed.coAgents.length > 0) {
                deed.coAgents.forEach(coAgent => {
                    if (coAgent.coAgentSex === 'female' && coAgent.firstName) {
                        this.firstNamesFemale.push(_.trim(coAgent.firstName));
                    }
                });
            }
            if (deed.coCounterAgents.length > 0) {
                deed.coCounterAgents.forEach(coCounterAgent => {
                    if (coCounterAgent.coCounterAgentSex === 'female' && coCounterAgent.firstName) {
                        this.firstNamesFemale.push(_.trim(coCounterAgent.firstName));
                    }
                });
            }
        });
        this.firstNamesFemale.sort(new Intl.Collator('ru').compare);
        this.firstNamesFemaleSorted = _.sortedUniq(this.firstNamesFemale);
    });


}

getFirstNamesAll() {
    this.deedService.getDeeds().subscribe(deeds => {
        deeds.forEach(deed => {
            if (deed.transactions.length > 0) {
                deed.transactions.forEach(transaction => {
                    if (transaction.agentTransactionObjects.length > 0) {
                        transaction.agentTransactionObjects.forEach(agentTransactionObject => {
                            if (agentTransactionObject.dependent && agentTransactionObject.dependent.firstName !== '') {
                                this.firstNamesAll.push(_.trim(agentTransactionObject.dependent.firstName));
                            }
                        });
                    }
                    if (transaction.counterAgentTransactionObjects.length > 0) {
                        transaction.counterAgentTransactionObjects.forEach(counterAgentTransactionObject => {
                            if (counterAgentTransactionObject.dependent && counterAgentTransactionObject.dependent.firstName !== '') {
                                this.firstNamesAll.push(_.trim(counterAgentTransactionObject.dependent.firstName));
                            }
                        });
                    }
                }); // END FOREACH TRANSACTION
            }

            if (deed.scribe && deed.scribe.firstName) {
                this.firstNamesAll.push(_.trim(deed.scribe.firstName));
            }

            if (deed.whitnesses.length > 0) {
                deed.whitnesses.forEach(whitness => {
                    if (whitness.firstName) {
                        this.firstNamesAll.push(_.trim(whitness.firstName));
                    }
                });

            }

            if (deed.sureties.length > 0) {
                deed.sureties.forEach(surety => {
                    if (surety.firstName) {
                        this.firstNamesAll.push(_.trim(surety.firstName));
                    }
                });

            }

            if (deed.otherParticipants.length > 0) {
                deed.otherParticipants.forEach(otherParticipant => {
                    if (otherParticipant.firstName) {
                        this.firstNamesAll.push(_.trim(otherParticipant.firstName));
                    }
                });

            }

            if (deed.registrator && deed.registrator.firstName) {
                this.firstNamesAll.push(_.trim(deed.registrator.firstName));
            }


        }); // END FOREACH DEEDS

        this.firstNamesAllRaw = _.concat(this.firstNamesAll, this.firstNamesMale, this.firstNamesFemale);
        this.firstNamesAllRaw.sort(new Intl.Collator('ru').compare);
        this.firstNamesAllSorted = _.sortedUniq(this.firstNamesAllRaw);


    }); // END SUBSCRIBE

}













}
