import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ReportField {
  key: string;
  label: string;
  selected?: boolean;
}

export interface ReportFilters {
  period: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom';
  dateType?: string;
  from?: string;
  to?: string;
  groupBy?: string;
  sortBy?: string;
  format: 'table' | 'pdf' | 'excel' | 'csv';
}

@Component({
  selector: 'app-generate-report-modal',
  standalone: false,
  templateUrl: './generate-report-modal.component.html',
  styleUrls: ['./generate-report-modal.component.css'],
})
export class GenerateReportModalComponent {
  filters: ReportFilters = {
    period: 'daily',
    format: 'table',
  };

  availableFields: ReportField[] = [];
  dateTypes: { key: string; label: string }[] = [];

  constructor(
    public dialogRef: MatDialogRef<GenerateReportModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      availableFields: ReportField[];
      dateTypes: { key: string; label: string }[];
    }
  ) {}

  ngOnInit() {
    this.availableFields = this.data.availableFields.map((f) => ({
      ...f,
      selected: f.selected ?? true, // Default: include all
    }));
    this.dateTypes = this.data.dateTypes;
  }

  onGenerate() {
    const selectedFields = this.availableFields.filter((f) => f.selected);
    this.dialogRef.close({
      success: true,
      filters: this.filters,
      selectedFields,
    });
  }

  onCancel() {
    this.dialogRef.close({ success: false });
  }
}
