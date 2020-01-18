export class ItemService {
  static generate(name, sellIn, quality) {
    return new Item(name, sellIn, quality);
  }
}

export class Item {
  public name;
  public sellIn;
  public quality;

  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}