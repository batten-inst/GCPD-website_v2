<script>
import { cross as d3Cross, format as d3Format } from 'd3';
import ChartStacked from '@/components/outputs/ChartStacked';
import ChartHeatmap from '@/components/outputs/ChartHeatmap';
import ChartCirclepack from '@/components/outputs/ChartCirclepack';

import { lists } from '@/assets/data/listData.js';
import {
  industriesObj,
  regionIndustryDataProm,
  yearRegionDataProm,
  company1980to89DataProm,
  company2007to16DataProm,
} from '@/assets/js/fetchData.js';

const regionList = ['Asia Pacific', 'Europe', 'North America'];
const regionObj = {
  'Asia Pacific': '#8e9fca',
  Europe: '#99c869',
  'North America': '#ffa23e',
  // Other: '#f5e480',
};
const industryList = Object.values(industriesObj);
const regionIndustryCross = d3Cross(regionList, industryList);

export default {
  components: {
    ChartStacked,
    ChartHeatmap,
    ChartCirclepack,
  },
  data() {
    return {
      regionCompanyPack1980to89Opts: {
        series: [],
        chart: {
          height: '50%',
        },
        title: {
          text: 'Top 50 Companies of 1980–1989',
        },
      },
      regionCompanyPack2007to16Opts: {
        series: [],
        chart: {
          height: '80%',
        },
        title: {
          text: 'Top 50 Companies of 2007–2016',
        },
      },
      regionIndustryHeatmapOpts: {
        series: [],
        xAxis: {
          categories: industryList,
        },
        yAxis: {
          categories: regionList,
        },
        title: {
          text: 'Region-Industry Matrix (1980–2016)',
        },
        tooltip: {
          style: {
            fontSize: '15px',
          },
          formatter() {
            return (
              '<i>' +
              this.series.xAxis.categories[this.point.x] +
              '</i> in <b>' +
              this.series.yAxis.categories[this.point.y] +
              '</b><br /> <b>' +
              d3Format(',')(this.point.value) +
              '</b> Patents'
            );
          },
        },
      },
      yearRegionColumnOpts: {
        plotOptions: {
          series: {
            stacking: 'percent',
          },
        },
        series: [],
        chart: {
          type: 'column',
        },
        yAxis: {
          labels: {
            format: '{value}%',
          },
          title: {
            text: '% of Total Patents',
          },
        },
        title: {
          text: 'Regional Distribution of Patents by Year (1980–2016)',
        },
      },
      yearRegionStreamOpts: {
        series: [],
        chart: {
          type: 'streamgraph',
        },
        yAxis: {
          labels: {
            formatter() {
              return d3Format('~s')(this.value).replace('-', '');
            },
          },
          title: {
            text: 'Number of Patents',
          },
        },
        title: {
          text: 'Number of Patents by Region and Year (1980–2016)',
        },
      },
    };
  },
  beforeCreate() {
    const vm = this;
    regionIndustryDataProm.then(data_ => {
      const seriesData = regionIndustryCross.map(el => {
        const matchedRow = data_.find(
          row => row.region == el[0] && row.industry == el[1],
        );
        const returnObj = {
          x: industryList.indexOf(el[1]),
          y: regionList.indexOf(el[0]),
        };

        if (matchedRow == undefined) {
          returnObj['value'] = 0;
        } else {
          returnObj['value'] = +matchedRow.count_patents;
        }
        return returnObj;
      });
      vm.regionIndustryHeatmapOpts.series.push({
        data: seriesData,
      });
    });

    company2007to16DataProm.then(data_ => {
      Object.keys(regionObj).forEach(region => {
        const seriesData = data_
          .filter(row => row.region === region)
          .map(row => ({
            name: row.company,
            value: +row.total_count_patents,
          }));
        vm.regionCompanyPack2007to16Opts.series.push({
          name: region,
          data: seriesData,
          color: regionObj[region],
        });
      });
    });
    company1980to89DataProm.then(data_ => {
      Object.keys(regionObj).forEach(region => {
        const seriesData = data_
          .filter(row => row.region === region)
          .map(row => ({
            name: row.company,
            value: +row.total_count_patents,
          }));
        vm.regionCompanyPack1980to89Opts.series.push({
          name: region,
          data: seriesData,
          color: regionObj[region],
        });
      });
    });
    yearRegionDataProm.then(data_ => {
      regionList.forEach(region => {
        const filteredData = data_
          .filter(row => row.region == region)
          .map(row => +row.count_patents);
        const seriesItem = {
          data: filteredData,
          name: region,
          color: regionObj[region],
        };
        vm.yearRegionColumnOpts.series.push(seriesItem);
        vm.yearRegionStreamOpts.series.push(seriesItem);
      });
    });
  },
};
</script>

<template lang="pug">
.uk-section.uk-animation-slide-top-small.uk-section-muted
  main.uk-container
    h1.uk-heading-small The Rise of Asia
    .uk-grid(uk-grid).uk-card-default.uk-padding
      div(class="uk-width-1-3@s")
        p.uk-margin-large-top Until the late 1970s, it was almost exclusively U.S. companies that filed patent applications with the USPTO. That changed around 1980 when both European and Asian companies started to seek U.S. patent protection for their innovation. In the subsequent years, the Asian countries as a whole far surpassed Europe and challenged the prominence of North America.
        p.uk-text-large Hover over the charts to get more details.
      div(class="uk-width-2-3@s")
        chart-stacked(:custom-options="yearRegionColumnOpts")
    .uk-grid(uk-grid).uk-card-default.uk-padding
      div(class="uk-width-1-3@s")
        p.uk-margin-large-top The past few decades saw an explosion of patent grants in the US. The streamgraph here shows the changes in regional distribution within the context of that rapid overall growth.
      div(class="uk-width-2-3@s")
        chart-stacked(:custom-options="yearRegionStreamOpts")
    .uk-grid.uk-card-default.uk-padding
      div(class="uk-width-1-1@s")
        p.uk-margin-large-top It's notable, but perhaps not surprising, that the Asia Pacific region outshines North America in manufacturing — and is not far behind in business equipment and software, the industry that generated most patents during 1980–2016.
        chart-heatmap(:custom-options="regionIndustryHeatmapOpts")
    .uk-grid(uk-grid).uk-card-default.uk-padding
      div(class="uk-width-1-1@s")
        p(class="uk-hidden@s") [Please view the charts on a larger screen. They cannot be rendered on small screens.]
        p.uk-margin-large-top Here's another look at how regional distribution changed dramatically between the first ten years (1980–2016) and the last ten years (2007–2016) of our dataset's coverage.
        p The smaller circles represent the top 50 companies, by aggregate count of patents, during those two periods. Hover over the circles for details.
      div(class="uk-width-1-1@s uk-visible@s" uk-grid).uk-grid
        div(class="uk-width-1-2@s")
          chart-circlepack(:custom-options="regionCompanyPack1980to89Opts")
        div(class="uk-width-1-2@s")
          chart-circlepack(:custom-options="regionCompanyPack2007to16Opts")
</template>

<style lang="scss" scoped>
@media (width: 850px) {
  .uk-card-default,
  .uk-padding,
  .uk-container {
    padding: 0%;
  }
}
</style>
