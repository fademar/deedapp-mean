import { Component, OnInit } from '@angular/core';
import { SchemaService } from '../../services/schema.service'

@Component({
  selector: 'app-schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.css']
})
export class SchemaComponent implements OnInit {
  schema;
  constructor(private schemaService:SchemaService) { }

  ngOnInit() {
    this.schemaService.getSchema().subscribe(schema => {
			this.schema = JSON.stringify(schema, null, '\t');
		})
  }
}
