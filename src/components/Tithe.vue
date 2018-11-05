<template>
    <div>
        <section class="hero is-info">
            <div class="hero-body">
                <div class="container has-text-centered">
                    <h1 class="title is-size-1">
                        Edici&oacute;n de Diezmo
                    </h1>
                </div>
            </div>
        </section>
        <section class="section">
            <div class="container">
                <div class="card article">
                    <div class="card-content">
                        <div class="media">
                            <div class="media-center">
                              <figure class="avatar">
                                <!-- <img v-bind:src="tithe.member.photo"> -->
                                <img src="../assets/male.png">
                              </figure>
                            </div>
                            <div class="media-content has-text-centered">
                                <p class="title article-title">
                                    {{ (tithe.member) ? tithe.member.name : '' }}
                                </p>
                                <p class="subtitle is-6 article-subtitle">
                                    {{ localeDate(tithe.date, 'es-AR') }}
                                </p>
                                <p class="is-size-3">
                                    {{ '$ ' + Math.round(tithe.amount) }}
                                </p>
                            </div>
                        </div>

                        <div class="columns">
                          <div class="column has-text-centered">
                            <a class="button is-danger is-rounded" @click="removeTithe">
                                <font-awesome-icon icon="trash">
                                </font-awesome-icon>
                            </a>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
export default {
  beforeMount() {
    this.$store.dispatch('loadTithe', { id: parseInt(this.$route.params.id) })
  },
  methods: {
    localeDate: function(aDate, aLocale){
      let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      let theDate = new Date(aDate);

      return theDate.toLocaleDateString(aLocale, options);
    },
    removeTithe: function() {
        this.$store.dispatch('deleteTithe', { id: parseInt(this.$route.params.id) }).
        	then(() => this.$router.push('/tithes'))
    }
  },
  computed: {
    tithe() {
      return this.$store.state.currentTithe
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped="">
.avatar img {
    padding: 5px;
    background: #fff;
    border-radius: 50%;
    -webkit-box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
    box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
    max-width: 5em;
    position: absolute;
    top: -30px;
    left: 50%;
    margin-left: -30px;
}
.card-content {
    padding: 3.5rem;
}
</style>
