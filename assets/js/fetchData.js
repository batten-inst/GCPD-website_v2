// Exports promises, not the actual data; Need to be resolved by importing modules
import * as d3 from 'd3';
import { lists } from '@/assets/data/listData';

const sectorsObj = lists.sectors.reduce((acc, v) => {
  // 0 is for "all sectors"; should not be included in the sector list
  if (v.sector_code != 0) acc[v.sector_code] = v.sector;
  return acc;
}, {});

const dataProm = d3
  .csv(require('@/assets/data/complete.csv'))
  .then(data => {
    // Convert to correct data types and make other changes before returning the data
    data.forEach(el => {
      el.year = +el.year;
      el.patentcount = +el.patentcount;
      el.sector = sectorsObj[el.sector_code];
    });
    return data;
  });

const yearSectorDataProm = d3
  .csv(require('@/assets/data/year_sector.csv'))
  .then(data => {
    data.forEach(el => {
      el.sector = sectorsObj[el.sector_code];
    });
    return data;
  });

const yearRegionDataProm = d3.csv(require('@/assets/data/year_region.csv'))
  .then(data => {
    data.forEach(el => {
      el.sector = sectorsObj[el.sector_code];
    });
    return data;
  });

const regionSectorDataProm = d3.csv(require('@/assets/data/region_sector.csv'))
  .then(data => {
    data.forEach(el => {
      el.sector = sectorsObj[el.sector_code];
    });
    return data;
  });


const top10CompaniesDataProm = d3
  .csv(require('@/assets/data/top10_2014to2023.csv'))
  .then(data => {
    data.forEach(el => {
      el.year = +el.year;
      el.patentcount = +el.patentcount;
      el.sector = sectorsObj[el.sector_code];
    });
    return data;
  });

const publicationsDataProm = d3.csv(require('@/assets/data/publications.csv'))
  .then(data => {
    return data;
  });

export {
  dataProm,
  sectorsObj,
  yearSectorDataProm,
  yearRegionDataProm,
  regionSectorDataProm,
  top10CompaniesDataProm,
  publicationsDataProm,
  // company1980to89DataProm,
  // company2007to16DataProm,
};
