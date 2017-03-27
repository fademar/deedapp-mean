import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { DeedService } from '../../services/deed.service'

@Component({
  selector: 'app-add-deed',
  templateUrl: './add-deed.component.html',
  styleUrls: ['./add-deed.component.css'],
  providers:  [QuestionService]

})
export class AddDeedComponent implements OnInit {

  questions: any[];
  constructor(private service: QuestionService) { 
        this.questions = service.getQuestions();

  }

  ngOnInit() {
  
  }

}
