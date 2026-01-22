import { formatNumber } from '@/assets/js/utility.js';
export let bubbleRnDPatentOpts = {
  chart: {
    type: 'bubble',
    height: 500,
    marginBottom: 150,
  },
  legend: {
    enabled: true,
  },
  yAxis: {
    title: {
      text: 'Total Number of Patents Over Ten Years',
    },
  },
  xAxis: {
    labels: {
      formatter() {
        return formatNumber(this.value, 1e6, 0, '$');
      },
    },
    title: {
      text:
        'Total Spent on Research & Development Over Ten Years<br> Size of a Circle Indicates Sales Revenue.',
    },
  },
  tooltip: {
    useHTML: true,
    formatter() {
      return `<b>${
        this.point.company
      }</b><br>Total Spent on R&D: ${formatNumber(
        this.point.x,
        1e6,
        2,
        '$',
      )}<br>Number of Patents: ${formatNumber(
        this.point.y,
      )}<br>Total Sales: ${formatNumber(this.point.z, 1e6, 2, '$')}`;
    },
  },
};
