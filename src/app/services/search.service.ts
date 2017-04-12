import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { Client, SearchResponse } from 'elasticsearch';
import { DeedService } from '../services/deed.service';

@Injectable()
export class SearchService {

  constructor(private esClient: Client, private deedService: DeedService) {
    if (!this.esClient) {
      this.connect();
    }
  }
  
  connect() {
    this.esClient = new Client({
      host: 'http://localhost:9200',
      log: 'trace'
    });
  }

  bulkIndex(index, type, data) {
    let bulkBody = [];

    data.forEach(item => {
      item.id = item._id;
      delete item._id;

      bulkBody.push({
        index: {
          _index: index,
          _type: type,
          _id: item.id
        }
      });
      bulkBody.push(item);
    });

    this.esClient.bulk({ body: bulkBody })
      .then(response => {
        console.log('here');
        let errorCount = 0;
        response.items.forEach(item => {
          if (item.index && item.index.error) {
            console.log(++errorCount, item.index.error);
          }
        });
        console.log(
          `Successfully indexed ${data.length - errorCount}
       out of ${data.length} items`
        );
      });
  };











}
