import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-loading-spinner-modal',
  standalone: false,
  templateUrl: './loading-spinner-modal.component.html',
  styleUrls: ['./loading-spinner-modal.component.css'],
})
export class LoadingSpinnerModalComponent implements OnInit, OnDestroy {
  dots = '...';
  private intervalId: any;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      color?: string;
      message?: string;
      spinnerSize?: number;
      strokeWidth?: number;
      autoDismissMs?: number;
    }
  ) {}

  ngOnInit() {
    // this.intervalId = setInterval(() => {
    //   if (this.dots.length >= 3) {
    //     this.dots = '';
    //   } else {
    //     this.dots += '.';
    //   }
    // }, 500);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
