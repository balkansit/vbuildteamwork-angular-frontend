import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-line-chart-one',
  standalone: false,
  templateUrl: './line-chart-one.component.html',
  styleUrls: ['./line-chart-one.component.css'],
})
export class LineChartOneComponent implements OnInit {
  @Input() title = 'Line Chart';
  @Input() labels: string[] = [];
  @Input() data: number[] = [];
  @Input() color = '#2196f3';
  @Input() label = 'Value';

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  public lineChartType: ChartType = 'line';
  public lineChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [],
  };

  ngOnInit(): void {
    this.updateChartData();
  }

  ngOnChanges(): void {
    this.updateChartData();
  }

  updateChartData() {
    this.lineChartData = {
      labels: this.labels,
      datasets: [
        {
          label: this.label,
          data: this.data,
          borderColor: this.color,
          backgroundColor: this.color + '20',
          fill: true,
          tension: 0.4,
        },
      ],
    };
  }
}
