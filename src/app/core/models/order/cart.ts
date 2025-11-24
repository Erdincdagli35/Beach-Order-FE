import { Injectable } from '@angular/core';

export interface Cart {
  productId: number;
  productName?: string;
  qty: number;
}
