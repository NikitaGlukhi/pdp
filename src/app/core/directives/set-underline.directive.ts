import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[setUnderline]',
})
export class SetUnderlineDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('mouseover', ['$event.target'])
  @HostListener('mouseout', ['$event.target'])
  onHover(): void {
    this.elementRef.nativeElement.classList.toggle('underline');
  }
}
