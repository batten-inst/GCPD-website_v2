<template>
  <div>
    <the-header-partial />
    <nuxt keep-alive />
    <the-footer-partial />
  </div>
</template>

<script>
import TheHeaderPartial from './TheHeaderPartial';
import TheFooterPartial from './TheFooterPartial';
export default {
  components: { TheHeaderPartial, TheFooterPartial },
};
</script>
