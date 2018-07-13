import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { delay } from '../../../node_modules/rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions(): Observable<Promotion[]> {
  return of(PROMOTIONS).pipe(delay(2000));
}

  getPromotion(id: number): Observable<Promotion> {
  return of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000));
}

    getFeaturedPromotion(): Observable<Promotion> {
    return of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000));
    }
  }
