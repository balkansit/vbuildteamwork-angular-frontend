import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { GenerateReportModalComponent } from 'lib/features/generate-report-modal/generate-report-modal.component';
import { SpinnerLoadingService } from '@lib/services/components/spinner-loading.service';

@Injectable({ providedIn: 'root' })
export class ReportHelperService {
  constructor(
    private dialog: MatDialog,
    private spinner: SpinnerLoadingService
  ) {}

  openAndGenerateReport(
    module: string,
    reportDialogData: any,
    reportService: any
  ) {
    const dialogRef = this.dialog.open(GenerateReportModalComponent, {
      width: '650px',
      data: reportDialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result?.success) return;

      this.spinner.setLoading(true, {
        message: `Generating ${module} report, please wait...`,
      });

      const reportData = {
        module,
        ...result.filters,
        fields: result.selectedFields,
        format: result.filters.format || 'pdf',
      };

      const fileformat = this.resolveFileFormat(reportData.format);

      reportService
        .generateReport(reportData)
        .pipe(finalize(() => this.spinner.setLoading(false)))
        .subscribe({
          next: (response: any) => {
            if (reportData.format === 'table') {
              console.log('Report Data:', response);
            } else {
              const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
              reportService.downloadFile(
                response,
                `${reportData.module}-report-${timestamp}.${fileformat}`
              );
            }
          },
          error: (err: any) => {
            console.error(`${module} Report error:`, err);
          },
        });
    });
  }

  private resolveFileFormat(format: string): string {
    switch (format) {
      case 'table':
        return 'json';
      case 'excel':
        return 'xlsx';
      case 'csv':
        return 'csv';
      default:
        return 'pdf';
    }
  }
}
