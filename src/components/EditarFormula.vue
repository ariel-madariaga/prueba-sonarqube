<template>
    <v-card>
      <div class="dialog-container1">
        <div class="agregar-producto-terminado-container3">
          <v-data-table :headers="headers1" :items="mp" :items-per-page="5" :search="search1"
            class="elevation-1 blue lighten-5">
            <template v-slot:top>
              <v-toolbar flat>
                <span class="paginaprincipal-text1"><span>Seleccionar materias primas</span></span>
                <v-divider class="mx-4" inset vertical></v-divider>
              </v-toolbar>
              <v-toolbar flat>
                <v-text-field v-model="search1" append-icon="mdi-magnify" label="Buscar materia prima" single-line
                  hide-details></v-text-field>
              </v-toolbar>
            </template>
            <template v-slot:[`item.cantidad`]="{ item }">
              <v-text-field v-model.number="item.cantidad" background-color="transparent" hide-details single-line solo
                flat placeholder="Cant." type="number" min="0" oninput="validity.valid||(value='');" />
            </template>
            <template v-slot:[`item.estado`]="{ item }">
              <v-simple-checkbox v-model="item.estado"></v-simple-checkbox>
            </template>
          </v-data-table>
          <div class="space2"></div>
          <v-data-table :headers="headers2" :items="ins" :items-per-page="5" class="elevation-2 blue lighten-5"
            :search="search2">
  
            <template v-slot:top>
              <v-toolbar flat>
                <span class="paginaprincipal-text1"><span>Seleccionar insumos</span></span>
                <v-divider class="mx-3" inset vertical></v-divider>
              </v-toolbar>
              <v-toolbar flat>
                <v-text-field v-model="search2" append-icon="mdi-magnify" label="Buscar Insumo" single-line hide-details>
                </v-text-field>
              </v-toolbar>
            </template>
            <template v-slot:[`item.cantidad`]="{ item }">
              <v-text-field v-model.number="item.cantidad" background-color="transparent" hide-details single-line solo
                flat placeholder="Cant." type="number" min="0" oninput="validity.valid||(value='');" />
            </template>
            <template v-slot:[`item.estado`]="{ item }">
              <v-simple-checkbox v-model="item.estado"></v-simple-checkbox>
            </template>
          </v-data-table>
        </div>
      </div>
    </v-card>
  </template>
  
  <script>
  import firebase from "../utils/firebase.js";
  const db1 = firebase.collection("Insumos");
  const db2 = firebase.collection("MateriasPrimas");
  const db3 = firebase.collection("ProductoTerminado");
  export default {
    name: "AgregarProductoTerminado",
    props: {},
    data: () => ({
      search1: '',
      search2: '',
      mp: [],
      ins: [],
      cantidadI: null,
      SKU: '',
      nombre: '',
      cantidadMP: null,
      dialogUpdate1: false,
      dialogUpdate2: false,
      dialogUpdate3: false,
      dialogUpdate4: false,
      dialogUpdate4_2: false,
      dialogUpdate5: false,
      insumoU: {},
      mpU: {},
      estado: false,
      headers1: [
  
        { text: "Materias Primas", align: "start", value: "nombre", class: "blue darken-1 white--text" },
        { text: 'Código', value: 'codigo', class: "blue darken-1 white--text" },
        { text: "Cantidad (mL)", value: "cantidad", class: "blue darken-1 white--text" },
        { text: "Seleccionar", value: "estado", class: "blue darken-1 white--text" },
      ],
      headers2: [
        { text: "Insumos", align: "start", value: "nombre", class: "blue darken-1 white--text" },
        { text: 'Código', value: 'codigo', class: "blue darken-1 white--text" },
        { text: "Cantidad (unidades)", value: "cantidad", class: "blue darken-1 white--text" },
        { text: "Seleccionar", value: "estado", class: "blue darken-1 white--text" },
      ],
  
    }),
    mounted() {
      this.getMP();
      this.getI();
    },
    methods: {
      async getI() {
        try {
          const snapshot = await db1.get();
          const insumos = [];
          snapshot.forEach(doc => {
            let insumoData = doc.data();
            insumoData.id = doc.id;
            insumoData.cantidad = 0;
            insumoData.estado = false;
            insumos.push(insumoData);
          })
          this.ins = insumos;
  
        } catch (error) {
          console.log(error);
        }
      },
      async getMP() {
        try {
          const snapshot = await db2.get();
          const materias = [];
          snapshot.forEach(doc => {
            let materiasData = doc.data();
            materiasData.cantidad = 0;
            materiasData.estado = false;
            materiasData.id = doc.id;
            materias.push(materiasData);
          });
            this.mp = materias;
  
        } catch (error) {
          console.log(error);
        }
      },
      editMP(item) {
        this.mpU = item;
        this.dialogUpdate1 = true;
        if (item.cantidad != 0)
          this.cantidadMP = item.cantidad;
        else
          this.cantidadMP = null;
      },
      editInsumo(item) {
        this.insumoU = item;
        this.dialogUpdate2 = true;
        if (item.cantidad != 0)
          this.cantidadI = item.cantidad;
        else
          this.cantidadI = null;
      },
      insertarRuta(ruta) {
        this.$router.push(ruta);
      },
    }
  };
  </script>
  
  <style scoped>
  .agregar-producto-terminado-container {
    width: 100%;
    display: flex;
    overflow: auto;
    min-height: 100vh;
    align-items: flex-end;
    flex-direction: column;
    justify-content: flex-start;
  }
  
  .agregar-producto-terminado-container1 {
    width: 100%;
    display: flex;
    position: relative;
    align-items: flex-end;
    flex-direction: column;
    justify-content: flex-start;
    align-self: center;
  }
  
  .agregar-producto-terminado-container2 {
    flex: 1;
    width: 800px;
    display: flex;
    align-self: center;
    padding-top: 50px;
    flex-direction: row;
    padding-bottom: 10px;
    justify-content: flex-start;
  }
  
  .agregar-producto-terminado-container8 {
    padding-right: 0px;
  }
  
  .agregar-producto-terminado-container9 {
    padding-left: 0px;
  }
  
  .agregar-producto-terminado-text {
    font-size: 28px;
    font-style: normal, Bold;
    text-align: left;
    font-weight: 700;
    padding-top: 0px;
    padding-bottom: 10px;
    color: rgba(0, 0, 0, 1);
    width: 900px;
    align-self: auto;
    line-height: normal;
    font-stretch: normal;
    margin-right: 0;
    margin-bottom: 0;
  }
  
  .agregar-producto-terminado-textinput {
    width: 420px;
    font-size: 22px;
    padding-top: 10px;
    border-color: #006fff;
    border-width: 3px;
    padding-left: 1rem;
    border-radius: 10px;
    padding-right: 1rem;
    padding-bottom: 10px;
  }
  
  .agregar-producto-terminado2-textinput {
    width: 300px;
    font-size: 22px;
    padding-top: 10px;
    border-color: #006fff;
    border-width: 3px;
    padding-left: 1rem;
    border-radius: 10px;
    padding-right: 1rem;
    padding-bottom: 10px;
  }
  
  .agregar-producto-terminado-container3 {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-left: 10px;
    padding-right: 10px;
  }
  
  .agregar-producto-terminado-container5 {
    flex: 1;
    width: 100%;
    display: flex;
    align-items: center;
    padding-bottom: 100px;
    justify-content: center;
  }
  
  .elevation-1 {
    margin-top: 20px;
  }
  
  .elevation-2 {
    margin-top: 20px;
  }
  
  .space {
    height: 20px;
  }
  
  .space2 {
    width: 50px;
  }
  
  .space3 {
    height: 50px;
  }
  
  .popUp {
    align-items: center;
    justify-content: center;
  }
  
  .container-tabla1 {
    padding-left: 100px;
    padding-right: 100px;
  }
  
  .container-tabla2 {
    padding-left: 100px;
    padding-right: 100px;
    align-items: flex-start;
  }
  
  .dialog-container1 {
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 40px;
  }
  
  .paginaprincipal-text {
    color: rgba(0, 0, 0, 1);
    width: 900px;
    height: auto;
    position: absolute;
    font-size: 32px;
    align-self: auto;
    font-style: Bold;
    text-align: left;
    font-weight: 700;
    line-height: normal;
    font-stretch: normal;
    margin-right: 0;
    margin-bottom: 0;
    text-decoration: none;
  }
  
  .paginaprincipal-text1 {
    font-size: 25px;
    font-style: normal;
    font-weight: 700;
    text-align: center;
    align-self: center;
    align-items: center;
  }
  
  .agregar-producto-terminado-container10 {
    text-align: center;
  }
  </style>
  