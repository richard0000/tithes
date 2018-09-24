<template>
    <div>
        <section class="hero is-info">
            <div class="hero-body">
                <div class="container has-text-centered">
                    <div class="colums">
                        <div class="column">
                            <h1 class="title is-size-1">
                                Diezmos del Mes
                            </h1>
                        </div>
                        <div class="column">
                            <router-link :to="`new`">
                                <a class="button is-light is-rounded">
                                    <font-awesome-icon icon="plus">
                                    </font-awesome-icon>
                                </a>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="section">
            <div class="container">
                <div class="card" v-bind:key="tithe.id" v-for="tithe in tithes">
                    <div class="card-content">
                        <div class="columns">
                            <div class="column is-four-fifths">
                                <router-link :to="`tithes/${tithe.id}`">
                                    <div class="columns">
                                        <div class="column">
                                            <figure class="avatar">
                                                <!-- <img v-bind:src="tithe.member.location"> -->
                                                <img src="../assets/male.png">
                                                </img>
                                            </figure>
                                        </div>
                                        <div class="column is-half">
                                            <p class="title is-size-3">
                                                {{ tithe.member.name }}
                                            </p>
                                            <p class="subtitle">
                                                {{ localeDate(tithe.date, 'es-AR') }}
                                            </p>
                                        </div>
                                        <div class="column">
                                            <p class="title is-size-3">
                                                {{ '$ ' + tithe.amount }}
                                            </p>
                                        </div>
                                    </div>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: mapState({
    tithes: state => state.tithes
  }),
  beforeMount() {
    this.$store.dispatch('loadTithes')
  },
  methods: {
    localeDate: function(aDate, aLocale){
      let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      let theDate = new Date(aDate);

      return theDate.toLocaleDateString(aLocale, options);
    },
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
}
</style>
