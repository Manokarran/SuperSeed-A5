import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { LogService } from "./log.service";

@Injectable()
export class LogInterceptor implements HttpInterceptor {
  constructor(private logService: LogService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const copiedReq = req.clone();
    this.logService.logRequest(copiedReq);
    return next.handle(copiedReq);
  }
}
