<template>
  <v-card>
    <div class="dialog-container1">
      <div class="agregar-producto-terminado-container10">
        <v-card-title>
          <span class="paginaprincipal-text">Agregar nuevo producto</span>
        </v-card-title>
      </div>
      <div class="space">
      </div>
      <v-form>
        <v-text-field type="text" v-model="nombre" label="Nombre producto terminado">
        </v-text-field>
        <v-text-field type="text" v-model="SKU" label="Código SKU">
        </v-text-field>
      </v-form>
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
      <div class="space3"></div>
      <div class="agregar-producto-terminado-container10">
        <v-btn type="submit" color="primary" large class="mr-4" @click="evaluar()">
          Agregar producto terminado
        </v-btn>
      </div>
      <div class="agregar-producto-terminado-container5">
        <v-dialog v-model="dialogUpdate3" max-width="600px">
          <v-card>
            <div class="dialog-container1">
              <v-card-title class="popUp">
                <span class="text-h5">Por favor ingrese un nombre del producto</span>
              </v-card-title>
            </div>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogUpdate4" max-width="600px">
          <v-card>
            <div class="dialog-container1">
              <v-card-title class="popUp">
                <span class="text-h5">Por favor ingrese el código SKU</span>
              </v-card-title>
            </div>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogUpdate4_2" max-width="600px">
          <v-card>
            <div class="dialog-container1">
              <v-card-title class="popUp">
                <span class="text-h5">El código SKU ingresado ya ha sido utilizado</span>
              </v-card-title>
            </div>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogUpdate5" max-width="600px">
          <v-card>
            <div class="dialog-container1">
              <v-card-title class="popUp">
                <span class="text-h5">Por favor ingrese al menos 1 materia prima o insumo</span>
              </v-card-title>
            </div>
          </v-card>
        </v-dialog>
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
    async evaluar() {
      try {
        let query2 = await db3
          .where("sku", "==", this.SKU)
          .get();
        if (this.nombre == '')
          this.dialogUpdate3 = true;
        else if (this.SKU == '')
          this.dialogUpdate4 = true;
        else if (query2.size != 0) {
          this.dialogUpdate4_2 = true;
        }
        else {
          const datos = this.evaluarRefactoring()
          const MateriasPrimasAsociadas = datos[0];
          const InsumosAsociados = datos[1];
          let numMP = datos[2];
          let numIN = datos[3];
          const indicesMP = datos[4];
          const indicesI = datos[5];
          if (numMP == 0 && numIN == 0) {
            this.dialogUpdate5 = true;
          }
          else {
            await db3.doc().set({
              nombre: this.nombre,
              sku: this.SKU,
              MateriasPrimasAsociadas: MateriasPrimasAsociadas,
              InsumosAsociados: InsumosAsociados,
              indiceI: indicesI,
              indiceMP: indicesMP
            });
            this.$emit('updateData', this.SKU);
            this.nombre = "";
            this.SKU = "";
          }

        }
      } catch (error) {
        console.log(error);
      }
    },
    evaluarRefactoring(){
      const MateriasPrimasAsociadas = [];
      const InsumosAsociados = [];
      let numMP = 0;
      let numIN = 0;
      const indicesMP = [];
      const indicesI = [];
      let index;
      for (index in this.mp) {
        if (this.mp[index].cantidad == null) {
          this.mp[index].cantidad = 0;
        }
        if (this.mp[index].estado && this.mp[index].cantidad != 0) {
          MateriasPrimasAsociadas.push({ CantMateriaPrima: this.mp[index].cantidad, idMP: this.mp[index].id })
          indicesMP.push(this.mp[index].id);
          numMP++;
        }
        if (this.mp[index].estado || this.mp[index].cantidad != 0) {
          this.mp[index].cantidad = 0;
          this.mp[index].estado = false;
        }
      }
      let index1;
      for (index1 in this.ins) {
        if (this.ins[index1].cantidad == null) {
          this.ins[index1].cantidad = 0;
        }
        if (this.ins[index1].estado && this.ins[index1].cantidad != 0) {
          InsumosAsociados.push({ CantidadInsumo: this.ins[index1].cantidad, idI: this.ins[index1].id })
          indicesI.push(this.ins[index1].id);
          numIN++;
        }
        if (this.ins[index1].estado || this.ins[index1].cantidad != 0) {
          this.ins[index1].cantidad = 0;
          this.ins[index1].estado = false;
        }
      }
      return [MateriasPrimasAsociadas, InsumosAsociados, numMP, numIN, indicesMP, indicesI]
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
