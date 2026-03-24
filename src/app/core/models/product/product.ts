export enum Category {
  Beer = 'Beer',
  Gin = 'Gin',
  Cocktail = 'Cocktail',
  Raki = 'Raki',
  Wine = 'Wine',
  Whiskey = 'Whiskey',
  Vodka = 'Vodka',

  Meal = 'Meal',
  Snack = 'Snack',
  Burger = 'Burger',
  Pasta = "Pasta",
  Salad = "Salad",
  Appetizer = "Appetizer",
  Fruit = "Fruit",

  Coffee = 'Coffee',
  HotDrink = 'HotDrink',
  SoftDrink = 'SoftDrink'
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Category;
}