<template>
  <body>
    <Header/>
    <router-view />
    <FooterComponent/>
  </body>
</template>

<script>

import Header from './components/NavHeader.vue'
import FooterComponent from './components/FooterComponent.vue';

export default 
{
  name: 'App',
  components: 
  {
    Header,
    FooterComponent
  }
}
</script>

<style>
</style>
