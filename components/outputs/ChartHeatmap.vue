<script>
import { format as d3Format } from 'd3';
import { Chart } from 'highcharts-vue';

import Highcharts from 'highcharts';
import heatmapInit from 'highcharts/modules/heatmap';
heatmapInit(Highcharts);
import { formatNumber } from '@/assets/js/utility.js';
export default {
  components: {
    ChartHighchart: Chart,
  },
  props: {
    customOptions: Object,
  },
  data() {
    return {
      chartOptions: {
        plotOptions: {
          series: {
            borderWidth: 1,
            borderColor: '#04258e',
            dataLabels: {
              enabled: true,
              formatter() {
                return formatNumber(this.point.value, 1, 0);
              },
            },
          },
        },
        chart: {
          type: 'heatmap',
          marginTop: 40,
          marginBottom: 150,
          plotBorderWidth: 1,
          scrollablePlotArea: {
            minWidth: 500,
            scrollPositionX: 0,
          },
        },
        series: [],
        legend: {
          align: 'right',
          layout: 'vertical',
          margin: 0,
          verticalAlign: 'top',
          y: 25,
          symbolHeight: 280,
        },
        xAxis: {
          visible: true,
          style: {
            fontSize: '20px',
          },
          className: 'my-text-heavy',
        },
        yAxis: {
          visible: true,
          title: null,
          style: {
            fontSize: '18px',
          },
          className: 'my-text-heavy',
        },
        colorAxis: {
          min: 0,
          minColor: '#ffffff',
          maxColor: '#04258e',
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
  ChartHighchart(:options="chartOptions")
</template>

<style lang="scss"></style>
