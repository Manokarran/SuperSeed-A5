import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest
} from "@angular/common/http";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/operator/retry";
import "rxjs/add/observable/throw";
import { Observable } from "rxjs/Observable";
import { error } from "util";

import { Post } from "./../model/post.model";
import { BadInputError } from "./../error-handling/bad-input-error";
import { AppError } from "./../error-handling/app-error";
import { NotFoundError } from "../error-handling/not-found-error";

@Injectable()
export class DataService {
  constructor(private httpClient: HttpClient, private url) {}

  getAll() {
    
    //HttpClinet Method 1
    return this.httpClient.get<Post[]>(this.url).catch(this.handleError);

    //HttpClinet Method 2
    // return this.httpClient.get(this.url,{
    //   observe: 'body',
    //   responseType: 'json'
    // }).map(response => { console.log(response); return response; })
    // .catch(this.handleError);
  }
  create(resource) {
    return this.httpClient.post(this.url, resource).catch(this.handleError);
  }
  update(resource) {
    return this.httpClient.put(this.url, resource).catch(this.handleError);
  }
  delete(id) {
    return this.httpClient
      .delete(this.url + "/" + id)
      .retry(0) //try 'n' number of time when fails
      .catch(this.handleError);
  }

  private handleError(error: Response) {
  
    if (error.status === 404) return Observable.throw(new NotFoundError());

    if (error.status === 400)
      return Observable.throw(new BadInputError(error.json()));

    return Observable.throw(AppError);
  }
  
}
