<template>
  <div class="agregar-producto-pendiente-container">
    <div class="agregar-producto-pendiente-container1">
      <v-data-table :headers="headers" :items="materiasPrimas" :search="search" sort-by="cantidad"
        class="elevation-1 blue lighten-5">
        <template v-slot:top>
          <v-toolbar flat>
            <span class="paginaprincipal-text"><span>Materias primas</span></span>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-btn color="primary" dark class="mr-4" @click="dialog = true">
              Crear materia prima
            </v-btn>
            <v-dialog v-model="dialog" max-width="800px">
              <v-card>
                <div class="dialog-container1">
                  <v-card-title>
                    <span class="text-h5">Crear nueva materia prima</span>
                  </v-card-title>
                  <v-container>
                    <v-form @submit.prevent="addMateria">
                      <v-text-field type="text" v-model="nombre" label="Nombre materia prima">
                      </v-text-field>
                      <v-text-field type="text" v-model="codigo" label="Nombre código">
                      </v-text-field>
                      <v-text-field type="number" v-model.number="editedItem.cantidad" label="Cantidad (mL)">
                      </v-text-field>
                      <v-text-field type="number" v-model.number="limite" label="Limite (mL)">
                      </v-text-field>
                      <v-btn type="submit" color="primary" class="mr-4" @click.stop>
                        Agregar materia prima
                      </v-btn>
                    </v-form>
                  </v-container>
                </div>
                <div class="agregar-producto-terminado-container5">
                  <v-dialog v-model="dialogUpdate3" max-width="600px">
                    <v-card>
                      <div class="dialog-container1">
                        <v-card-title class="popUp">
                          <span class="notificacion">Por favor ingrese un nombre a la materia prima</span>
                        </v-card-title>
                      </div>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="dialogUpdate4" max-width="600px">
                    <v-card>
                      <div class="dialog-container1">
                        <v-card-title class="popUp">
                          <span class="notificacion">Por favor ingrese el código</span>
                        </v-card-title>
                      </div>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="dialogUpdate5" max-width="700px">
                    <v-card>
                      <div class="dialog-container1">
                        <v-card-title class="popUp">
                          <span class="notificacion">Por favor ingrese una cantidad de materia prima</span>
                        </v-card-title>
                      </div>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="dialogUpdate6" max-width="600px">
                    <v-card>
                      <div class="dialog-container1">
                        <v-card-title class="popUp">
                          <span class="text-h5">Por favor ingrese un límite</span>
                        </v-card-title>
                      </div>
                    </v-card>
                  </v-dialog>
                </div>
              </v-card>
            </v-dialog>

            <v-dialog v-if="productosUtilizan" v-model="productosUtilizan" max-width="800px">
              <v-card>
                <div class="dialog-container1">
                  <v-card-title>
                    <span class="text-h5">Lo sentimos, no es posible borrar la materia prima.</span>
                  </v-card-title>
                  <v-container>
                    <v-data-table :headers="headersP" :items="pr" :items-per-page="5" :search="searchP" :page="pageNum"
                      class="elevation-1 blue lighten-5">
                      <template v-slot:top>
                        <v-toolbar flat>
                          <span class="text-h7"><span>Los siguientes productos están asociados a la materia prima:
                              {{ itemMPNombre }}</span></span>
                          <v-divider class="mx-4" inset vertical></v-divider>
                        </v-toolbar>
                        <v-toolbar flat>
                          <v-text-field v-model="searchP" append-icon="mdi-magnify" label="Buscar Producto" single-line
                            hide-details></v-text-field>
                        </v-toolbar>
                      </template>
                    </v-data-table>
                  </v-container>
                </div>
              </v-card>
            </v-dialog>

            <v-dialog v-model="dialogUpdate" max-width="600px">
              <v-card>
                <v-card-title>
                  <span class="text-h5">Editar cantidad</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col>
                        <v-text-field v-model="editedItem.nombre" label="Nombre"></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-text-field v-model="editedItem.codigo" label="Codigo"></v-text-field>

                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-text-field v-model="editedItem.cantidad" label="Cantidad (mL)"></v-text-field>

                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-text-field v-model="editedItem.limite" label="Límite (mL)"></v-text-field>

                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-text-field type="text" v-model="justification"
                          label="¿A que se debe la modificación de la materia prima?">
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

            <v-dialog v-model="dialogDelete" max-width="690px">
              <v-card>
                <div class="dialog-container1">
                  <v-card-title class="text-h5">¿Estas seguro que deseas eliminar esta materia prima?</v-card-title>
                  <v-container>
                    <v-form>
                      <v-text-field type="text" v-model="justification"
                        label="¿A que se debe la eliminación de la materia prima?">
                      </v-text-field>
                    </v-form>
                  </v-container>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="deleteMateria">Eliminar</v-btn>
                    <v-btn color="blue darken-1" text @click.stop="dialogDelete = false">Cancelar</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </div>
              </v-card>
            </v-dialog>
          </v-toolbar>
          <v-toolbar flat>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar en materias primas" single-line
              hide-details>
            </v-text-field>
          </v-toolbar>
        </template>

        <template v-slot:[`item.actions`]="{ item }">

          <v-icon small class="mr-2" @click="editMateria(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="delete1Materia(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>

    </div>
    <div class="producto-container3"></div>
  </div>
</template>



<script>

import firebase from "../utils/firebase.js";
const db = firebase.collection("MateriasPrimas");
const dbP = firebase.collection("ProductoTerminado");
export default {
  props: {},
  data: () => ({
    pageNum: 1,
    search: '',
    searchP: '',
    dialog: false,
    dialogUpdate: false,
    dialogDelete: false,
    dialogUpdate3: false,
    dialogUpdate4: false,
    dialogUpdate5: false,
    dialogUpdate6: false,
    productosUtilizan: false,
    materiasPrimas: [],
    itemMPNombre: null,
    pr: [],
    justification: "",
    headers: [
      { text: 'Materia Prima', align: 'start', value: 'nombre', class: "blue darken-1 white--text" },
      { text: 'Código', value: 'codigo', class: "blue darken-1 white--text" },
      { text: 'Cantidad (mL)', value: 'cantidad', class: "blue darken-1 white--text" },
      { text: 'Limite (mL)', value: 'limite', class: "blue darken-1 white--text" },
      { text: 'Acción', value: 'actions', sortable: false, class: "blue darken-1 white--text" },
    ],
    headersP: [
      {
        text: "SKU",
        align: "start",
        value: 'sku',
        class: "blue darken-1 white--text"
      },
      { text: 'Producto', value: 'nombre', class: "blue darken-1 white--text" },
    ],
    nombre: '',
    cantidad: null,
    codigo: '',
    materiaPrima: {},
    validar: false,
    idN: null,
    idTabla: null,
    limite: null,
    editedItem: {
      nombre: '',
      codigo: '',
      limite: null,
      cantidad: null
    },
    editedIndex: -1,
    defaultItem: {
      nombre: '',
      codigo: '',
      limite: null,
      cantidad: null,
    },
  }),

  mounted() {
    this.getMaterias();
  },
  methods: {
    async evaluar() {
      try {
        if (this.nombre == ''){
          this.dialogUpdate3 = true;
          this.validar = true;
        }
        else if (this.codigo == ''){
          this.dialogUpdate4 = true;
          this.validar = true;
        }
        else if (this.editedItem.cantidad == null){
          this.dialogUpdate5 = true;
          this.validar = true;
        }
        else if (this.limite == null){
          this.dialogUpdate6 = true;
          this.validar = true;
        }
        else {

          this.validar = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async updateMateria() {
      try {

        await db.doc(this.materiaPrima.id).update({
          nombre: this.nombre,
          codigo: this.codigo,
          cantidad: this.cantidad,
          limite: this.limite
        })
        this.getMaterias();
        this.nombre = '';
        this.codigo = '';
        this.cantidad = null;
        this.limite = null;
      } catch (error) {
        console.log(error);
      }
    },
    editMateria(item) {
      this.editedIndex = this.materiasPrimas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogUpdate = true;
    },

    async delete1Materia(item) {
      this.idN = item.id;
      this.itemMPNombre = item.nombre;
      let query = await dbP
        .where("indiceMP", "array-contains", item.id)
        .get();
      if (query.size != 0) {
        this.pr = [];
        query.forEach(doc => {
          this.pr.push(doc.data());
        })

        this.productosUtilizan = true;
      }
      else {
        this.idTabla = this.materiasPrimas.indexOf(item);
        this.dialogDelete = true;
      }
    },
    async deleteMateria() {
      try {
        await db.doc(this.idN).delete();
        this.materiasPrimas.splice(this.idTabla, 1);
        this.dialogDelete = false;
      } catch (error) {
        console.log(error);
      }
    },
    async addMateria() {
      try {
        this.evaluar()
        console.log(this.validar);
        if (this.nombre && this.editedItem.cantidad && this.editedItem.cantidad > 0 && this.validar) {
          await db.add({
            nombre: this.nombre,
            codigo: this.codigo,
            cantidad: this.editedItem.cantidad,
            limite: this.limite
          })
          this.getMaterias();
          this.nombre = '';
          this.codigo = '';
          this.limite = null;
          this.editedItem.cantidad = null;
          this.dialog = false;
        } else {
          console.log('Campos obligatorias');
        }
      } catch (error) {
        console.log(error);
      }
    },
    async updateProductoPendiente(baseDatosName, documento) {
      try {
        await firebase.collection(baseDatosName).doc(documento.id).update({
          nombre: documento.nombre,
          codigo: documento.codigo,
          cantidad: documento.cantidad,
          limite: documento.limite
        })
      } catch (error) {
        console.log(error);
      }
    },
    save() {
      if (this.editedIndex > -1) {
        this.updateProductoPendiente("MateriasPrimas", this.editedItem)
        Object.assign(this.materiasPrimas[this.editedIndex], this.editedItem)
      } else {
        this.materiasPrimas.push(this.editedItem)
      }
      this.close()
    },
    close() {
      this.dialogUpdate = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    async getMaterias() {
      try {
        const snapshot = await db.get();
        const materiasPrimas = [];
        snapshot.forEach(doc => {
          let materiaPrimaData = doc.data();
          materiaPrimaData.id = doc.id;
          materiasPrimas.push(materiaPrimaData);
        })
        this.materiasPrimas = materiasPrimas;

      } catch (error) {
        console.log(error);
      }
    },

  },
}
</script>

<style >
.agregar-producto-pendiente-container {
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

.agregar-producto-pendiente-container1 {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
}

.paginaprincipal-text {
  color: rgba(0, 0, 0, 1);
  width: 365px;
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

.dialog-container1 {
  padding: 30px;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
}

.notificacion{
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
}

.producto-container3 {
  height: 100px;

}
</style>