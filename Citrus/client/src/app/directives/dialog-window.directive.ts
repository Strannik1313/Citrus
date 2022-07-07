import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dialogWindow]'
})
export class DialogWindowDirective {

  constructor(
    public viewContainerRef: ViewContainerRef
    ) { }
}
