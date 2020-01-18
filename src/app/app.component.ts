import { Component, OnInit } from '@angular/core';
import { ShopService } from './services/shop.service';
import { ItemService, Item } from './services/item.service';
import * as momentImport from 'moment'
import { ValidatorService } from './services/validator.service';
const moment = momentImport;

interface CurrentItem {
  name: string;
  sellIn: string;
  quality: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'gilded-rose';
  currentDay: momentImport.Moment;
  currentItem: CurrentItem = {
    name: '',
    sellIn: '',
    quality: 0
  };
  currentItemErrors = {
    name: '',
    sellIn: '',
    quality: ''
  }
  validator;

  constructor(
    private shopService: ShopService
  ){}

  addItem() {
    if (this.validate()) {
      const name = this.currentItem.name;
      const sellInDate = moment(this.currentItem.sellIn, 'MM/DD/YYYY');
      const sellIn = moment.duration(sellInDate.diff(this.currentDay)).asDays();
      const quality = this.currentItem.quality;
      const item = ItemService.generate(name, sellIn, quality);
      this.shopService.addItem(item);
      this.resetCurrentItem();
    }
  }

  round(sellIn) {
    return Math.round(parseInt(sellIn));
  }

  validate(): boolean {
    this.resetCurrentItemErrors();
    const errors = this.validator.validate(this.currentItem);
    if(errors.length > 0) {
      errors.forEach((error) => {
        this.currentItemErrors[error.field] = error.message
      });
      return false;
    }
    return true;
  }

  currentDate() {
    return this.currentDay.format('MM/DD/YYYY');
  }

  resetCurrentItem() {
    this.currentItem =  {
      name: '',
      sellIn: '',
      quality: 0
    };
  }

  resetCurrentItemErrors() {
    this.currentItemErrors = {
      name: '',
      sellIn: '',
      quality: ''
    };
  }

  getItems(): Array<Item | undefined> {
    return this.shopService.getItems();
  }

  updateQuality() {
    this.shopService.updateQuality();
    this.currentDay.add(1, 'day');
  }

  ngOnInit() {
    this.currentDay = moment();
    const rulesSchema = {
      presence: ['name', 'sellIn', 'quality'],
      custom: [
        (currentItem) => {
          let date = moment(currentItem.sellIn, 'MM/DD/YYYY');
          return {
            condition: (date.isValid() && date.isAfter(this.currentDay)),
            fields: ['sellIn'],
            message: 'Sell In must be a valid date after the current day'
          }
        },
        (currentItem) => {
          return {
            condition: (currentItem.quality >= 0 && currentItem.quality <= 50),
            fields: ['quality'],
            message: 'Quality must be between 0 and 50'
          }
        }
      ]
    };
    this.validator = ValidatorService.create(rulesSchema);
  }
}
