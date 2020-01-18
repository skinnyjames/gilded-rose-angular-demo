import { ComponentElements } from './component-elements'

export class AppPage extends ComponentElements {

  item = AppPage.selectList('select#item');
  calculate = AppPage.button('button#calculate');
  
}