import { ErrorHandler, Injectable } from "@angular/core";

@Injectable()
export class AppErrorHandler implements ErrorHandler
{
    constructor(){}
    handleError(error: any): void {        
        console.log(error); //todo : write it in server
    }
    
}