import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
  token: string;

  constructor() {}

  getToken() {
    this.token = "sample-token";
    return this.token;
  }
}
