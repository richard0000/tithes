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
	          <div class="column is-half is-offset-one-quarter">

	            <div class="member" v-show="step === 'member'">
	              <h2 class='is-large'>Agregar Miembro</h2>
	            </div>

	            <div class="date" v-show="step === 'date'">
	              <h2>Agregar Fecha</h2>
	            </div>

	            <div class="amount" v-show="step === 'amount'">
	              <h2>Agregar Monto</h2>
	            </div>

	            <div class="review" v-show="step === 'review'">
	              <h2>Revisar y Confirmar</h2>
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
      step: 'name'
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped="">

</style>
