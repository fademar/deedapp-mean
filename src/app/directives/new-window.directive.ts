import { Directive, ElementRef, HostListener, Input, Inject } from '@angular/core';

function getWindow (): any {
  return window;
}

@Directive({
  selector: this.newFunction()
})
export class NewWindowDirective {

  @Input('routerLink') link: string;

  constructor(private el: ElementRef) {
  }

    private newFunction(): string {
        return '[appNewWindow]';
    }

  @HostListener('mousedown') onMouseEnter() {
      getWindow().open(this.link || '');
  }

}
