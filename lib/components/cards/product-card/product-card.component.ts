import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product1-card',
  standalone: false,
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: any;
  @Input() countdownEnd?: Date;

  @Input() currency: 'USD' | 'EUR' | 'GBP' | 'INR' = 'INR';

  private getCurrencySymbol(): string {
    switch (this.currency) {
      case 'EUR':
        return '€';
      case 'GBP':
        return '£';
      case 'INR':
        return '₹';
      default:
        return '$';
    }
  }

  formatPrice(value: number): string {
    return this.getCurrencySymbol() + value.toFixed(2);
  }

  selectedImage: string = '';
  quantity = 1;
  timeLeft: string = '';

  ngOnInit(): void {
    this.selectedImage = this.product.images[0];
    if (this.countdownEnd) {
      this.updateCountdown();
      setInterval(() => this.updateCountdown(), 1000);
    }
  }

  selectImage(img: string) {
    this.selectedImage = img;
  }

  updateCountdown() {
    const now = new Date().getTime();
    const distance = new Date(this.countdownEnd!).getTime() - now;
    if (distance < 0) {
      this.timeLeft = 'Offer expired';
      return;
    }
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    this.timeLeft = `${hours}h ${minutes}m ${seconds}s`;
  }

  increment() {
    this.quantity++;
  }

  decrement() {
    if (this.quantity > 1) this.quantity--;
  }

  addToCart() {
    // implement logic
    console.log('Add to cart', this.product.title, 'x', this.quantity);
  }
}

/*
Example usage in a parent component template:

<app-product-card
  [product]="{
    title: 'Sample Product',
    price: 199.99,
    images: [
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/200'
    ]
  }"
  [currency]="'USD'"
  [countdownEnd]="new Date(Date.now() + 3600 * 1000)">
</app-product-card>
*/
