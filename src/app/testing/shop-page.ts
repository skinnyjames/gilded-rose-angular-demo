import { ComponentElements } from './component-elements'

export class ShopPage extends ComponentElements {

  container = ShopPage.element('div#gilded__rose');
  itemList = ShopPage.elements('div.gilded__rose__item');

  item = ShopPage.textField('input#gilded__rose__item');
  sellBy = ShopPage.textField('input#gilded__rose__props__sellin');
  quality = ShopPage.textField('input#gilded__rose__props__quality');
  addItem = ShopPage.button('button#gilded__rose__add');
  nextDay = ShopPage.button('button#gilded__rose__update');

  addItemToShop(item, sellBy, quality) {
    this.populatePageWith({
      item,
      sellBy,
      quality
    });
    this.addItem.click();
  }

  getError(field) {
    try {
      const error = this.container.locate(`${field}-error`);
      return error.element().textContent;
    } catch(e) {
      throw new Error(`${field}-error could not be located`)
    }
  }

  getItemFromShop(itemName) {
    const regexp = new RegExp(itemName);
    const item = this.itemList.elements().find((element) => {
      return regexp.test(element.element().textContent)
    });
    return !!item ? item : null;
  }

}