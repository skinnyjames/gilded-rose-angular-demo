import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ShopService } from './services/shop.service';
import { ItemService } from './services/item.service';
import { ShopPage } from './testing/shop-page';
import * as moment from 'moment';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let shopPage: ShopPage;
  let component: AppComponent;
  let initialDay: moment.Moment;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        ShopService,
        ItemService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    shopPage = new ShopPage(fixture);
    fixture.detectChanges();
    initialDay = moment(component.currentDate(), 'MM/DD/YYYY');
  }));

  describe('Basic Functionality', () => {
    it('should add an item to the shop', () => {
      const sellIn = initialDay.add(20, 'days').format('MM/DD/YYYY');
      shopPage.addItemToShop('Blessed Bandana', sellIn, 35);
      const bandana = shopPage.getItemFromShop('Blessed Bandana');
      expect(bandana).toBeTruthy();
    });
  });

  describe('Client Side Validations', () => {

  });

  describe('Shop Rules', () => {

  });
});
