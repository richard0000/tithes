<template>
   <div>
      <section class="hero is-info">
         <div class="hero-body">
            <div class="container has-text-centered">
               <h1 class="title is-size-1">
                  Nuevo Diezmo
               </h1>
            </div>
         </div>
      </section>
      <section class="section">
         <div class="container">
            <div class="tabs is-centered is-fullwidth is-large">
               <ul>
                  <li :class="{'is-active': step == 1}" @click="step = 1">
                     <a>Miembro</a>
                  </li>
                  <li :class="{'is-active': step == 2}" @click="step = 2">
                     <a>Fecha</a>
                  </li>
                  <li :class="{'is-active': step == 3}" @click="step = 3">
                     <a>Monto</a>
                  </li>
                  <li :class="{'is-active': step == 4}" @click="step = 4">
                     <a>Revisar y Confirmar</a>
                  </li>
               </ul>
            </div>
            <div class="columns">
              <div class="column is-one-fifth">
                  <a class="button is-large is-rounded" @click="step--; if(step < 1){ step = 1}">
                      <font-awesome-icon icon="arrow-left">
                      </font-awesome-icon>
                  </a>
              </div>
              <div class="column has-text-centered">
                <div class="member" v-show="step === 1">
                   <div class="box">
                      <div class="columns">
                         <div class="column">
                            <h2 class='is-large is-size-2'>Agregar Miembro</h2>
                         </div>
                      </div>
                      <div class="columns">
                         <div class="column">
                            <div class="select is-rounded is-size-4">
                               <select v-model="selectedMember.id" @click="searchMember(selectedMember.id)">
                                  <option v-for="member in members" v-bind:value="member.id">{{ member.name + ' ' + member.surname }}</option>
                               </select>
                            </div>
                         </div>
                      </div>
                      <div class="columns">
                        <div class="column">
                          <p>Si la persona no está en la lista, puede agregarla aqu&iacute;</p>
                        </div>
                      </div>
                      <div class="columns">
                        <div class="column">
                          <router-link :to="`/new-member`">
                              <a class="button is-success is-rounded">
                                  <font-awesome-icon icon="plus">
                                  </font-awesome-icon>
                              </a>
                          </router-link>
                        </div>
                      </div>
                   </div>
                </div>

                <div class="date" v-show="step === 2">
                   <div class="box">
                      <div class="columns">
                         <div class="column">
                            <h2 class='is-large is-size-2'>Agregar Fecha</h2>
                         </div>
                      </div>
                      <div class="columns">
                        <div class="column">
                          <datepicker :config="{ wrap: false }" v-model="selectedDate" class="has-text-centered is-size-4" readonly>
                          </datepicker>
                        </div>
                      </div>
                    </div>
                </div>

                <div class="amount" v-show="step === 3">
                   <div class="box">
                      <div class="columns">
                         <div class="column">
                            <h2 class='is-large is-size-2'>Agregar Monto</h2>
                         </div>
                      </div>
                      <div class="columns">
                        <div class="column">
                          <div class="input-group">
                            <div class="field has-addons">
                              <p class="control">
                                <span class="select is-size-4">
                                  <select>
                                    <option>$</option>
                                  </select>
                                </span>
                              </p>
                              <p class="control is-expanded">
                                <input class="input is-size-4" type="number" value="1000" min="0" step="0.01" data-number-to-fixed="2" data-number-stepfactor="100" placeholder="Monto en pesos" v-model="selectedAmount" v-on:keyup.enter="step++">
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>

                <div class="review" v-show="step === 4">
                   <div class="box">
                      <div class="columns">
                         <div class="column">
                            <h2 class='is-large is-size-2'>Revisar y Confirmar</h2>
                         </div>
                      </div>
                    </div>
                    <a class="button is-primary is-rounded" href="#btnSubmitNewTithe">
                     <font-awesome-icon icon="arrow-down">
                     </font-awesome-icon>
                    </a>
                </div>
              </div>
              <div class="column is-one-fifth has-text-right">
                  <a class="button is-large is-rounded" @click="step++; if(step > 4){ step = 4}">
                      <font-awesome-icon icon="arrow-right">
                      </font-awesome-icon>
                  </a>
              </div>
            </div>
         </div>
      </section>

      <section class="section" id="results" v-if="((selectedMember.id)||(message !== ''))">
        <div class="box has-background-info">
          <div class="columns">
            <div class="column">
              <div class="media-content has-text-centered">
                <p class="subtitle article-title has-text-white">
                   Datos informados hasta el momento
                </p>
              </div>
            </div>
          </div>

          <div class="columns">

            <div class="column">
              <div class="card article" v-if="selectedMember.id">
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
                             {{ selectedMember.name }}
                          </p>
                          <p class="title article-title">
                             {{ selectedMember.surname }}
                          </p>
                       </div>
                    </div>
                 </div>
              </div>
            </div>

            <div class="column" v-if="selectedDate">
              <div class="card article" v-if="selectedMember.id">
                 <div class="card-content">
                    <div class="media">
                       <div class="media-content has-text-centered">
                          <p class="title article-title">
                             {{ selectedDate }}
                          </p>
                       </div>
                    </div>
                 </div>
              </div>
            </div>

            <div class="column" v-if="selectedAmount !== 0">
              <div class="card article" v-if="selectedMember.id">
                 <div class="card-content">
                    <div class="media">
                       <div class="media-content has-text-centered">
                          <p class="title article-title">
                             {{ '$ ' + selectedAmount }}
                          </p>
                       </div>
                    </div>
                 </div>
              </div>
            </div>

          </div>

          <div class="columns" v-show="message !== ''">
            <div class="column">
              <b-notification has-icon>
                <p class="is-size-4">{{ message }}</p>
              </b-notification>
            </div>
          </div>
        </div>
      </section>

      <section class="section" v-show="step === 4" id="btnSubmitNewTithe">
        <div class="control has-text-centered">
          <a :class="{'is-loading': completed}" class="button is-large is-primary" @click="submitTithe">Aceptar</a>
        </div>
      </section>
   </div>
