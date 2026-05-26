import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  standalone: false,
  styleUrls: ['./pagination.component.css'], // or .scss if you prefer
})
export class PaginationComponent implements OnChanges {
  @Input() totalPages = 1;
  @Input() maxVisiblePages = 5;
  @Input() currentPage: number = 1;
  @Output() currentPageChange = new EventEmitter<number>();

  /** 'circle', 'square', or CSS border-radius string like '8px' */
  @Input() buttonRadius: 'circle' | 'square' | string = 'circle';

  /** Enable hover animation (scale + bg highlight) */
  @Input() hoverAnimation = true;

  @Output() pageChange = new EventEmitter<number>();

  pagesToShow: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.updatePages();
  }

  getBorderRadius(): string {
    if (this.buttonRadius === 'circle') return '9999px';
    if (this.buttonRadius === 'square') return '0px';
    return this.buttonRadius; // custom string like '8px'
  }

  buttonClass(): string {
    return this.hoverAnimation ? 'hover-animation' : 'no-hover-animation';
  }

  updatePages() {
    const pages = [];
    const half = Math.floor(this.maxVisiblePages / 2);

    let start = Math.max(1, this.currentPage - half);
    let end = Math.min(this.totalPages, this.currentPage + half);

    // Adjust start/end if we're near edges
    if (this.currentPage <= half) {
      end = Math.min(this.totalPages, this.maxVisiblePages);
    } else if (this.currentPage + half >= this.totalPages) {
      start = Math.max(1, this.totalPages - this.maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    this.pagesToShow = pages;
  }

  goToPage(page: number) {
    if (page !== this.currentPage && page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage);
      this.updatePages();
    }
  }
}
