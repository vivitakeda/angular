
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  FormsModule,
  ReactiveFormsModule
  } from '@angular/forms';

import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatToolbarModule
  } from '@angular/material';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import 'hammerjs';

import {AppComponent} from './app.component';
import {MenuComponent} from './menu/menu.component';
import {DishdetailComponent} from './dishdetail/dishdetail.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {DishService} from './services/dish.service';
import {PromotionService} from './services/promotion.service';
import {LeaderService} from './services/leader.service';
import {LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AboutComponent,
    AppComponent,
    ContactComponent,
    DishdetailComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    MenuComponent
  ],

  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSelectModule,
    ReactiveFormsModule
  ],

  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],

  providers: [DishService, PromotionService, LeaderService],
  entryComponents: [LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
