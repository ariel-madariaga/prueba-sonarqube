<coverage version="1">
  <file path="xources/hello/NoConditions.xoo">
    <lineToCover lineNumber="6" covered="true"/>
    <lineToCover lineNumber="7" covered="false"/>
  </file>
  <file path="xources/hello/WithConditions.xoo">
    <lineToCover lineNumber="3" covered="true" branchesToCover="2" coveredBranches="1"/>
  </file>
</coverage>

<template>
  <div class="pagina-principal-container">
    <div class="pagina-principal-container1">
      <v-dialog v-model="dialogFormula" max-width="1000px">
          <formulaAsociada :itemDetails="itemDetails"  v-on:child-to-parent="okDialogFormula"></formulaAsociada>
      </v-dialog>
      <v-dialog v-model="dialogAddProductoPendiente" max-width="800px">
        <v-card>
          <div class="agregar-producto-pendiente-container2">
            <span class="agregar-producto-pendiente-text">
              Agregar productos pendientes
            </span>
          </div>
          <template>
            <div>
              <div class="agregar-producto-pendiente-container4">
                <v-data-table :headers="headers1" :items="productoPendientes" :items-per-page="5" :search="search"
                  item-key="sku " class="elevation-1 blue lighten-5" checkbox-color="blue darken-3">
                  <template v-slot:top>
                    <v-toolbar flat>
                      <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details>
                      </v-text-field>
                    </v-toolbar>

                  </template>
                  <template v-slot:[`item.cantidad`]="{ item }">
                    <v-text-field v-model.number="item.cantidad" background-color="transparent" hide-details single-line
                      solo flat placeholder="Cantidad" type="number" min="0" oninput="validity.valid||(value='');" />
                  </template>
                  <template v-slot:[`item.estado`]="{ item }">
                    <v-simple-checkbox v-model="item.estado"></v-simple-checkbox>
                  </template>
                </v-data-table>
              </div>
            </div>
          </template>
          <div class="agregar-producto-pendiente-container3">
            <div class="agregar-producto-pendiente-container5">
              <v-file-input show-size type="file" chips truncate-length="10" id="file_upload"></v-file-input>
              <v-btn color="primary" dark class="mb-2" @click="upload">
                Subir
              </v-btn>
            </div>
            <button @click="cerrarVentanaAddProductoPendiente" class="agregar-producto-pendiente-button button">
              Agregar producto pendiente
            </button>
          </div>

        </v-card>
      </v-dialog>
      <div class="pagina-principal-container2">
        <button class="agregar-producto-terminado-button button mb-4" @click="abrirVentanaAddProductoPendiente">
          Agregar producto pendiente
        </button>
        <v-container class="container-tabla1">
          <v-data-table :headers="headersPendientes" :items-per-page="5" :items="productosPendientes" :search="search1"
            class="elevation-1 blue lighten-5">
            <template v-slot:top>
              <v-toolbar flat>
                <span class="paginaprincipal-text"><span>Productos pendientes</span></span>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-btn color="primary" dark class="mb-2" @click="enviarAFinalizados()">
                  Finalizar
                </v-btn>
                <v-dialog v-model="dialog" max-width="500px">
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field type="number" v-model.number="editedItem.cantidad" label="Cantidad">
                            </v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">
                        Cancel
                      </v-btn>
                      <v-btn color="blue darken-1" text @click="save">
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="740px">
                  <v-card>
                    <div class="dialog-container1">
                      <v-card-title class="text-h5">¿Estás seguro que deseas eliminar el producto pendiente?
                      </v-card-title>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </div>
                  </v-card>
                </v-dialog>
              </v-toolbar>

              <v-toolbar flat>
                <v-text-field v-model="search1" append-icon="mdi-magnify" label="Buscar en productos pendientes"
                  single-line hide-details>
                </v-text-field>
              </v-toolbar>
            </template>
            <template v-slot:[`item.estado`]="{ item }">
              <v-simple-checkbox v-model="item.estado" @mousedown="clickeado(item.estado)"></v-simple-checkbox>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)">
                mdi-delete
              </v-icon>
              <v-icon small @click="mostrarFormula(item)">
                mdi-information
              </v-icon>
            </template>

          </v-data-table>
        </v-container>

        <v-container class="container-tabla1">
          <v-data-table :headers="headersFinalizados" :items-per-page="5" :items="productosFinalizados"
            sort-by="Producto" class="elevation-1 blue lighten-5">
            <template v-slot:top>
              <v-toolbar flat>
                <span class="paginaprincipal-text"><span>Productos finalizados</span></span>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-btn color="primary" dark class="mb-2" @click="deleteCollectionFinalizados">
                  limpiar
                </v-btn>
                <v-dialog v-model="dialog" max-width="500px">
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field type="number" v-model.number="editedItem.cantidad" label="Cantidad">
                            </v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="save">
                        Guardar
                      </v-btn>
                      <v-btn color="blue darken-1" text @click="close">
                        Cancelar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="740px">
                  <v-card>
                    <div class="dialog-container1">
                    <v-card-title class="text-h5">¿Estás seguro que deseas eliminar el producto pendiente?
                    </v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="deleteItemConfirm">Eliminar</v-btn>
                      <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </div>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogNoneSelect" max-width="440px">
                  <v-card>
                    <div class="dialog-container1">
                      <v-card-title class="text-h5">Debe seleccionar un producto</v-card-title>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="okNoneSelect">OK</v-btn>
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </div>
                  </v-card>
                </v-dialog>

                <v-dialog v-model="dialogSuperaStock" max-width="600px">
                  <v-card>
                    <div class="dialog-container1">
                      <v-card-title class="text-h5">Los siguientes productos no deben <br />superar el stock para ser
                        Finalizados:<br /><br />
                        <ul v-for="(item) in textDialogSuperaStock">
                          {{ item.nombre }}
                        </ul></v-card-title>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="okSuperaStock">OK</v-btn>
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </div>
                  </v-card>
                </v-dialog>

              </v-toolbar>
            </template>
          </v-data-table>
        </v-container>
      </div>
      <div class="pagina-principal-container5">
        <div class="pagina-principal-container6">
          <span class="pagina-principal-text06">Avisos</span>
          <v-list color="rgb(255, 0, 0, 0)">
            <v-list-item v-for="(alerta, i) in alertas" :key="i">
              <v-alert class="alertas" elevation="2" light :type=alerta.type>
                <div >
                <div id="texto">{{alerta.text1 }}<strong>{{alerta.nombre }}</strong>{{alerta.text2 }}<br></div>
                <div id="texto-uno">consumo: {{ alerta.consumo }}  </div>
                <div id="texto-dos">stock: {{ alerta.cantidad }}</div>
              </div>
                <v-progress-linear :value=alerta.porcentaje color="blue darken-1" ></v-progress-linear>
              </v-alert>
            </v-list-item>
          </v-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import formulaAsociada from '../components/formulaAsociada.vue';
