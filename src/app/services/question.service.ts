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
        parent: '',
        required: true
      }),
      new QuestionTextbox({
        key: 'DeedRef',
        label: 'Deed Reference',
        parent: '',
        required: true
      }),
      new QuestionTextbox({
        key: 'DeedDate',
        label: 'Deed Date',
        parent: ''
      }),
      new QuestionTextbox({
        key: 'DeedName',
        label: 'Deed Name',
        parent: ''
      }),
      new QuestionTextbox({
        key: 'DeedLanguage',
        label: 'Deed Language',
        parent: '',
        value: 'russian'
      }),
      new QuestionDropdown({
        key: 'AgentSex',
        label: 'Agent Sex',
        parent: '',
        options: [
          {key: 'm',  value: 'M'},
          {key: 'f',  value: 'F'},
        ]
      }),
      new QuestionFieldset({
        key: 'AgentSexM',
        label: 'Agent Sex M',
        parent: '',
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
        parent: '',
        properties: [
          {key: 'familyStatus', label: 'family Status'},
          {key: 'firstName', label: 'first Name'},
          {key: 'patronyme', label: 'patronyme'},
          {key: 'relatedTo', label: 'related To'}
        ]
       }),
       new QuestionFieldset({
         key: 'referentMale', 
         label: 'referent Male',
         parent: 'AgentSexF',
         value: true,
         properties: [
          {key: 'relationshipToAgentSexF', label: 'relationship To AgentSexF'},
          {key: 'geogrStatus', label: 'geogr Status'},
          {key: 'socialStatus', label: 'social Status'},
          {key: 'firstName', label: 'first Name'},
          {key: 'patronyme', label: 'patronyme'},
          {key: 'lastName', label: 'last Name'},
          {key: 'relatedTo', label: 'related To'}
        ]
       })
    ];
    return questions.sort((a, b) => a.order - b.order);
  }
}
