<script>
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
            borderColor: '#eeefff',
            dataLabels: {
              enabled: true,
              formatter() {
                return formatNumber(this.point.value, 1, 0);
              },
            },
          },
        },
        chart: {
          height: 450,
          type: 'heatmap',
          marginTop: 40,
          marginBottom: 200,
          plotBorderWidth: 1,
          scrollablePlotArea: {
            minWidth: 500,
            scrollPositionX: 0,
          },
        },
        series: [],
        legend: {
          layout: 'horizontal',
          verticalAlign: 'bottom',
          y: -15,
          symbolWidth: 300,
          symbolPadding: 20,
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
            fontSize: '20px',
          },
          className: 'my-text-heavy',
        },
        colorAxis: {
          min: 0,
          minColor: '#ffffff',
          maxColor: '#1a223b',
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
  ChartHighchart(:options="chartOptions")
</template>

<style lang="scss"></style>
