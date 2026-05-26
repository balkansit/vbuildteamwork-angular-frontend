import { Component, Input } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-pie-chart-one',
  standalone: false,
  templateUrl: './pie-chart-one.component.html',
  styleUrls: ['./pie-chart-one.component.css'],
})
export class PieChartOneComponent {
  @Input() title = 'Pie Chart';
  @Input() labels: string[] = [];
  @Input() data: number[] = [];
  @Input() colors: string[] = ['#4caf50', '#2196f3', '#ff9800', '#f44336'];

  pieChartType: ChartType = 'pie';

  pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    animation: {
      duration: 0, // disables all animation
      animateRotate: false,
      animateScale: false,
    },
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    datasets: {
      pie: {
        // No animation options needed here as 'animateRotate' and 'animateScale' are not valid
      },
    },
  };

  get pieChartData(): ChartConfiguration<'pie'>['data'] {
    return {
      labels: this.labels,
      datasets: [
        {
          data: this.data,
          backgroundColor: this.colors,
        },
      ],
    };
  }
}
