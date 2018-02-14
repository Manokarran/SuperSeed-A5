import { Injectable } from "@angular/core";
import { HttpRequest } from "@angular/common/http";

@Injectable()
export class LogService {
  token: string;

  constructor() {}

  logRequest(request: HttpRequest<any>) {
    console.log(request);
  }
}
