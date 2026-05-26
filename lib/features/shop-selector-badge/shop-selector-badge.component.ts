import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop-selector-badge',
  standalone: false,
  templateUrl: './shop-selector-badge.component.html',
  styleUrls: ['./shop-selector-badge.component.css'],
})
export class ShopSelectorBadgeComponent implements OnInit {
  selectedShopName: string = '';
  selectedShopId: string | number | null = null;

  constructor() {}

  ngOnInit(): void {
    this.loadSelectedShop();
    // Listen for storage changes (when selected from another tab/window)
    window.addEventListener('storage', () => {
      this.loadSelectedShop();
    });
  }

  private loadSelectedShop(): void {
    try {
      const shopData = localStorage.getItem('selectedShop');
      if (shopData) {
        const shop = JSON.parse(shopData);
        this.selectedShopName = shop.name || shop.shop_name || 'Unknown Shop';
        this.selectedShopId = shop.id;
      } else {
        this.selectedShopName = 'No Shop Selected';
      }
    } catch (error) {
      console.error('Error loading shop from localStorage:', error);
      this.selectedShopName = 'Error Loading Shop';
    }
  }
}
