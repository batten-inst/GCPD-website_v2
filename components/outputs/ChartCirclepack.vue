<script>
import { Chart } from 'highcharts-vue';

import Highcharts from 'highcharts';
import exportingInit from 'highcharts/modules/exporting';
import moreInit from 'highcharts/highcharts-more';

import { formatNumber } from '@/assets/js/utility.js';

exportingInit(Highcharts);
moreInit(Highcharts);

export default {
  components: {
    ChartHighchart: Chart,
  },
  props: { customOptions: Object },
  data() {
    return {
      chartOptions: {
        plotOptions: {
          packedbubble: {
            minSize: '20%',
            maxSize: '100%',
            layoutAlgorithm: {
              splitSeries: true,
              gravitationalConstant: 0.05,
              seriesInteraction: false,
              dragBetweenSeries: true,
              parentNodeLimit: true,
            },
          },
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}',
          filter: {
            property: '{point.value}',
            operator: '>',
            value: 60000,
          },
          style: {
            color: 'black',
            textOutline: 'none',
            fontWeight: 'normal',
          },
        },
        chart: {
          type: 'packedbubble',
          height: '50%',
        },
        series: [],
        tooltip: {
          useHTML: true,
          formatter() {
            return `<b>${this.point.name}:</b> ${formatNumber(
              this.point.y,
              1,
              0,
            )}`;
          },
        },
      },
    };
  },
  mounted() {
    Object.assign(this.chartOptions, this.customOptions);
  },
};
</script>

<template lang="pug">
div 
  chart-highchart(:options="chartOptions")
</template>
