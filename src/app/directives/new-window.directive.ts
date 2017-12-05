import { Directive, ElementRef, HostListener, Input, Inject } from '@angular/core';

function getWindow (): any {
  return window;
}

@Directive({
  selector: '[appNewWindow]'
})
export class NewWindowDirective {

  @Input('routerLink') link: string;

  constructor(private el: ElementRef) {
  }

  @HostListener('mousedown') onMouseEnter() {
      getWindow().open(this.link || '');
  }

}
