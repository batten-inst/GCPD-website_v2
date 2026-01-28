<script>
import { fillRange } from '@/assets/js/utility';
import { Chart } from 'highcharts-vue';

import Highcharts from 'highcharts';
import streamgraphInit from 'highcharts/modules/streamgraph';
import seriesLabelInit from 'highcharts/modules/series-label';
import exportingInit from 'highcharts/modules/exporting';

streamgraphInit(Highcharts);
seriesLabelInit(Highcharts);
exportingInit(Highcharts);

export default {
  components: {
    ChartHighchart: Chart,
  },
  props: { customOptions: Object },
  data() {
    return {
      chartOptions: {
        plotOptions: {
          series: {
            label: {
              minFontSize: 9,
              maxFontSize: 15,
              onArea: true,
            },
            // stacking: 'percent',
          },
        },
        chart: {
          height: 700,
          type: 'column',
          zoomType: 'xy',
          scrollablePlotArea: {
            minWidth: 500,
            scrollPositionX: 0,
          },
        },
        series: [],
        xAxis: {
          categories: fillRange(1976, 2023),
          labels: {
            step: 5,
          },
        },
        yAxis: {
          visible: true,
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
  //- p {{ chartOptions }}
  chart-highchart(:options="chartOptions")
</template>
