import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';
import { MatListModule } from '@angular/material/list';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MenuComponent } from './menu/menu.component'


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent
  ],
  imports: [
  MatGridListModule,
  MatCardModule,
  MatButtonModule,
  BrowserModule,
  BrowserAnimationsModule,
  MatToolbarModule,
  MatListModule,
  FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
