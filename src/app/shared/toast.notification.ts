import { ToastsManager } from 'ng2-toastr';
import { Injectable, ViewContainerRef } from '@angular/core';

@Injectable()
    export class ToastNotification {  
    constructor() { }

    // showError(message : string, title : string)
    // {
    //     let toastr : ToastsManager;
    //     let vcr : ViewContainerRef
    //     toastr.setRootViewContainerRef(vcr);
    //     toastr.error(message, title);
    // }
}
