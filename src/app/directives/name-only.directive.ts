import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[name-only]'
})
export class NameOnlyDirective {
  private regex: RegExp = /^[a-zA-Z ]*$/;

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event:any) {
    const initialValue = this.el.nativeElement.value;
    this.el.nativeElement.value = initialValue.replace(/[^a-zA-Z ]*/g, '');
    if ( initialValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }

  @HostListener('blur') onBlur() {
    const value: string = this.el.nativeElement.value;
    if (!this.regex.test(value)) {
      this.el.nativeElement.value = '';
    }
  }
}
