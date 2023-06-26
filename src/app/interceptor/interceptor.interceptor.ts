import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient
} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor(
    private http: HttpClient
  ) {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: any) => {
        console.log(err);
        if (err.status === 401) {
          if (err.error.message == 'unauthorized') {
            let payLoad = {
              refreshToken: localStorage.getItem('refresh_token'),
              accessToken: localStorage.getItem('access_token'),
            };
            return this.http.post('url', payLoad).pipe(
              mergeMap((data: any) => {
                if (data.status == 200) {
                  localStorage.setItem('access_token', data.access_token);
                  localStorage.setItem('refresh_token', data.refresh_token);
                }
                request = request.clone({
                  headers: request.headers
                    .set(
                      'liviaapp-token',
                      `${localStorage.getItem('access_token')}`
                    )
                    .set('liviaapp-apiversion', '2.0'),
                });
                return Observable.throw("hi");
              })
            );
          } else {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            //Logout from account or do some other stuff
          }
        }
        return Observable.throw(err);
      })
    );
  }

}