import firebase from "../utils/firebase.js";
const db = firebase.collection("ProductoTerminado");
const dbMP = firebase.collection("MateriasPrimas");
const dbI = firebase.collection("Insumos");

import * as XLSX from 'xlsx/xlsx.mjs';
export default {
  name: "pruebaCrud",
  components: {formulaAsociada},
  props: {},
  data: () => {
    return {
      search: '',
      search1: '',
      productoPendientes: [],
      alertas: [],
      materiasDeProductosPendientes: [],
      insumosDeProductosPendientes: [],
      headers1: [
        {
          text: "SKU",
          align: "start",
          sortable: false,
          value: "sku",
          class: "blue darken-1 white--text"
        },
        { text: "Producto terminado", value: "nombre", class: "blue darken-1 white--text" },
        { text: "Cantidad (Unidades)", value: "cantidad", class: "blue darken-1 white--text" },
        { text: "Seleccionar", value: "estado", class: "blue darken-1 white--text" },
      ],
      DbProductosPendientes: "productosPendientes",
      DbProductosFinalizados: "productosFinalizados",
      DbInsumos: "Insumos",
      DbMateriasPrimas: "MateriasPrimas",
      textDialogSuperaStock: [],
      productosPendientes: [],
      productosFinalizados: [],
      Nombre: "",
      Cantidad: 0,
      contadorSelected: 0,
      dialog: false,
      dialogDelete: false,
      dialogNoneSelect: false,
      dialogAddProductoPendiente: false,
      dialogSuperaStock: false,
      dialogFormula: false,
      headersPendientes: [
        { text: "Producto terminado", value: "nombre", class: "blue darken-1 white--text" },
        { text: "SKU", value: "sku", class: "blue darken-1 white--text" },
        { text: "Cantidad (Unidades)", value: "cantidad", class: "blue darken-1 white--text" },
        { text: 'Acción', value: 'actions', sortable: false, class: "blue darken-1 white--text" },
        { text: 'Seleccionar', value: 'estado', sortable: false, class: "blue darken-1 white--text" },
      ],
      headersFinalizados: [
        { text: "Producto terminado", value: "nombre", class: "blue darken-1 white--text" },
        { text: "SKU", value: "sku", class: "blue darken-1 white--text" },
        { text: "Cantidad (Unidades)", value: "cantidad", class: "blue darken-1 white--text" },
      ],
      editedIndex: -1,
      editedItem: {
        id: '',
        nombre: '',
        cantidad: null,
        sku: '',
        estado: null,
      },
      defaultItem: {
        id: '',
        nombre: '',
        cantidad: null,
        sku: '',
        estado: null,
      },
      itemDetails:{
        ins: null,
        mp: null,
        nombrePT: null,
        skuPT: null,
    },
    };
  },
  computed: {
    formTitle() {
      return 'Modificar cantidad'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
    dialogNone(val) {
      val || this.okNoneSelect()
    },
    dialogAddProductoPendiente(val) {
      val || this.okNoneSelect()
    },
    dialogSuperaStock(val) {
      val || this.okSuperaStock()
    }
  },
  created() {
    this.getAllPP(this.DbProductosPendientes, this.productosPendientes);
    this.getAllPF(this.DbProductosFinalizados, this.productosFinalizados);
  },
  methods: {
    okSuperaStock() {
      this.dialogSuperaStock = false
    },
    async getInsumo(baseDatosName, documentoId) {
      try {
        await firebase.collection(baseDatosName).doc(documentoId).get().then((doc) => {
          this.insumoAux = doc.data();
        });
      } catch (error) {
        console.log(error);
      }
    },
    descuentoTentativo2() {
      this.materiasDeProductosPendientes = [];
      this.insumosDeProductosPendientes = [];
      this.productosPendientes.forEach(producto => {
        producto.InsumosAsociados.forEach(insumo => {
          const index = this.insumosDeProductosPendientes.findIndex(item => { return item.idI == insumo.idI });
          if (index > -1) {
            const arreglo = this.insumosDeProductosPendientes[index].idProductos;
            arreglo.push(producto.id);
            Object.assign(this.insumosDeProductosPendientes[index],
              {
                idProductos: arreglo,
                consumo: this.insumosDeProductosPendientes[index].consumo + producto.cantidad * insumo.CantidadInsumo,
              })
          } else {
            this.insumosDeProductosPendientes.push({
              idProductos: [producto.id],
              nombre: insumo.NombreInsumo,
              idI: insumo.idI,
              consumo: producto.cantidad * insumo.CantidadInsumo,
            })
          }
        })
        producto.MateriasPrimasAsociadas.forEach(materia => {
          const index = this.materiasDeProductosPendientes.findIndex(item => { return item.idMP == materia.idMP });
          console.log({ index: index, materia: materia.NombreMateriaPrima, id: producto.id })
          if (index > -1) {
            const arreglo = this.materiasDeProductosPendientes[index].idProductos;
            arreglo.push(producto.id);
            Object.assign(this.materiasDeProductosPendientes[index],
              {
                idProductos: arreglo,
                consumo: this.materiasDeProductosPendientes[index].consumo + producto.cantidad * materia.CantMateriaPrima,
              })

          } else {
            this.materiasDeProductosPendientes.push({
              idProductos: [producto.id],
              nombre: materia.NombreMateriaPrima,
              idMP: materia.idMP,
              consumo: producto.cantidad * materia.CantMateriaPrima,
            })
          }
        })
      })
      console.log(this.insumosDeProductosPendientes)
      console.log(this.materiasDeProductosPendientes)
    },
    agregarAlertas() {
      this.alertas = [];
      this.insumosDeProductosPendientes.forEach(async insumo => {
        let insumoAux;
        await firebase.collection(this.DbInsumos).doc(insumo.idI).get().then((doc) => {
          insumoAux = doc.data();
          insumoAux.id = doc.id;
        });
        if ((insumoAux.cantidad - insumo.consumo) < 0) { //el gasto supera el stock
          this.alertas.push({
            nombre: insumoAux.nombre,
            text1: " Se superó el stock del insumo ",
            text2: "",
            type: "error",
            id: insumoAux.id,
            cantidad: insumoAux.cantidad,
            consumo: insumo.consumo,
            porcentaje: 100,
          })
          insumo.idProductos.forEach(productoId => {
            const index = this.productosPendientes.findIndex(item => { return item.id == productoId });
            Object.assign(this.productosPendientes[index],
              {
                bloqueado: true,
              })
          })
        } else if ((insumoAux.cantidad - insumo.consumo) == 0) { //el gasto supera el stock
          this.alertas.push({
            nombre: insumoAux.nombre,
            text1: " El stock del insumo ",
            text2: " esta en 0",
            type: "warning",
            id: insumoAux.id,
            cantidad: insumoAux.cantidad,
            consumo:insumo.consumo,
            porcentaje:100,
          })
        }
        else if ((insumoAux.cantidad - insumo.consumo) <= insumoAux.limite) { //supera el limite
          this.alertas.push({
            nombre: insumoAux.nombre,
            text1: " La cantidad del insumo ",
            text2: " es muy baja",
            type: "warning",
            id: insumoAux.id,
            cantidad: insumoAux.cantidad,
            consumo:insumo.consumo,
            porcentaje:insumo.consumo%100,
          })
        }
      })
      this.materiasDeProductosPendientes.forEach(async materia => {
        let materiaAux;
        await firebase.collection(this.DbMateriasPrimas).doc(materia.idMP).get().then((doc) => {
          materiaAux = doc.data();
          materiaAux.id = doc.id;
        });
        if ((materiaAux.cantidad - materia.consumo) < 0) { //el gasto supera el stock
          this.alertas.push({
            nombre: materiaAux.nombre,
            text1: " Se superó el stock de la materia prima ",
            text2: "",
            type: "error",
            id: materiaAux.id,
            cantidad: materiaAux.cantidad,
            consumo:materia.consumo,
            porcentaje:100,
          })
          materia.idProductos.forEach(productoId => {
            const index = this.productosPendientes.findIndex(item => { return item.id == productoId });
            Object.assign(this.productosPendientes[index],
              {
                bloqueado: true,
              })
          })
        } else if ((materiaAux.cantidad - materia.consumo) == 0) { //el gasto supera el stock
          this.alertas.push({
            nombre: materiaAux.nombre,
            text1: " El stock de la materia prima ",
            text2: " esta en 0",
            type: "warning",
            id: materiaAux.id,
            cantidad: materiaAux.cantidad,
            consumo:materia.consumo,
            porcentaje:100,
          })
        }
        else if ((materiaAux.cantidad - materia.consumo) <= materiaAux.limite) { //supera el limite
          this.alertas.push({
            nombre: materiaAux.nombre,
            text1: " La cantidad de materia prima ",
            text2: " es muy baja",
            type: "warning",
            id: materiaAux.id,
            cantidad: materiaAux.cantidad,
            consumo:materia.consumo,
            porcentaje:materia.consumo%100,
          })
        }
      })
      console.log(this.productosPendientes);
    },
    async getAllPP(baseDatosName, elementos) {

      try {
        const snapshot = await firebase.collection(baseDatosName).get();
        snapshot.forEach(doc => {
          let elementoData = doc.data();
          elementoData.id = doc.id;
          elementos.push(elementoData);
        })
        this.descuentoTentativo2();
        this.agregarAlertas();
      } catch (error) {
        console.log(error);
      }
    },
    async getAllPF(baseDatosName, elementos) {

      try {
        const snapshot = await firebase.collection(baseDatosName).get();
        snapshot.forEach(doc => {
          let elementoData = doc.data();
          elementoData.id = doc.id;
          elementos.push(elementoData);
        })
      } catch (error) {
        console.log(error);
      }
    },
    async getProductoTerminados() {
      try {
        const snapshot = await db.get();
        const productoPendientes = [];
        snapshot.forEach(doc => {
          let productoPendienteData = doc.data();
          productoPendienteData.cantidad = 0;
          productoPendienteData.id = doc.id;
          productoPendienteData.estado = false;
          productoPendienteData.bloqueado = false;
          productoPendientes.push(productoPendienteData);
        })
        this.productoPendientes = productoPendientes;

      } catch (error) {
        console.log(error);
      }
    },
    async updateProductoPendiente(baseDatosName, documento) {
      try {
        console.log(documento.id)
        console.log(documento.cantidad)
        await firebase.collection(baseDatosName).doc(documento.id).update({
          cantidad: documento.cantidad,
        })
      } catch (error) {
        console.log(error);
      }
    },
    async deleteProductoPendiente(baseDatosName, documento) {
      try {
        await firebase.collection(baseDatosName).doc(documento.id).delete();
      } catch (error) {
        console.log(error);
      }
    },
    editItem(item) {

      this.editedIndex = this.productosPendientes.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.productosPendientes.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm() {
      this.deleteProductoPendiente(this.DbProductosPendientes, this.editedItem)
      this.productosPendientes.splice(this.editedIndex, 1)
      this.descuentoTentativo2();
      this.agregarAlertas();
      this.closeDelete()
    },
    async mostrarFormula(item) {
      this.dialogFormula = true;
      this.itemDetails.nombrePT = item.nombre;
      this.itemDetails.skuPT = item.sku;
      this.itemDetails.mp = [];
      this.itemDetails.ins = [];
      item.MateriasPrimasAsociadas.forEach( async elemento => {
        let query1 = await dbMP.doc(elemento.idMP).get();
        let mAsociada = {
          NombreMateriaPrima: query1.data().nombre,
          codigoMP: query1.data().codigo,
          CantMateriaPrima: elemento.CantMateriaPrima,
        }
        this.itemDetails.mp.push(mAsociada)
      });
      item.InsumosAsociados.forEach(async elemento => {
        let query2 = await dbI.doc(elemento.idI).get();
        let iAsociada = {
          NombreInsumo: query2.data().nombre,
          codigoI: query2.data().codigo,
          CantidadInsumo: elemento.CantidadInsumo,
        }
        this.itemDetails.ins.push(iAsociada)
      });
    },
    close() {
      console.log("CLOOSE")

      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        this.updateProductoPendiente(this.DbProductosPendientes, this.editedItem)
        Object.assign(this.productosPendientes[this.editedIndex], this.editedItem)
      } else {
        this.productosPendientes.push(this.editedItem)
      }
      this.descuentoTentativo2();
      this.agregarAlertas();
      this.close()
    },
    seleccionarItem(item) {
      //this.productosPendientes.indexOf(item)
      console.log(item)
    },
    superaStockFuncion() {
      this.textDialogSuperaStock = [];
      this.productosPendientes.forEach(producto => {
        if (producto.estado && producto.bloqueado) {
          this.dialogSuperaStock = true;
          this.textDialogSuperaStock.push(producto);
        }
      })
    },
    enviarAFinalizados() {
      this.superaStockFuncion()
      if (this.contadorSelected == 0) {
        this.dialogNoneSelect = true;
      }
      else {
        this.productosPendientes.forEach(
          async (producto) => {
            if (producto.estado && !producto.bloqueado) {
              try {
                await firebase.collection(this.DbProductosFinalizados).add(producto)
                await firebase.collection(this.DbProductosPendientes).doc(producto.id).delete();
                this.productosFinalizados.push(producto);
                this.editedIndex = this.productosPendientes.indexOf(producto)
                this.productosPendientes.splice(this.editedIndex, 1)
                this.descuentoDefinitivo(producto);
                this.$nextTick(() => {
                  this.editedItem = Object.assign({}, this.defaultItem)
                  this.editedIndex = -1
                })
              } catch (error) {
                console.log(error);
              }
            }
          }
        );
        this.descuentoTentativo2();
        this.agregarAlertas();
      }
    },
    descuentoDefinitivo(producto) {
      producto.InsumosAsociados.forEach(async insumo => {
        let insumoAux;
        await firebase.collection(this.DbInsumos).doc(insumo.idI).get().then((doc) => {
          insumoAux = doc.data();
          insumoAux.id = doc.id;
        });
        await firebase.collection(this.DbInsumos).doc(insumo.idI).update({
          cantidad: insumoAux.cantidad - producto.cantidad * insumo.CantidadInsumo,
        })
      })
      producto.MateriasPrimasAsociadas.forEach(async materia => {
        let materiaAux;
        await firebase.collection(this.DbMateriasPrimas).doc(materia.idMP).get().then((doc) => {
          materiaAux = doc.data();
          materiaAux.id = doc.id;
        });
        await firebase.collection(this.DbMateriasPrimas).doc(materia.idMP).update({
          cantidad: materiaAux.cantidad - producto.cantidad * materia.CantMateriaPrima,
        })

      })
    },
    okNoneSelect() {
      console.log("aprete una vez el check")
      this.dialogNoneSelect = false
    },
    okDialogFormula(value) {
      alert('from child' + value );
      this.dialogFormula = value
    },
    clickeado(estado) {
      //if (estado) {
        this.contadorSelected = this.contadorSelected - 1;
      //} else {
        //this.contadorSelected = this.contadorSelected - 1;
      //} Ver esto, ya que es un bug porque se repite lo mismo
    },
    abrirVentanaAddProductoPendiente() {
      this.getProductoTerminados()
      this.dialogAddProductoPendiente = true;
    },
    cerrarVentanaAddProductoPendiente() {
      this.productoPendientes.forEach(
        async (producto) => {
          if (producto.estado) {
            try {
              producto.estado = false;
              await firebase.collection(this.DbProductosPendientes).add(producto)
            } catch (error) {
              console.log(error);
            }
          }
        }
      );
      this.productosPendientes = [];
      this.getAllPP(this.DbProductosPendientes, this.productosPendientes);
      this.dialogAddProductoPendiente = false;
    },
    async deleteCollectionFinalizados() {
      // Get a new write batch
      try {
        const snapshot = await firebase.collection(this.DbProductosFinalizados).get()
        snapshot.forEach(elemento => {
          firebase.collection(this.DbProductosFinalizados).doc(elemento.id).delete()
        })
        this.productosFinalizados = []
      } catch (error) {
        console.log(error);
      }
    },
    insertarRuta(ruta) {
      this.$router.push(ruta);
    },
    upload() {
      let files = document.getElementById('file_upload').files;
      if (files.length == 0) {
        alert("Please choose any file...");
        return;
      }
      let filename = files[0].name;
      let extension = filename.substring(filename.lastIndexOf(".")).toUpperCase();
      if (extension == '.XLS' || extension == '.XLSX') {
        //this.activarCarga()
        this.excelFileToJSON(files[0]);
        //this.desactivarCarga()
        console.log('sali de cargar')
      } else {
        alert("Please select a valid excel file.");
      }
    },
    excelFileToJSON(file) {
      try {
        let reader = new FileReader();
        reader.readAsBinaryString(file);
        let self = this;
        reader.onload = function (e) {

          let data = e.target.result;
          let workbook = XLSX.read(data, {
            type: 'binary'
          });
          self.productosNoAgregados = '';
          workbook.SheetNames.forEach(function (sheetName) {
            let roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
            roa.forEach(element => {
              const index = self.productoPendientes.findIndex(item => { return item.sku == element.SKU });
              if (index != -1) {
                //console.log(element)
                self.productoPendientes[index].cantidad = self.productoPendientes[index].cantidad + element.CANTIDAD
                self.productoPendientes[index].estado = true
              } else {
                self.productosNoAgregados = self.productosNoAgregados + '[' + element.NOMBRE + ' ' + element.SKU + '] en [' + sheetName + '] no fue agregado.\n'
              }
            })

          });
          if (self.productosNoAgregados != '') {
            alert(self.productosNoAgregados)
          }
        }
      } catch (e) {
        console.error(e);
      }

    },
  }
}
</script>


<style scoped>
.pagina-principal-container {
  width: 100%;
  display: flex;
  overflow: auto;
  min-height: 100vh;
  align-items: flex-start;
  flex-direction: row;
  justify-content: flex-start;
}

.pagina-principal-container1 {
  width: 100%;
  height: var(--dl-size-size-maxwidth);
  display: flex;
  position: relative;
  align-self: stretch;
  align-items: stretch;
  padding-top: 0px;
  flex-direction: row;
  padding-bottom: 0px;
  justify-content: space-between;
}

.pagina-principal-container2 {
  flex: 1;
  display: flex;
  align-self: flex-start;
  align-items: flex-start;
  flex-direction: column;
  padding-bottom: 30px;
  justify-content: flex-start;
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 30px;
}

.pagina-principal-button {
  width: 415px;
  height: 44px;
  align-self: center;
  text-align: center;
  border-color: #1884cc;
  border-width: 3px;
  border-radius: 10px;
  background-color: #cdc5ff;
}

.pagina-principal-container3 {
  flex: 0 0 auto;
  width: 200px;
  height: 100px;
  display: flex;
  align-self: center;
  align-items: center;
  padding-top: 0px;
  flex-direction: column;
  padding-bottom: 20px;
  justify-content: center;
}

.pagina-principal-container4 {
  flex: 0 0 auto;
  width: 200px;
  height: 100px;
  display: flex;
  align-self: center;
  align-items: center;
  padding-top: 20px;
  flex-direction: column;
  padding-bottom: 20px;
  justify-content: center;
}

.pagina-principal-container5 {
  width: 427px;
  height: auto;
  display: flex;
  align-self: stretch;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #E0F1FD;
}

.pagina-principal-container6 {
  width: 421px;
  height: 100%;
  display: flex;
  align-items: center;
  padding-top: 0px;
  padding-left: 10px;
  padding-right: 10px;
  flex-direction: column;
  justify-content: flex-start;
}

.pagina-principal-text06 {
  color: rgb(0, 111, 255);
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
}


.agregar-producto-pendiente-button {
  color: rgb(255, 255, 255);
  font-size: 22px;
  transition: 0.3s;
  padding-top: 15px;
  border-width: 0px;
  padding-left: 50px;
  border-radius: 20px;
  padding-right: 50px;
  padding-bottom: 15px;
  background-color: rgb(142, 70, 227);
}

.agregar-producto-pendiente-button:hover {
  background-color: #4656e3;
}

.agregar-producto-terminado-button {
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

.agregar-producto-terminado-button:hover {
  background-color: #4656E3;
}

.agregar-producto-terminado-text {
  font-size: 32px;
  align-self: flex-start;
  font-style: normal;
  font-weight: 700;
}

.agregar-producto-pendiente-container4 {
  padding-left: 60px;
  padding-right: 60px;
}

.agregar-producto-pendiente-text {
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
}

.agregar-producto-pendiente-container2 {
  display: flex;
  align-items: center;
  padding-top: 40px;
  flex-direction: column;
  padding-bottom: 40px;
  justify-content: flex-start;
}

.agregar-producto-pendiente-container3 {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 30px;
  justify-content: center;
}

.agregar-producto-pendiente-container5 {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.alertas {
  display: flex;
  width: 100%;
  justify-content: flex-start;

}

.v-list-item {
  flex: 0;
}

.dialog-container1 {
  padding: 30px;
  text-align: center;
  flex-direction: column;
  align-items: center;
}

#texto-uno {
	float: left;
	line-height: 25px;
  color: rgb(0, 0, 0);
}
#texto-dos {
	float: right;
	line-height: 25px;
  color: rgb(0, 0, 0);
}

#texto {
  color: rgb(0, 0, 0);
}
</style>
