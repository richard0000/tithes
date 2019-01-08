<template>
    <div>
        <section class="hero is-info">
            <div class="hero-body">
                <div class="container has-text-centered">
                    <h1 class="title is-size-1">
                        Diezmos de {{ member.name }}
                    </h1>
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
                            <div class="select is-rounded is-size-6" v-if="selectedDate.year.id !== null">
                                <select @click="reloadTithes()" v-model="selectedDate.year.id">
                                    <option v-bind:value="year.id" v-for="year in years">
                                        {{ year.name }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
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
                                    </img>
                                </figure>
                            </div>
                            <div class="media-content has-text-centered">
                                <apexchart :options="options" :series="series" type="bar">
                                </apexchart>
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
  data() {
    return {
      selectedDate: {
          year: {
              id: null,
              name: null
          }
      },
      options: {
        chart: {
          id: 'anual-member-tithes'
        },
        xaxis: {
          categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        }
      },
      series: [{
        name: 'tithes-by-month',
        data: [],
      }]
    }
  },
  beforeMount() {
    this.$store.dispatch('loadMember', { id: parseInt(this.$route.params.id) })
        .then(() => {
          this.loadUserTithes();
        })
  },
  methods: {
    localeDate: function(aDate, aLocale) {
      let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      let theDate = new Date(aDate);

      return theDate.toLocaleDateString(aLocale, options);
    },
    loadUserTithes() {
      this.$store.dispatch('loadAvailableDatesForUser', { id: parseInt(this.$route.params.id) }).then(() => {
              this.setDates()
          })
          .then(() => this.setDates())
          .then(() => this.reloadTithes());
    },
    reloadTithes() {
      this.$store.dispatch('loadMemberTithes', { id: parseInt(this.$route.params.id) , date: this.selectedDate })
        .then(() => this.computeTithesForGraph());
    },
    setDates() {
      this.selectedDate.year.id = this.years[this.years.length - 1].id;
    },
    computeTithesForGraph() {
      function determineMonth(tithe) {
        return new Date(tithe.created_at).getMonth() + 1;
      };

      let tithes = this.memberTithes,
      response = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      i = 0,
      currMonth = 1,
      monthAmount = 0;

      while(i < tithes.length) {
        monthAmount = 0;
        let month = determineMonth(tithes[i]);

        while((i < tithes.length)&&(month === currMonth)) {
          monthAmount += parseFloat(tithes[i].amount);
          i++;
          if(tithes[i]){
            month = determineMonth(tithes[i]);
          }
        }

        response[currMonth - 1] = monthAmount;
        currMonth++;
      }
      
      this.series[0].data = response;
    }
  },
  computed: {
    member() {
      return this.$store.state.selectedMember;
    },
    memberTithes() {
      return this.$store.state.selectedMemberTithes;
    },
    years() {
      return this.$store.state.availableDatesForUser.years;
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
