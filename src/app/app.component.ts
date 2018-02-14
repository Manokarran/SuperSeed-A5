import { Component, ViewContainerRef } from "@angular/core";
import { OnInit } from "@angular/core";
import { PostService } from "./services/post.service";
import { debuglog } from "util";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Post } from "./model/post.model";
import { NotFoundError } from "./error-handling/not-found-error";
import { BadInputError } from "./error-handling/bad-input-error";
import { AppError } from "./error-handling/app-error";
import { ToastsManager } from "ng2-toastr/ng2-toastr";
import { BrowserModule } from "@angular/platform-browser";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  posts: Post[];
  post: Post = new Post();

  constructor(
    private services: PostService,
    private toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
    //this.toastr.success("You are awesome!", "Success!");
  }

  ngOnInit() {
    this.services.getAll().subscribe((response: Post[]) => {
      this.posts = response;
    });
  }
  createPost(input: any) {
    this.post.title = input.value;
    this.posts.splice(0, 0, this.post);
    input.value = "";

    this.services.create(JSON.stringify(this.post)).subscribe(
      newPost => {
        this.post.id = newPost.id;
      },
      (error: AppError) => {
        this.posts.splice(0, 1);

        if (error instanceof BadInputError) {
          //this.form.setErrors(error.originalError);
          this.toastr.error("Bad Input!", "Oops");
        } else throw error;
      }
    );
  }

  updatePost(input: any) {}

  deletePost(post: Post) {
    let index = this.posts.indexOf(post);
    this.posts.splice(index, 1);

    this.services.delete(post.id).subscribe(null, (error: AppError) => {
      this.posts.splice(index, 0, post);

      if (error instanceof NotFoundError) {
        this.toastr.error("No Post Found!", "Oops");
      } else throw error;
    });
  }
}
