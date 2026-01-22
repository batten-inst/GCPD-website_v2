import Vue from 'vue';
import { format as d3Format } from 'd3';

Vue.filter('thousandComma', val => d3Format(',')(val));

Vue.filter('roundUnit', val => Math.round(val));

Vue.filter('removePeriods', str => str.replace(/\./g, ''));

Vue.filter('removeLastWord', str => {
  let lastIndex = str.lastIndexOf(' ');
  return str.substring(0, lastIndex);
});

Vue.filter('makeKebab', str => str.toLowerCase().replace(' ', '-'));
