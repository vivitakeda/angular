import {Component, OnInit, Inject} from '@angular/core';

import {Dish} from '../shared/dish';
import {Promotion} from '../shared/promotion';
import {Leader} from '../shared/leader';

import {DishService} from '../services/dish.service';
import {PromotionService} from '../services/promotion.service';
import {LeaderService} from '../services/leader.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { flyInOut, expand } from '../animations/app.animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations: [   flyInOut(), expand()]
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMess: string;
  leaderErrMess: string;
  promoErrMess: string;

  constructor(private dishService: DishService,
              private promotionService: PromotionService,
              private leaderService: LeaderService,
            @Inject('BaseURL') public BaseURL ) {
  }

  ngOnInit() {
    this.dishService.getFeaturedDish()
    .subscribe(dish => this.dish = dish,
      errmess => this.dishErrMess = <any>errmess.message);
  this.promotionService.getFeaturedPromotion()
    .subscribe(promotion => this.promotion = promotion,
      errmess => this.promoErrMess = <any>errmess.message);
  this.leaderService.getFeaturedLeader()
    .subscribe(leader => this.leader = leader,
      errmess => this.leaderErrMess = <any>errmess.message);
  }

}
