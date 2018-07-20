import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { Dish } from '../shared/dish';
import { Comment } from '../shared/comments';
import { visibility } from '../animations/app.animations';
import { DishService } from '../services/dish.service';
import { flyInOut, expand } from '../animations/app.animations';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      visibility(),
      expand()
    ]

})
export class DishdetailComponent implements OnInit {

  dish: Dish;
    dishIds: number[];
    prev: number;
    next: number;
    dishcopy = null;
    feedbackForm: FormGroup;
    errMess: string;

  visibility = 'shown';

  formErrors = {
    'author': '',
    'comment': '',
  };

  validationMessages = {
    'author': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 2 characters long.',
      'maxlength': 'Name cannot be more than 25 characters long.'
    },
    'comment': {
      'required': 'Comment is required.',
      'minlength': 'Name must be at least 5 characters long.'
    },
  };

  constructor(private dishservice: DishService,
    @Inject('BaseURL') private BaseURL,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder) {
      this.createForm();
    }

  ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params
      .switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(+params['id']); })
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
          errmess => { this.dish = null; this.errMess = <any>errmess; });
  }

  setPrevNext(dishId: number) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  createForm(): void {
    this.feedbackForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      rating: 5,
      comment: ['', [Validators.required, Validators.minLength(5)]],
      date: ''
    });

    this.feedbackForm.valueChanges
    .subscribe(data => this.onValueChanged());

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged() {
    if (!this.feedbackForm) {
           return;
        }
        const form = this.feedbackForm;
        for (const field of Object.keys(this.formErrors)) {
          this.formErrors[field] = '';
          const control = form.get(field);
         if (control && control.dirty && !control.valid) {
           const messages = this.validationMessages[field];
           for (const key of Object.keys(control.errors)) {
             this.formErrors[field] += messages[key] + '';
            }
         }
         }
        }

  onSubmit() {
    const feedbacks = this.feedbackForm.value;
    feedbacks['date'] = new Date().toISOString();
    console.log(feedbacks);
    this.dishcopy.feedback.push(feedbacks);
    this.dishcopy.save()
    .subscribe(dish => { this.dish = dish; console.log(this.dish); });
  this.feedbackForm.reset({
     author: '',
           rating: 5,
      comment: ''
   });

     }
    }
