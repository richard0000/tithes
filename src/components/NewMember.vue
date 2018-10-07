<template>
  <div>
    <section class="hero is-info">
       <div class="hero-body">
          <div class="container has-text-centered">
             <h1 class="title is-size-1">
                Agregando un nuevo miembro
             </h1>
          </div>
       </div>
    </section>
    <section class="section">
       <div class="container">
          <div class="tabs is-centered is-fullwidth is-large">
             <ul>
                <li :class="{'is-active': step === 1}" @click="step = 1">
                   <a>Nombre y Apellido</a>
                </li>
                <li :class="{'is-active': step === 2}" @click="step = 2">
                   <a>Mas Datos Personales</a>
                </li>
                <li :class="{'is-active': step === 3}" @click="step = 3">
                   <a>Datos de Equipo</a>
                </li>
                <li :class="{'is-active': step === 4}" @click="step = 4">
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
                            <h2 class='is-large is-size-2'>Nombre y Apellido</h2>
                         </div>
                      </div>
                      <div class="columns">
                         <div class="column">
                          <p class="control is-expanded">
                            <input class="input is-size-4" type="text" placeholder="Nombre" v-model="member.name">
                          </p>
                         </div>
                      </div>
                      <div class="columns">
                         <div class="column">
                          <p class="control is-expanded">
                            <input class="input is-size-4" type="text" placeholder="Apellido" v-model="member.surname" v-on:keyup.enter="step++">
                          </p>
                         </div>
                      </div>
                   </div>
                </div>

                <div class="amount" v-show="step === 2">
                   <div class="box">
                      <div class="columns">
                         <div class="column">
                            <h2 class='is-large is-size-2'>Mas Datos Personales</h2>
                         </div>
                      </div>
                      <div class="columns">
                        <div class="column">
                          <p class="control is-expanded">
                            <input class="input is-size-4" type="text" placeholder="Direccion" v-model="member.address">
                          </p>
                         </div>
                      </div>
                      <div class="columns">
                         <div class="column">
                          <p class="control is-expanded">
                            <input class="input is-size-4" type="text" placeholder="Telefono" v-model="member.phone1">
                          </p>
                         </div>
                      </div>
                      <div class="columns">
                         <div class="column">
                            <datepicker :config="{ wrap: false }" placeholder="Fecha de nacimiento" v-model="member.birthday" class="has-text-centered is-size-4" readonly>
                            </datepicker>
                         </div>
                      </div>
                    </div>
                </div>

                <div class="date" v-show="step === 3">
                   <div class="box">
                      <div class="columns">
                         <div class="column">
                            <h2 class='is-large is-size-2'>Equipo</h2>
                         </div>
                      </div>
                      <div class="columns">
                        <div class="column">
                          Próximamente...
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
      member: {}
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped="">

</style>
