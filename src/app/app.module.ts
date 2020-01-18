import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ShopService } from './services/shop.service';
import { ItemService } from './services/item.service';
import { ValidatorService } from './services/validator.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    ItemService,
    ShopService,
    ValidatorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
