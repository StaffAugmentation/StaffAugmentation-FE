import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[decimal]'
})
export class DecimalDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const initalValue = this.el.nativeElement.value;
    this.el.nativeElement.value = initalValue.replace(/[^0-9\.]/g, '');
    if (this.el.nativeElement.value !== initalValue) {
      event.stopPropagation();
    }
  }

}
