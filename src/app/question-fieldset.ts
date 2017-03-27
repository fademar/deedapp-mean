import { QuestionBase } from './question-base';

export class QuestionFieldset extends QuestionBase<string> {
  controlType = 'fieldset';
  options: {key: string, label: string}[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['properties'] || [];
  }
}