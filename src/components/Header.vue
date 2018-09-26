<template>  
<nav class="navbar is-light" role="navigation" aria-label="main navigation">  
  <div class="navbar-menu">
    <div class="navbar-start">
      <router-link to="/" class="navbar-item">
        Inicio
      </router-link>
      <router-link :to="`tithes`" class="navbar-item">
        Diezmos del mes
      </router-link>
      <router-link :to="`new`" class="navbar-item">
        Nuevo Diezmo
      </router-link>
    </div>
  </div>
</nav>  
</template>

<script>  
</script>

<style>  
</style> 