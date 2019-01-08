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
                            <h1 class="title is-size-1" v-if="selectedMonth">
                                Diezmos de {{ months[(parseInt(selectedMonth) - 1).toString()].name }} -
                                <span v-if="selectedYear">
                                    {{ selectedYear }}
                                </span>
                            </h1>
                        </div>
                        <div class="column is-one-fifth">
                            <div class="tile is-ancestor has-text-centered">
                                <div class="tile is-parent">
                                    <article class="tile is-child">
                                        <p class="title">
                                            {{ totalAmount }}
                                        </p>
                                        <p class="subtitle">
                                            Total del mes
                                        </p>
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
                            <h1 class="title is-size-4">
                                Filtros
                            </h1>
                        </div>
                        <div class="column is-one-fifth has-text-centered">
                            <div class="select is-rounded is-size-6" v-if="selectedMonth !== null">
                                <select @change="setMonth()" v-model="selectedMonth">
                                    <option v-bind:value="month.id" v-for="month in months">
                                        {{ month.name }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="column is-one-fifth has-text-centered">
                            <div class="select is-rounded is-size-6" v-if="selectedYear !== null">
                                <select @change="setYear()" v-model="selectedYear">
                                    <option v-bind:value="year.id" v-for="year in years">
                                        {{ year.name }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="column is-one-fifth has-text-centered">
                            <a @click="downloadTithes()" v-bind:class="{'is-loading' : downloading, 'button is-info is-rounded' : true}">
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
            selectedYear: null,
            selectedMonth: null,
            totalAmount: null,
            downloading: false
        }
    },
    computed: mapState({
        tithes: state => state.tithes,
        years: state => state.availableDates.years,
        months: state => state.availableDates.months,
        selectedDate: state => state.selectedDate,
        availableDates: state => state.availableDates
    }),
    beforeMount() {
        this.$store.dispatch('loadAvailableDates')
            .then(() => this.setDates())
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
            if((!this.selectedDate.year.id)||(!this.selectedDate.month.id)) {
                this.selectedDate.year.id = this.availableDates.years[this.availableDates.years.length - 1].id
                this.selectedDate.month.id = this.availableDates.months[this.availableDates.months.length - 1].id
            }
            this.selectedYear = this.selectedDate.year.id;
            this.selectedMonth = this.selectedDate.month.id;
        },
        setYear() {
          let sYear = this.selectedYear
          this.$store.dispatch('prepareSelectedYear', { year: sYear })
            .then(() => this.reloadTithes())
        },
        setMonth() {
          let sMonth = this.selectedMonth
          this.$store.dispatch('prepareSelectedMonth', { month: sMonth })
            .then(() => this.reloadTithes())
        },
        reloadTithes() {
          let sYear = this.selectedYear;
          let sMonth = this.selectedMonth;

          this.$store.dispatch('loadTithes', { date: {
              year: {
                id: sYear
              },
              month: {
                id: sMonth
              }
            } 
          })
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
