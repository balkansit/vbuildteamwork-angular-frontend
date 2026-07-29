import { Component, OnInit } from '@angular/core';
import { ApiResponse } from '@lib/models/ApiResponse.model';
import {
  Overview
} from '../../../models/dbschema/overview.model';
import { TableService } from '../../../services/apis/table.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
  standalone: false,
})
export class OverviewComponent implements OnInit {
  overviewData!: Overview;
  tables: any[] = [];

  constructor(private tableService: TableService, private router: Router) {}

  ngOnInit() {
    this.getTables();
  }

  getTables() {
    this.tableService.getAll().subscribe((response: ApiResponse) => {
      if (response.success && response.data) {
        this.tables = response.data.data || response.data;
      } else {
        console.error(response.message);
      }
    });
  }

  navigateToTable(tableId: number) {

      this.router.navigate([`/dashboard/dynamic-tables/${tableId}`]);
    }
  }