</template>
<script>
import { mapState } from 'vuex'
import Datepicker from 'vue-bulma-datepicker'
export default {
  components: {
    Datepicker
  },
  data() {
    return {
      step: 1,
      selectedDate: null,
      selectedAmount: 0,
      message: '',
      completed: false
    }
  },
  beforeMount() {
    this.$store.dispatch('loadMembers')
  },
  mounted() {
    if(this.selectedMember.name) {
      this.step = 2
    }
  },
  methods: {
  	searchMember(memberId) {
      if(memberId !== 0){
    		this.$store.dispatch('loadMember', { id: memberId })
      }
  	},
    fromIsValid() {
      if(this.selectedMember.id == 0) {
        this.message = 'Por favor, seleccione un miembro'
        this.step = 1
        return false
      }
      if((this.selectedDate == null)||(this.selectedDate == NaN)) {
        this.message = 'Por favor, seleccione una fecha válida'
        this.step = 2
        return false
      }
      if(new Date(this.selectedDate) > new Date()){
        this.message = 'La fecha no puede ser mayor a hoy!'
        this.step = 2
        return false
      }
      if(this.selectedAmount == 0) {
        this.message = 'Por favor, ingrese un monto mayor a cero'
        this.step = 3
        return false
      }

      this.complete = true;
      return this.complete
    },
    submitTithe() {
      if(this.fromIsValid()) {
        this.$store.dispatch('pushNewTithe', { 
          user_id: parseInt(this.selectedMember.id),
          amount: parseFloat(this.selectedAmount),
          date: this.selectedDate,
        }).
          then(() => this.$store.dispatch('quitSelectedMember').
            then(() => this.$router.push('/tithes')))
          .catch((response) => this.message = response)
      }
    }
  },
  computed: mapState({
    members: state => state.members,
    selectedMember: state => state.selectedMember
  })
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
.card {
	margin-top: 3em;
  height: 10em;
}
</style>
