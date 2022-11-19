<template>
  <v-app>
    <v-app-bar
      app
      dark
    >
    <v-tabs  fixed-tabs>
        <v-tab
        v-for="(item,index) in rutas" :key="index"
        target="_blank"
        text
        @click="insertarRuta(item.ruta)"
        >
        <span class="mr-2">{{item.nombre}}</span>
        </v-tab>
      </v-tabs>
      <div v-if="validar()">
        <v-btn color="red"  @click="salir">
          <v-icon dark left>mdi-account-arrow-left-outline</v-icon>Salir</v-btn>
      </div>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import {ref} from 'vue'
import Login from './components/Login.vue'
//import {useAuth} from '@vueuse/firebase'
import {auth} from './utils/firebase'
import router from './router'
export default {
  name: 'App',
  components:{Login},
  /*setup(){
    //console.log(useAuth())
      //const {isAuthenticated, user} =useAuth();
      const usuario = auth.currentUser;
      const ingreso=ref(true);
      console.log(usuario)
      if (!usuario){
        ingreso.value=false
      }
      console.log(ingreso.value)
      const salir = async()=> {
        try {
          await auth.signOut();
          router.push('/Login');
          //ingreso.value=false;
        } catch (error) {
          console.log(error)
        }
      }
      return { ingreso, salir};
    
  },*/
  data: () => ({
    rutas:[
      {nombre: 'Página principal', ruta:'/'},
      {nombre: 'Insumos', ruta:'/insumo'},
      {nombre: 'Materias primas', ruta:'/materiaprima'},
      {nombre: 'Producto terminado', ruta:'/productoTerminado'}
    ],
    ingreso: false,
  }),
  mounted() {
        this.recargar('/')  
  },
  methods: {
    recargar(ruta) {
        return router.push(ruta);
    },
    async salir () {
      try {
        await auth.signOut();
        this.ingreso=false;
        router.push('/Login');
      } catch (error) {
        console.log(error)
      }
    },
    validar(){
        const usuario = auth.currentUser;
        //console.log(usuario)
        if (usuario!=null){
          this.ingreso=true;
        }
        return this.ingreso;
    },
    insertarRuta(ruta){
      router.push(ruta);
    }
  }
};
</script>
