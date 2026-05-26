import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-ratings',
  standalone: false,
  templateUrl: './ratings.component.html',
  styleUrl: './ratings.component.css',
})
export class RatingsComponent {
  @Input() rating: number = 0; // e.g., 3.5
  @Input() maxStars: number = 5;
  @Input() readOnly: boolean = false;
  @Output() ratingChange = new EventEmitter<number>();
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  stars: ('full' | 'half' | 'empty')[] = [];

  ngOnChanges() {
    this.calculateStars();
  }

  calculateStars() {
    this.stars = Array.from({ length: this.maxStars }, (_, i) => {
      const diff = this.rating - i;
      if (diff >= 1) return 'full';
      else if (diff >= 0.5) return 'half';
      else return 'empty';
    });
  }

  setRating(index: number) {
    if (!this.readOnly) {
      this.rating = index + 1;
      this.calculateStars();
      this.ratingChange.emit(this.rating);
    }
  }
}
