import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-global-search',
  standalone: false,
  templateUrl: './global-search.component.html',
  styleUrl: './global-search.component.css'
})
export class GlobalSearchComponent {
  @Output() searchChange = new EventEmitter<string>();

  onSearch(term: string) {
    this.searchChange.emit(term); // <-- NOW STRING OK
  }
}
