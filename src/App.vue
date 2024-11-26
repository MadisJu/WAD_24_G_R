<template>
  <body>
    <Header/>
    <router-view />
    <SignUp/>
  </body>
</template>

<script>

import Header from './components/NavHeader.vue'

export default 
{
  name: 'App',
  components: 
  {
    Header,
  }
}
</script>

<style>
</style>
