import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'excerpt'
})
export class ExcerptPipe implements PipeTransform {

  transform(text: any, length: number): any {
    if (!text || !length) {
      text = text.replace(/(<([^>]+)>)/ig,'');
      return text;
    }
    if (text.length > length) {
      text = text.replace(/(<([^>]+)>)/ig,'');
      return text.substr(0, length) + '...';
    }
    text = text.replace(/(<([^>]+)>)/ig,'');
    return text;
  }

}
