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
                <div class="colums">
                    <div class="column">
                        <h1 class="title is-size-1" v-if="selectedDate.month.id">
                                Diezmos de {{ months[selectedDate.month.id].name }} - <span v-if="selectedDate.year.id"> {{ selectedDate.year.id }} </span>
                            </h1>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="hero is-light">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="colums">
                    <div class="column is-one-quarter">
                        <h1 class="title is-size-4">
                                Filtros
                            </h1>
                    </div>
                    <div class="column">
                        <div class="select is-rounded is-size-4" v-if="selectedDate.year.id !== null">
                            <select v-model="selectedDate.year.id">
                                <option v-for="year in years" v-bind:value="year.id">{{ year.name }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="column">
                        <div class="select is-rounded is-size-4" v-if="selectedDate.month.id !== null">
                            <select v-model="selectedDate.month.id">
                                <option v-for="month in months" v-bind:value="month.id">{{ month.name }}</option>
                            </select>
                        </div>
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
            }
        }
    },
    computed: mapState({
        tithes: state => state.tithes,
        years: state => state.availableDates.years,
        months: state => state.availableDates.months
    }),
    beforeMount() {
        this.$store.dispatch('loadAvailableDates').then(() => {
                this.$store.dispatch('loadTithes')
            })
            .then(() => this.setDates())
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
            this.selectedDate.year.id = "2018"
            this.selectedDate.month.id = "10"
        }
    }
}

</script>
