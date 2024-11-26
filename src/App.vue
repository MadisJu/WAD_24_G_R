<template>
  <Header/>
  <MainContent/>
  <SignUp/>
</template>

<script>

import SignUp from './components/SignUp.vue'
import Header from './components/NavHeader.vue'
import MainContent from './components/MainContent.vue'

export default {
  name: 'App',
  components: 
  {
    Header,
    MainContent,
    SignUp
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
