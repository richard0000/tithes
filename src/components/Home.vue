<template>
<div>  
  <section class="hero is-info">
    <div class="hero-body">
      <div class="container has-text-centered">
  		<p id="slm-logo">Solomon</p>
        <h1 class="subtitle is-size-3">Sistema de gesti&oacute;n para Iglesias</h1>
      </div>
    </div>
  </section>
  <section class="hero info-tiles is-hidden">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="tile is-ancestor has-text-centered">
            <div class="tile is-parent">
                <article class="tile is-child box">
                    <p class="title">439k</p>
                    <p class="subtitle">Diezmos de {{ today.month + '-' + today.year }}</p>
                </article>
            </div>
            <div class="tile is-parent">
                <article class="tile is-child box">
                    <p class="title">59k</p>
                    <p class="subtitle">Products</p>
                </article>
            </div>
            <div class="tile is-parent">
                <article class="tile is-child box">
                    <p class="title">3.4k</p>
                    <p class="subtitle">Open Orders</p>
                </article>
            </div>
            <div class="tile is-parent">
                <article class="tile is-child box">
                    <p class="title">19</p>
                    <p class="subtitle">Exceptions</p>
                </article>
            </div>
        </div>
      </div>
    </div>
  </section>
</div>
</template>

<script>
export default {
  data() {
    return {
      today: {}
    }
  },
  beforeMount() {
    this.setDate()
  },
  methods: {
    setDate() {
      let now = new Date()
      this.today.year = now.getFullYear()
      this.today.month = now.getMonth()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import url('https://fonts.googleapis.com/css?family=Tangerine');

#slm-logo {
  font-family: 'Tangerine', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: 12em;
}
</style>
