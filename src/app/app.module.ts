import { ErrorHandler } from "@angular/core/";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { PostService } from "./services/post.service";
import { AppComponent } from "./app.component";
import { AppErrorHandler } from "./error-handling/app-error-handler";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./shared/auth.interceptor";
import { AuthService } from "./shared/auth.service";
import { LogService } from "./shared/log.service";
import { LogInterceptor } from "./shared/log.interceptor";
import { ToastModule } from "ng2-toastr/ng2-toastr";
import { ToastNotification } from "./shared/toast.notification";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    NgbModule,
    ToastModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    PostService,
    AuthService,
    LogService,
    ToastNotification,
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LogInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
