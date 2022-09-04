import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { finalize, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LoadingService } from './services/loading.service';


@Injectable()
export class NetworkInterceptor implements HttpInterceptor {

  constructor(private loader:LoadingService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loader.show();

    return next.handle(request).pipe(
      finalize(() => {

            this.loader.hide();

        }
      )
    )
  }
}
