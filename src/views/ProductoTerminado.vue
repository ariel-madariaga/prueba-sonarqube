<template>
  <div class="producto-terminado-container">
    <div class="producto-terminado-container1">
      <v-data-table :headers="headers" :items="pr" :search="search" class="elevation-1 blue lighten-5">
        <template v-slot:top>
          <v-toolbar flat>
            <span class="paginaprincipal-text"><span>Productos terminados</span></span>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-btn type="submit" color="primary" large class="mr-4" @click="agregarPT()">
              Crear producto <br /> terminado
            </v-btn>
          </v-toolbar>
          <v-toolbar flat>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar en productos terminados" single-line
              hide-details>
            </v-text-field>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="delete1Producto(item)">
            mdi-delete
          </v-icon>
          <v-icon small @click="mostrarFormula(item)">
            mdi-information
          </v-icon>
        </template>
      </v-data-table>
      <v-dialog v-model="dialogDelete" max-width="690px">
        <v-card>
          <div class="dialog-container1">
            <v-card-title class="text-h5">¿Estas seguro que deseas eliminar este producto?</v-card-title>
            <v-container>
              <v-form>
                <v-text-field type="text" v-model="justification"
                  label="¿A que se debe la eliminación de este producto?">
                </v-text-field>
              </v-form>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="deleteProducto">Eliminar</v-btn>
              <v-btn color="blue darken-1" text @click.stop="dialogDelete = false">Cancelar</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </div>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogAPT" max-width="1000px">
        <AgregarProductoTerminado @updateData="agregarNuevoProducto"></AgregarProductoTerminado>
      </v-dialog>


      <v-dialog v-model="dialogPendientes" max-width="600px">
        <v-card>
          <div class="dialog-container1">
            <v-card-title class="text-h5">Lo sentimos, el producto se encuentra en la lista de <br />pendientes y no puede ser eliminado</v-card-title>
          </div>
        </v-card>
      </v-dialog>



      <v-dialog v-if="dialogFormula" v-model="dialogFormula" max-width="1000px">
        <v-card>
          <div class="dialog-container1">
            <v-card-title class="formula-titulo-text">Fórmula asociada</v-card-title>
            <div class="agregar-producto-terminado-container2">
              <div class="producto-terminado-container8">
                <span class="text-h5 blue--text">
                  {{ this.nombrePT }}
                </span>
                <div class="space"></div>
              </div>
              <div class="producto-terminado-container9">
                <span class="text-h5 blue--text">
                  {{ this.skuPT }}
                </span>
              </div>
            </div>
            <div class="table2-container1">
              <v-container class="container-tabla1">
                <!--TABLA MATERIAS PRIMAS AL REVISAR FORMULAS-->
                <v-data-table :headers="headers1" :items="mp" :items-per-page="15" :search="search1"
                  class="elevation-1 blue lighten-5">
                  <template v-slot:top>
                    <v-toolbar flat>
                      <span class="formula-titulo-text1"><span>Materias primas</span></span>
                      <v-divider class="mx-4" inset vertical></v-divider>
                      <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-toolbar flat>
                      <v-text-field v-model="search1" append-icon="mdi-magnify" label="Buscar materia prima" single-line
                        hide-details></v-text-field>
                    </v-toolbar>
                  </template>
                </v-data-table>
              </v-container>
              <v-container class="container-tabla2">
                <!--TABLA INSUMOS AL REVISAR FORMULAS-->
                <v-data-table :headers="headers2" :items="ins" :items-per-page="15" class="elevation-2 blue lighten-5"
                  :search="search2">
                  <template v-slot:top>
                    <v-toolbar flat>
                      <span class="formula-titulo-text1"><span>Insumos</span></span>
                      <v-divider class="mx-4" inset vertical></v-divider>
                      <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-toolbar flat>
                      <v-text-field v-model="search2" append-icon="mdi-magnify" label="Buscar Insumo" single-line
                        hide-details>
                      </v-text-field>
                    </v-toolbar>
                  </template>
                </v-data-table>
              </v-container>
            </div>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" color="primary" large class="mr-4" @click.stop="dialogFormula = false">Volver
              </v-btn>
              <v-btn type="submit" color="primary" large class="mr-4" @click.stop="editarFormula">Editar
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </div>
        </v-card>
      </v-dialog>

      <!-- POP UP PARA EDITAR LA FORMULA-->
      <v-dialog v-if="dialogFormulaEditar" v-model="dialogFormulaEditar" max-width="1000px">
        <v-card>
          <div class="dialog-container1">
            <v-card-title class="formula-titulo-text">Editar formula de {{ this.nombrePT }}</v-card-title>
              <EditarFormula @updateData="agregarNuevoProducto"></EditarFormula>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" color="primary" large class="mr-4" @click.stop="dialogFormulaEditar = false">Volver
              </v-btn>
              <!--El boton aceptar hay que modificarlo para que se guarden los cambios-->
              <v-btn type="submit" color="primary" large class="mr-4" @click.stop="dialogFormulaEditar = false">Aceptar
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </div>
        </v-card>
      </v-dialog>


    </div>
    <div class="producto-container3"></div>
  </div>
