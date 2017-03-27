import { Component, Input, OnInit }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
import { QuestionBase }              from '../../question-base';
import { QuestionControlService }    from '../../services/question-control.service';
import { DeedService }    from '../../services/deed.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [ QuestionControlService, DeedService ]
})
export class DynamicFormComponent implements OnInit {
  @Input() questions: QuestionBase<any>[] = [];
  form: FormGroup;
  payLoad = '';
  constructor(private qcs: QuestionControlService, private deedService: DeedService, private router: Router) {  }
  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
    
  }


  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
    this.deedService.saveDeed(this.payLoad).subscribe(deed => {
      this.router.navigate(['/']);
    })
  }
}
