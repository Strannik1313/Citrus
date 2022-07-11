import { AdHostDirective } from './../directives/ad-host';
import { AdminOrderListPanelWrapperComponent } from './../components/wrappers/admin-order-list-panel-wrapper/admin-order-list-panel-wrapper.component';
import { AdminCreateServicePanelWrapperComponent } from 'src/app/components/wrappers/admin-create-service-panel-wrapper/admin-create-service-panel-wrapper.component';
import { AdminCreateMasterPanelWrapperComponent } from 'src/app/components/wrappers/admin-create-master-panel-wrapper/admin-create-master-panel-wrapper.component';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ComponentProviderService {
  constructor(
  ) { }

  getComponent(action: any): any {
    let component;
    switch (action.key) {
      case 'create-master':
        component = AdminCreateMasterPanelWrapperComponent;
        break;
      case 'create-master-service':
        component = AdminCreateServicePanelWrapperComponent;
        break;
      case 'create-order-list':
        component = AdminOrderListPanelWrapperComponent;
        break;
      default:
        break;
    }
    const viewContainerRef = action.host.viewContainerRef;
    viewContainerRef.clear();
    return viewContainerRef.createComponent(component);


  }
  destroyComponent(action: AdHostDirective): void {
    const viewContainerRef = action.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.remove();
  };
}
