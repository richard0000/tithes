<style scoped="">

.avatar img {
    padding: 5px;
    background: #fff;
    border-radius: 50%;
    -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, .1), 0 0 0 1px rgba(10, 10, 10, .1);
    box-shadow: 0 2px 3px rgba(10, 10, 10, .1), 0 0 0 1px rgba(10, 10, 10, .1);
    max-width: 5em;
}

</style>

<template>

<div>
    <section class="hero is-info">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="columns">
                    <div class="column">
                        <h1 class="title is-size-1" v-if="selectedDate.month.id">
                                Diezmos de {{ months[(parseInt(selectedDate.month.id) - 1).toString()].name }} - <span v-if="selectedDate.year.id"> {{ selectedDate.year.id }} </span>
                            </h1>
                    </div>
                    <div class="column is-one-fifth">
                      <div class="tile is-ancestor has-text-centered">
                          <div class="tile is-parent">
                              <article class="tile is-child">
                                  <p class="title">{{ totalAmount }}</p>
                                  <p class="subtitle">Total del mes</p>
                              </article>
                          </div>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="hero is-light">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="columns">
                    <div class="column is-offset-one-fifth is-one-fifth has-text-centered">
                        <h1 class="title is-size-4">Filtros</h1>
                    </div>
                    <div class="column is-one-fifth has-text-centered">
                        <div class="select is-rounded is-size-6" v-if="selectedDate.month.id !== null">
                            <select v-model="selectedDate.month.id" @click="reloadTithes()">
                                <option v-for="month in months" v-bind:value="month.id">{{ month.name }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="column is-one-fifth has-text-centered">
                        <div class="select is-rounded is-size-6" v-if="selectedDate.year.id !== null">
                            <select v-model="selectedDate.year.id" @click="reloadTithes()">
                                <option v-for="year in years" v-bind:value="year.id">{{ year.name }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="column is-one-fifth has-text-centered">
                      <a v-bind:class="{'is-loading' : downloading, 'button is-info is-rounded' : true}" @click="downloadTithes()">
                          <font-awesome-icon icon="download">
                          </font-awesome-icon>
                      </a>
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
                            <div class="columns">
                              <router-link :to="`member/${tithe.member.id}/tithes`" class="column">
                                    <figure class="avatar">
                                        <!-- <img v-bind:src="tithe.member.location"> -->
                                        <img src="../assets/male.png">
                                        </img>
                                    </figure>
                              </router-link>
                                <router-link :to="`tithes/${tithe.id}`" class="column">
                                      <p class="title is-size-3">
                                          {{ tithe.member.name }}
                                      </p>
                                      <p class="subtitle">
                                          {{ localeDate(tithe.date, 'es-AR') }}
                                      </p>
                                      <p class="title is-size-3">
                                          {{ '$ ' + Math.round(tithe.amount) }}
                                      </p>
                              </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

</template>

<script>

import {
    mapState
}
from 'vuex'
export default {
    data() {
        return {
            selectedDate: {
                year: {
                    id: null,
                    name: null
                },
                month: {
                    id: null,
                    name: null
                }
            },
            totalAmount: null,
            downloading: false
        }
    },
    computed: mapState({
        tithes: state => state.tithes,
        years: state => state.availableDates.years,
        months: state => state.availableDates.months
    }),
    beforeMount() {
        this.$store.dispatch('loadAvailableDates').then(() => {
                this.setDates()
            })
            .then(() => this.reloadTithes())
    },
    methods: {
        localeDate: function(aDate, aLocale) {
            let options = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };
            let theDate = new Date(aDate);

            return theDate.toLocaleDateString(aLocale, options);
        },
        setDates() {
            this.selectedDate.year.id = (new Date()).getFullYear().toString()
            this.selectedDate.month.id = ((new Date()).getMonth() + 1).toString()
        },
        reloadTithes() {
          this.$store.dispatch('loadTithes', { date: this.selectedDate })
            .then(() => this.setTithesTotalAmount())
        },
        setTithesTotalAmount() {
              let total = 0
              let cantTithes = this.tithes.length
              for ( let i = 0; i < cantTithes; i++ ) {
                  total += parseFloat(this.tithes[i]["amount"])
              }
          this.totalAmount =  total
        },
        downloadTithes() {
          this.downloading = true;
          this.$store.dispatch('loadPDFTithes', { date: this.selectedDate })
          this.downloading = false;
        }
    }
}

</script>
