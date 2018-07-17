import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { Observable, throwError} from 'rxjs';
import {Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { baseURL } from '../shared/baseurl';
import { catchError } from 'rxjs/operators';
import {ProcessHTTPMsgService} from './process-httpmsg.service';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: Http,
  private processHTTPMsgService: ProcessHTTPMsgService
  ) { }

  getDishes(): Observable<Dish[]> {
    return this.http.get(baseURL + '/dishes')
      .pipe(map(res => {
        return this.processHTTPMsgService.extractData(res);
      }))
      .pipe(catchError(error => {
        return this.processHTTPMsgService.handleError(error);
      }));
  }


  getDish(id: number): Observable<Dish> {
    return this.http.get(baseURL + '/dishes/' + id)
      .pipe(map(res => {
        return this.processHTTPMsgService.extractData(res);
      }))
      .pipe(catchError(error => {
        return this.processHTTPMsgService.handleError(error);
      }));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get(baseURL + '/dishes?featured=true')
      .pipe(map(res => {
        return this.processHTTPMsgService.extractData(res)[0];
      }))
      .pipe(catchError(error => {
        return this.processHTTPMsgService.handleError(error);
      }));
  }

  getDishIds(): Observable<number[] | any> {
    return this.getDishes()
      .pipe(map(dishes => {
        return dishes.map(dish => dish.id);
      }))
      .pipe(catchError(error => {
        return throwError(error);
      }));
  }
}
