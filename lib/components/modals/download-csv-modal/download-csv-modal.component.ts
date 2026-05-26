import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-download-csv-modal',
standalone: false,
  templateUrl: './download-csv-modal.component.html',
  styleUrls: ['./download-csv-modal.component.css']
})
export class DownloadCsvModalComponent {

  selectedRange: string = 'lastMonth';

  @Output() submitClicked = new EventEmitter<string>();

  dateOptions = [
    { label: 'Last Month', value: 'lastMonth' },
    { label: 'Last 3 Months', value: 'last3Months' },
    { label: 'Last 6 Months', value: 'last6Months' },
    { label: 'Last Year', value: 'lastYear' },
  ];

  constructor(public dialogRef: MatDialogRef<DownloadCsvModalComponent>) {}

  submit() {
    this.dialogRef.close(this.selectedRange);
  }

  cancel() {
    this.dialogRef.close(null);
  }
}