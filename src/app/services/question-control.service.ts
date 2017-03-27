import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { QuestionBase } from '../question-base';

@Injectable()
export class QuestionControlService {
  constructor() { }

  toFormGroup(questions: QuestionBase<any>[] ) {
    let group: any = {};

    questions.forEach(question => {
      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
                                              : new FormControl(question.value || '');

      if (question.controlType === 'fieldset') {
        let fieldset: any = {};
        question.properties.forEach(property => {

          fieldset[property.key] = property.required ? new FormControl(property.value || '', Validators.required)
                                                     : new FormControl(property.value || '');

        });
        group[question.key] = new FormGroup(fieldset);
      }
    });
    return new FormGroup(group);
  }
}
