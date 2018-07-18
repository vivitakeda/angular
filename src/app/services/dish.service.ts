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
import { Restangular } from 'ngx-restangular';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: Http,
  private processHTTPMsgService: ProcessHTTPMsgService, private restangular: Restangular
  ) { }


  getDishes(): Observable<Dish[]> {
      return this.restangular.all('dishes').getList();
    }

  getDish(id: number): Observable<Dish> {
    return  this.restangular.one('dishes', id).get();
  }

  getFeaturedDish(): Observable<Dish> {
    return this.restangular.all('dishes').getList({featured: true})
      .pipe(map(dishes => dishes[0]));
  }

  getDishIds(): Observable<number[] | any> {
    return this.getDishes()
      .pipe(map(dishes => dishes.map(dish => dish.id)),
        catchError(error => error ));
  }
}
