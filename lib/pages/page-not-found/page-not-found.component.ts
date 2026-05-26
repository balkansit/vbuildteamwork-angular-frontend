import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
  standalone: false,
})
export class PageNotFoundComponent implements OnInit {
  currentPath: string = '';
  suggestedLinks = [
    { icon: 'fas fa-compass', label: 'Dashboard', url: '/' },
    { icon: 'fas fa-th-large', label: 'Inventory', url: '/dashboard' },
    { icon: 'fas fa-cash-register', label: 'POS', url: '/pos' },
  ];

  constructor() {}

  ngOnInit(): void {
    // Get the attempted URL from the router or history
    if (typeof window !== 'undefined') {
      this.currentPath = window.location.pathname;
    }
  }

  goBack(): void {
    window.history.back();
  }

  navigateTo(url: string): void {
    window.location.href = url;
  }
}
