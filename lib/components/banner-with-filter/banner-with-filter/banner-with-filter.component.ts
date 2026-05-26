import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-banner-with-filter',
  standalone: false,
  templateUrl: './banner-with-filter.component.html',
  styleUrls: ['./banner-with-filter.component.css']
})
export class BannerWithFilterComponent {
@Input() bannerImage: string = '';
  @Input() bannerTitle: string = '';
  @Input() bannerDescription: string = '';
  @Input() showFilter: boolean = true;

  @Output() filterSubmit = new EventEmitter<any>();

  locations: string[] = ['Chennai', 'Bangalore', 'Mumbai', 'Delhi'];
  guests: number[] = [1, 2, 3, 4, 5];

  selectedLocation = '';
  checkInDate = '';
  checkOutDate = '';
  guestCount = 1;

  onSubmit() {
    const filterData = {
      location: this.selectedLocation,
      checkIn: this.checkInDate,
      checkOut: this.checkOutDate,
      guests: this.guestCount,
    };
    this.filterSubmit.emit(filterData);
  }
}