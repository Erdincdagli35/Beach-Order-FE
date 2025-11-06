export enum Category {
  Beer = 'Beer',
  Gin = 'Gin',
  Cocktail = 'Cocktail',
  Raki = 'Raki',
  Wine = 'Wine',
  Whiskey = 'Whiskey',
  Votka = 'Votka',

  Meal = 'Meal',
  Snack = 'Snack',
  Burger = 'Burger',

  Coffee = 'Coffee',
  HotDrink = 'HotDrink'
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  category: Category;
}