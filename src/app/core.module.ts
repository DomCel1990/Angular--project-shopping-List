import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInerceptorService } from "./service/auth-interceptor.service";

@NgModule({
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInerceptorService,
            multi: true
          }
    ]
})
export class CoreModule {}