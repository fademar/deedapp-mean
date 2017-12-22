import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'excerpt'
})
export class ExcerptPipe implements PipeTransform {

  transform(text: any, length: number): any {
    if (!text || !length) {
      return text.replace(/<\/?[^>]+>/gi, '');
    }
    if (text.length > length) {
      text.replace(/<\/?[^>]+>/gi, '')
      return text.substr(0, length) + '...';
    }
    
    return text;
  }

}
