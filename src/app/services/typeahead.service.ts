import { Injectable } from '@angular/core';
import { DeedService } from './deed.service';
import * as _ from 'lodash';

@Injectable()
export class TypeaheadService {

  firstNamesMale = [];
  firstNamesFemale = [];

  constructor(private deedService: DeedService) { }

  getFirstNamesMale() {
    this.deedService.getDeeds().subscribe(deeds => {
      deeds.forEach(deed => {
        if (deed.agentSex === 'male' && deed.agent.firstName) {
          this.firstNamesMale.push(deed.agent.firstName);
        }
        if (deed.agentSex === 'female' && deed.agent.referentMale.firstName) {
          this.firstNamesMale.push(deed.agent.referentMale.firstName);
        }
        if (deed.counterAgentSex === 'male' && deed.counterAgent.firstName) {
          this.firstNamesMale.push(deed.counterAgent.firstName);
        }
        if (deed.counterAgentSex === 'female' && deed.counterAgent.referentMale.firstName) {
          this.firstNamesFemale.push(deed.counterAgent.referentMale.firstName);
        }
        if (deed.coAgents.length > 0) {
          deed.coAgents.forEach(element => {
            if (element.coAgentSex === 'male' && element.coAgent.firstName) {
              this.firstNamesMale.push(element.coAgent.firstName);
            }
            if (element.coAgentSex === 'female' && element.coAgent.referentMale.firstName) {
              this.firstNamesMale.push(element.coAgent.referentMale.firstName);
            }
          });
        }
        if (deed.coCounterAgents.length > 0) {
          deed.coCounterAgents.forEach(element => {
            if (element.coCounterAgentSex === 'male' && element.coCounterAgent.firstName) {
              this.firstNamesMale.push(element.coCounterAgent.firstName);
            }
            if (element.coCounterAgentSex === 'female' && element.coCounterAgent.referentMale.firstName) {
              this.firstNamesMale.push(element.coCounterAgent.referentMale.firstName);
            }
          });
        }
      });
    });
    this.firstNamesMale.sort();
    this.firstNamesMale = _.sortedUniq(this.firstNamesMale);
    return this.firstNamesMale;
  }


  getFirstNamesFemale() {

    this.deedService.getDeeds().subscribe(deeds => {
      deeds.forEach(deed => {

        if (deed.agentSex === 'female' && deed.agent.firstName) {
          this.firstNamesFemale.push(deed.agent.firstName);
        }

        if (deed.counterAgentSex === 'female' && deed.counterAgent.firstName) {
          this.firstNamesFemale.push(deed.counterAgent.firstName);
        }
        if (deed.coAgents.length > 0) {
          deed.coAgents.forEach(element => {
            if (element.coAgentSex === 'female' && element.coAgent.firstName) {
              this.firstNamesFemale.push(element.coAgent.firstName);
            }
          });
        }
        if (deed.coCounterAgents.length > 0) {
          deed.coCounterAgents.forEach(element => {
            if (element.coCounterAgentSex === 'female' && element.coCounterAgent.firstName) {
              this.firstNamesFemale.push(element.coCounterAgent.firstName);
            }
          });
        }
      });


    });
    this.firstNamesFemale.sort();
    this.firstNamesFemale = _.sortedUniq(this.firstNamesFemale.sort());
    return this.firstNamesFemale;
  }


}
