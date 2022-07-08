import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dialogWindow]'
})
export class AdHostDirective {

  constructor(
    public viewContainerRef: ViewContainerRef
    ) { }
}
