<template>
   <div>
      <section class="hero is-info">
         <div class="hero-body">
            <div class="container has-text-centered">
               <h1 class="title is-size-1">
                  Nuevo de Diezmo
               </h1>
            </div>
         </div>
      </section>
      <section class="section">
         <div class="container">
            <div class="tabs is-centered is-fullwidth is-large">
               <ul>
                  <li :class="{'is-active': step == 'member'}" @click="step = 'member'">
                     <a>Miembro</a>
                  </li>
                  <li :class="{'is-active': step == 'date'}" @click="step = 'date'">
                     <a>Fecha</a>
                  </li>
                  <li :class="{'is-active': step == 'amount'}" @click="step = 'amount'">
                     <a>Monto</a>
                  </li>
                  <li :class="{'is-active': step == 'review'}" @click="step = 'review'">
                     <a>Review</a>
                  </li>
               </ul>
            </div>
            <div class="columns">
               <div class="column is-half is-offset-one-quarter has-text-centered">
                  <div class="member" v-show="step === 'member'">
                     <div class="box">
                        <div class="columns">
                           <div class="column">
                              <h2 class='is-large is-size-2'>Agregar Miembro</h2>
                           </div>
                        </div>
                        <div class="columns">
                           <div class="column">
                              <div class="select is-rounded">
                                 <select v-model="currentMemberId" @click="searchMember(currentMemberId)">
                                    <option v-for="member in members" v-bind:value="member.id">{{ member.name }}</option>
                                 </select>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div class="date" v-show="step === 'date'">
                     <div class="box">
                        <div class="columns">
                           <div class="column">
                              <h2 class='is-large is-size-2'>Agregar Fecha</h2>
                           </div>
                        </div>
                        <div class="columns">
                          <div class="column">
                            <datepicker :config="{ wrap: false }" v-model="selectedDate" class="has-text-centered" readonly>
                            </datepicker>
                          </div>
                        </div>
                      </div>
                  </div>

                  <div class="amount" v-show="step === 'amount'">
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
                                  <span class="select">
                                    <select>
                                      <option>$</option>
                                    </select>
                                  </span>
                                </p>
                                <p class="control is-expanded">
                                  <input class="input" type="number" value="1000" min="0" step="0.01" data-number-to-fixed="2" data-number-stepfactor="100" placeholder="Monto en pesos" v-model="selectedAmount">
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>

                  <div class="review" v-show="step === 'review'">
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
            </div>
         </div>
      </section>

      <section class="section" id="results" v-if="selectedMember.name">
        <div class="columns box has-background-info">

          <div class="column">
            <div class="card article" v-if="currentMemberId">
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
                     </div>
                  </div>
               </div>
            </div>
          </div>

          <div class="column" v-if="selectedDate">
            <div class="card article" v-if="currentMemberId">
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
            <div class="card article" v-if="currentMemberId">
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
      </section>

      <section class="section" v-show="step === 'review'" id="btnSubmitNewTithe">
        <div class="control has-text-centered">
          <a class="button is-large is-primary" @click="submitTithe">Aceptar</a>
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
      step: 'member',
      currentMemberId: 0,
      selectedDate: null,
      selectedAmount: 0
    }
  },
  beforeMount() {
    this.$store.dispatch('loadMembers')
  },
  methods: {
  	searchMember(memberId) {
  		this.$store.dispatch('loadMember', { id: memberId })
  	},
    validateBeforeSubmit() {
      if(this.currentMemberId == 0) {
        return false
      }
      if(this.selectedDate == null) {
        return false
      }
      if(this.selectedAmount == 0) {
        return false
      }
    },
    submitTithe() {
      if(this.validateBeforeSubmit()) {
        this.$store.dispatch('pushNewTithe', { 
          user_id: parseInt(this.currentMemberId),
          amount: parseFloat(this.selectedAmount),
          date: this.selectedDate,
        }).
            then(() => this.$router.push('/tithes'))
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