</template>

<script>
import AgregarProductoTerminado from '../components/AgregarProductoTerminado.vue';
import EditarFormula from '../components/EditarFormula.vue';

import firebase from "../utils/firebase.js";
const db = firebase.collection("ProductoTerminado");
const dbMP = firebase.collection("MateriasPrimas");
const dbI = firebase.collection("Insumos");
const dbPend = firebase.collection("productosPendientes");


export default {
  name: "ProductoTerminado",
  props: {},
  components: { AgregarProductoTerminado, EditarFormula },
  data: () => ({
    search: '',
    pr: [],
    justification: "",
    headers: [
      {
        text: "SKU",
        align: "start",
        value: 'sku',
        class: "blue darken-1 white--text"
      },
      { text: 'Producto', value: 'nombre', class: "blue darken-1 white--text" },
      { text: 'Acción', value: 'actions', class: "blue darken-1 white--text" },
    ],
    headers1: [

      { text: "Materia Prima", value: "NombreMateriaPrima", class: "blue darken-1 white--text" },
      { text: 'Código', align: "start", value: 'codigoMP', class: "blue darken-1 white--text" },
      { text: "Cantidad (mL)", value: "CantMateriaPrima", class: "blue darken-1 white--text" },
    ],
    headers2: [
      { text: "Insumo", align: "start", value: "NombreInsumo", class: "blue darken-1 white--text" },
      { text: 'Código', align: "start", value: 'codigoI', class: "blue darken-1 white--text" },
      { text: "Cantidad (unidades)", value: "CantidadInsumo", class: "blue darken-1 white--text" },
    ],
    nombre: '',
    sku: null,
    dialogDelete: false,
    dialogFormula: false,
    dialogFormulaEditar: false,
    dialogAPT: false,
    dialogPendientes: false,
    idN: null,
    idTabla: null,
    search1: '',
    search2: '',
    ins: [],
    mp: [],
    nombrePT: null,
    skuPT: null,
  }),
  mounted() {
    this.getProductos();
    //this.asignarATablaMPeI();
  },
  methods: {
    asignarATablaMPeI() {
            try {
                
                
                mp.forEach(element => {
                const index = self.mp.findIndex(item => { return item.NombreMateriaPrima == element.NombreMateriaPrima });
                if (index != -1) {
                    //console.log(element)
                    self.mp[index].cantidad = self.mp[index].cantidad + element.CANTIDAD
                    self.mp[index].estado = true
                } else {
                  console.log("aaaaaaaaaa")
                    //self.productosNoAgregados = self.productosNoAgregados + '[' + element.NOMBRE + ' ' + element.SKU + '] en [' + sheetName + '] no fue agregado.\n'
                }
                });
                /*if (self.productosNoAgregados != '') {
                    alert(self.productosNoAgregados)
                }*/
                
            } catch (e) {
                console.error(e);
            }

      },

    async agregarNuevoProducto(valor) {
      this.dialogAPT = false;
      let query = await db
        .where("sku", "==", valor)
        .get();
      query.forEach(doc => {
        let productoData = doc.data();
        productoData.id = doc.id;
        this.pr.unshift(productoData);
      })
    },

    insertarRuta(ruta) {
      this.$router.push(ruta);
    },
    //Se obtinenen los productos de la base de datos
    async getProductos() {
      try {
        const snapshot = await db.get();
        const productos = [];
        snapshot.forEach(doc => {
          let productoData = doc.data();
          productoData.id = doc.id;
          productos.push(productoData);
        })
        this.pr = productos;

      } catch (error) {
        console.log(error);
      }
    },
    async delete1Producto(item) {
      console.log(1234);
      let query = await dbPend
      .where("id", "==", item.id)
      .get();
      console.log(query.size)
      if(query.size != 0){
        this.dialogPendientes = true;
        console.log("aaaaaa")}
      else{
      this.idN = item.id;
      this.idTabla = this.pr.indexOf(item);
      this.dialogDelete = true;
      }
    },
    async deleteProducto() {
      try {
        await db.doc(this.idN).delete();
        this.pr.splice(this.idTabla, 1);
        this.getProductos();
        this.dialogDelete = false;
      } catch (error) {
        console.log(error);
      }
    },
    mostrarFormula(item) {
      this.mp = [];
      this.ins = [];
      this.dialogFormula = true;
      this.nombrePT = item.nombre;
      this.skuPT = item.sku;
      item.MateriasPrimasAsociadas.forEach( async elemento => {
        let query1 = await dbMP.doc(elemento.idMP).get();
        let mAsociada = {
          NombreMateriaPrima: query1.data().nombre,
          codigoMP: query1.data().codigo,
          CantMateriaPrima: elemento.CantMateriaPrima,
        }
        this.mp.push(mAsociada)
      });
      item.InsumosAsociados.forEach(async elemento => {
        let query2 = await dbI.doc(elemento.idI).get();
        let iAsociada = {
          NombreInsumo: query2.data().nombre,
          codigoI: query2.data().codigo,
          CantidadInsumo: elemento.CantidadInsumo,
        }
        this.ins.push(iAsociada)
      });
    },
    agregarPT() {
      this.dialogAPT = true;
    },
    editarFormula() {
      this.dialogFormulaEditar = true;
    },
    
  },
};
</script>

