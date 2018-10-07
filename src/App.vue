<template>
  <div id="app">
  	<app-header/>
    <router-view/>
  	<app-footer/>
  </div>
</template>

<script>
import AppHeader from '@/components/Header'
import AppFooter from '@/components/Footer'
export default {
  name: 'App',
  components: {
  	'app-header': AppHeader,
  	'app-footer': AppFooter
  }
}
</script>

<style lang="scss">  
@import '~bulma/bulma'
</style> 
