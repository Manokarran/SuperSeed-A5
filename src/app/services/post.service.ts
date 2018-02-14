import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DataService } from "./base.service";

@Injectable()
export class PostService extends DataService {
  constructor(httpClient: HttpClient) {
    super(httpClient, "http://jsonplaceholder.typicode.com/posts");
  }
}