<style scoped>
.producto-terminado-container {
  width: 100%;
  display: flex;
  overflow: auto;
  min-height: 100vh;
  transition: 0.3s;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 40px;
}

.producto-terminado-nombre-container {
  width: 100%;
  display: flex;
  overflow: auto;
  min-height: 5vh;
  justify-content: left;
}

.producto-terminado-container1 {
  flex: 1;
  display: flex;
  align-self: center;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.producto-terminado-container2 {
  display: flex;
  align-items: center;
  padding-top: 50px;
  padding-left: 0px;
  justify-content: center;
}

.producto-terminado-button {
  color: rgb(255, 255, 255);
  font-size: 22px;
  transition: 0.3s;
  padding-top: 10px;
  border-width: 0px;
  padding-left: 40px;
  border-radius: 20px;
  padding-right: 40px;
  padding-bottom: 10px;
  background-color: rgb(142, 70, 227);
}

.eliminar-producto-terminado-button {
  color: rgb(255, 255, 255);
  font-size: 22px;
  transition: 0.3s;
  padding-top: 10px;
  border-width: 0px;
  padding-left: 40px;
  border-radius: 20px;
  padding-right: 40px;
  padding-bottom: 10px;
  background-color: rgb(255, 255, 255);
}

.producto-terminado-button:hover {
  background-color: #4656e3;
}


.eliminar-producto-terminado-button:hover {
  background-color: #fff;
}

.space {
  width: 500px;
  height: auto;
  display: inline-block;
}

.titulo-pagina-text01 {
  color: rgba(0, 0, 0, 1);
  width: 900px;
  height: auto;
  position: absolute;
  font-size: 22px;
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

.producto-container3 {
  height: 100px;

}

.producto-terminado-text {
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


.formula-titulo-text {
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  text-align: center;
  align-self: center;
  align-items: center;
}

.formula-titulo-text1 {
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  text-align: center;
  align-self: center;
  align-items: center;
}

.dialog-container1 {
  display: flex;
  align-items: center;
  padding-top: 40px;
  flex-direction: column;
  padding-bottom: 40px;
  justify-content: flex-start;
}

.agregar-producto-terminado-container2 {
  display:flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding-left: 10px;
  padding-right: 10px;
}



.table2-container1 {
  width: 100%;
  display: flex;
  align-items: center, flex-start;
  justify-content: center;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 20px;
}
</style>

