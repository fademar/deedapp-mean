import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'highlight' })

export class HighlightPipe implements PipeTransform {
  transform(text: any, search): string {
    if (search && text) {
      if (typeof text === 'number') {
        text = text.toString();
      }
      let pattern = search.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
      pattern = pattern.split(' ').filter((t) => {
        return t.length > 0;
      }).join('|');
      const regex = new RegExp(pattern, 'gi');

      return text.replace(regex, (match) => `<span class="search-highlight">${match}</span>`);
    } else {
      return text;
    }
  }
}
