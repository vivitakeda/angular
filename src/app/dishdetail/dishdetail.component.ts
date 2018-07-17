import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operator/switchMap';
import 'rxjs/add/operator/switchMap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback } from '../shared/feedback';



@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css' ]
})

  export class DishdetailComponent implements OnInit {

    dish: Dish;
    dishIds: number[];
    prev: number;
    next: number;

    feedbackForm: FormGroup;
    errMess: string;

    formErrors = {
      'author': '',
      'rating': '',
      'comment': ''

    };
    validationMessages = {
      'author': {
        'required': 'Author Name is required.',
        'minlength': 'Author Name must be at least 2 characters long.'
        },
      'comment': {
         'required': 'Comment is required.'
          }
     };


    constructor(private dishservice: DishService,
       private route: ActivatedRoute,
       private location: Location,
       private fb: FormBuilder,
      @Inject('BaseURL') public BaseURL) {

       }

     ngOnInit() {
      this.createForm();
      this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
      this.route.params
      .switchMap((params: Params) => this.dishservice.getDish(+params['id']))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); },
      errMess => this.errMess = <any> errMess);
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
        author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
        rating: [5, ''],
        comment: ['', Validators.required]
      });
      this.feedbackForm.valueChanges.subscribe(data => this.onValueChanged());
      this.onValueChanged(); // (re)set form validation messages
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
    const feedback = this.feedbackForm.value;
    feedback['date'] = new Date().toISOString();
    console.log(feedback);
    this.dish.comments.push(feedback);
   this.feedbackForm.reset({
     author: '',
           rating: 5,
      comment: ''
   });

     }
    }
