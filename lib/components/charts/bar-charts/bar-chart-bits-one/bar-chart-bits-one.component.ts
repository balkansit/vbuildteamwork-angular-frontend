import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-bar-chart-bits-one',
  standalone: false,
  templateUrl: './bar-chart-bits-one.component.html',
  styleUrls: ['./bar-chart-bits-one.component.css'],
})
export class BarChartBitsOneComponent implements OnInit {
  @Input() data: {
    label: string;
    sales: number;
    purchases: number;
    profit?: number;
  }[] = [];
  @Input() title = 'Sales vs Purchases';
  @Input() salesLabel = 'Sales';
  @Input() purchasesLabel = 'Purchases';

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    animation: false,
    plugins: {
      legend: { position: 'top' },
    },
  };

  public barChartType: ChartType = 'bar';
  public barChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [],
  };

  ngOnInit(): void {
    this.updateChartData();
  }

  updateChartData() {
    this.barChartData.labels = this.data.map((d) => d.label);
    const datasets: any[] = [
      {
        label: this.salesLabel,
        data: this.data.map((d) => d.sales),
        backgroundColor: '#4caf50',
      },
      {
        label: this.purchasesLabel,
        data: this.data.map((d) => d.purchases),
        backgroundColor: '#2196f3',
      },
    ];

    if (this.data.some((d) => d.profit !== undefined)) {
      datasets.push({
        label: 'Profit',
        data: this.data.map((d) => d.profit || 0),
        backgroundColor: '#ff9800',
      });
    }

    this.barChartData.datasets = datasets;
  }
}
