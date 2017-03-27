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
        key: 'DeedRef',
        label: 'Deed Reference',
        required: true,
        order: 1
      }),
      new QuestionTextbox({
        key: 'DeedDate',
        label: 'Deed Date',
        type: 'date',
        order: 2
      }),
      new QuestionTextbox({
        key: 'DeedName',
        label: 'Deed Name',
        order: 3
      }),
      new QuestionTextbox({
        key: 'DeedLanguage',
        label: 'Deed Language',
        value: 'russian',
        order: 4
      }),
      new QuestionDropdown({
        key: 'AgentSex',
        label: 'Agent Sex',
        options: [
          {key: 'm',  value: 'M'},
          {key: 'f',  value: 'F'},
        ],
        order: 5
      }),
      new QuestionFieldset({
        key: 'AgentSexM',
        label: 'Agent SexM',
        properties: [
          {key: 'socialStatus', label: 'social Status'},
          {key: 'firstName', label: 'first Name'},
          {key: 'patronyme', label: 'patronyme'},
        ],
        order: 6
      })
    ];
    return questions.sort((a, b) => a.order - b.order);
  }
}
