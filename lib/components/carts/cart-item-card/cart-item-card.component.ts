import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface ProductSpecification {
  id: string;
  label: string;
}

@Component({
  selector: 'app-cart-item-card',
  templateUrl: './cart-item-card.component.html',
  styleUrls: ['./cart-item-card.component.css'],
  standalone: false,
})
export class CartItemCardComponent {
  @Input() productImage!: string;
  @Input() productTitle!: string;
  @Input() specifications: ProductSpecification[] = [];
  @Input() selectedSpecId!: string;
  @Input() quantity = 1;
  @Input() maxQuantity = 99;
  @Input() inStock = true;
  @Input() deliverable = true;
  @Input() unitPrice = 0;

  @Output() specChange = new EventEmitter<string>();
  @Output() quantityChange = new EventEmitter<number>();
  @Output() delete = new EventEmitter<void>();

  onSpecChange(event: any) {
    this.specChange.emit(event.target.value);
  }

  increaseQty() {
    if (this.quantity < this.maxQuantity) {
      this.quantity++;
      this.quantityChange.emit(this.quantity);
    }
  }

  decreaseQty() {
    if (this.quantity > 1) {
      this.quantity--;
      this.quantityChange.emit(this.quantity);
    }
  }

  get totalPrice() {
    return this.unitPrice * this.quantity;
  }
}
