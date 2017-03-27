import { Injectable }       from '@angular/core';

import { QuestionBase }     from '../question-base';
import { QuestionTextbox } from '../question-textbox';
import { QuestionDropdown }  from '../question-dropdown';
import { QuestionFieldset }  from '../question-fieldset';

@Injectable()
export class QuestionService {
  // Todo: get from a remote source of question metadata
  // Todo: make asynchronous
  getQuestions() {
    let questions: QuestionBase<any>[] = [
      
      new QuestionTextbox({
        key: 'DeedCode',
        label: 'Deed Code',
        required: true
      }),
      new QuestionTextbox({
        key: 'DeedRef',
        label: 'Deed Reference',
        required: true
      }),
      new QuestionTextbox({
        key: 'DeedDate',
        label: 'Deed Date'
      }),
      new QuestionTextbox({
        key: 'DeedName',
        label: 'Deed Name'
      }),
      new QuestionTextbox({
        key: 'DeedLanguage',
        label: 'Deed Language',
        value: 'russian'
      }),
      new QuestionDropdown({
        key: 'AgentSex',
        label: 'Agent Sex',
        options: [
          {key: 'm',  value: 'M'},
          {key: 'f',  value: 'F'},
        ]
      }),
      new QuestionFieldset({
        key: 'AgentSexM',
        label: 'Agent Sex M',
        properties: [
          {key: 'geogrStatus', label: 'geogr Status'},
          {key: 'socialStatus', label: 'social Status'},
          {key: 'firstName', label: 'first Name'},
          {key: 'patronyme', label: 'patronyme'},
          {key: 'lastName', label: 'last Name'},
          {key: 'relatedTo', label: 'related To'},
        ]
      }),
       new QuestionFieldset({
        key: 'AgentSexF',
        label: 'Agent Sex F',
        properties: [
          {key: 'familyStatus', label: 'family Status'},
          {key: 'firstName', label: 'first Name'},
          {key: 'patronyme', label: 'patronyme'},
          {key: 'relatedTo', label: 'related To'},
          {key: 'referentMale', label: 'referent Male (RefM)', value: true},
          {key: 'refm_relationshipToAgentSexF', label: 'RefM relationship To AgentSexF'},
          {key: 'refm_geogrStatus', label: 'RefM geogr Status'},
          {key: 'refm_socialStatus', label: 'RefM social Status'},
          {key: 'refm_firstName', label: 'RefM first Name'},
          {key: 'refm_patronyme', label: 'RefM patronyme'},
          {key: 'refm_lastName', label: 'RefM last Name'},
          {key: 'refm_relatedTo', label: 'RefM related To'},
             
        ]
      })
    ];
    return questions.sort((a, b) => a.order - b.order);
  }
}
