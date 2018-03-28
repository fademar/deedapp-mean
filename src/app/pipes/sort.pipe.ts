import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
    name: 'sort'
})
export class SortPipe implements PipeTransform {

    transform(value: any, args?: any): any {

        
        if (typeof args === 'undefined' || args.length !== 2) {
            return value;
        }

        const [key, direction] = args;

        if (direction !== 'ASC' && direction !== 'DESC') {
            return value;
        }

        return _.orderBy(value, (item:any) => item[key], direction.toLowerCase());
    }
}