<script>
import { Chart } from 'highcharts-vue';

import Highcharts from 'highcharts';
import annotationsInit from 'highcharts/modules/annotations';
import exportingInit from 'highcharts/modules/exporting';
import moreInit from 'highcharts/highcharts-more';

annotationsInit(Highcharts);
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
        chart: {
          type: 'bubble',
          zoomType: 'xy',
          scrollablePlotArea: {
            minWidth: 500,
            scrollPositionX: 0,
          },
        },
        title: {
          text: '',
        },

        xAxis: {
          gridLineWidth: 1,
        },
        yAxis: {
          startOnTick: false,
          endOnTick: false,
        },
        series: [],
        annotations: [],
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
