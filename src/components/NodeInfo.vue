<template>
  <div>
    <transition name="translate">
      <div class="node_info" v-if="sideBar">
        <div class="icon_node" :class="type_node"></div>
        <table>
          <tr>
            <td class="category_node">{{ category_node }}</td>
          </tr>
          <td class="title data">{{ name_node }}</td>
          <div style="height: 20px"></div>
          <td class="data" v-for="(item, key) in allTagsRender" :key="key">
            <tr>
              <th>
                {{ key }}
              </th>
              <td v-if="key == 'Página web'" class="item1">
                <a :href="item" target="_blank" rel="noopener noreferrer">
                  Ver
                </a>
              </td>
              <td v-else-if="key == 'Sitio web'" class="item1">
                <a :href="item" target="_blank" rel="noopener noreferrer">
                  Ver
                </a>
              </td>
              <td v-else-if="key == 'Email'" class="item1">
                <a :href="email + item + email2" target="_blank">Enviar</a>
              </td>
              <td v-else class="item1">
                {{ item }}
              </td>
            </tr>
            <hr
              style="
                opacity: 0.1;
                background-color: black;
                width: 100%;
                margin-top: 5px;
                margin-bottom: 15px;
              "
            />
          </td>
        </table>
        <table>
          <tr>
            <td
              class="icon"
              v-for="(item, key) in allTagsIconsRender"
              :key="key"
            >
              <div v-if="item == 'Fuera'" class="item no-smoking"></div>
              <div
                v-else-if="key == 'Acceso silla de ruedas' && item == 'Si'"
                class="item wheelchair"
              ></div>
              <div
                v-else-if="key == 'Aire acondicionado' && item == 'Si'"
                class="item air-conditioner"
              ></div>
              <div
                v-else-if="key == 'Terraza' && item == 'Si'"
                v-html="icon_HTML_terrace"
                class="item terrace"
              ></div>
            </td>
          </tr>
        </table>
        <span class="p_close p_close_node" @click="closePopup">Cerrar</span>
      </div>
    </transition>
    <button v-if="sideBar" @click="openCloseSideBar">
      <img
        class="arrows"
        src="../../public/res/arrows.png"
        style="width: 20px; height: 20px"
        alt=""
      />
    </button>
    <button v-else class="toOpen" @click="openCloseSideBar">
      <img
        class="arrows"
        src="../../public/res/arrows.png"
        style="width: 20px; height: 20px"
        alt=""
      />
    </button>
  </div>
</template>

<script>
export default {
  name: "node-info",
  props: ["labels", "selected"],
  data: function () {
    return {
      type_node: null,
      all_tags: null,
      all_tags_fixed: {},
      all_tags_icons: {},
      name_node: null,
      address: null,
      category_node: null,
      node_type: null,
      node_id: null,
      amenity: null,
      centre: null,
      name: null,
      info: false,
      sideBar: true,
      email: "mailto:",
      email2: "?subject=Mail from ",
    };
  },
  computed: {
    osmLink: function () {
      return "https://openstreetmap.org/" + this.node_type + "/" + this.node_id;
    },
    josmLink: function () {
      return (
        "http://127.0.0.1:8111/load_object?objects=" +
        this.node_type.substring(0, 1) +
        this.node_id
      );
    },
    allTagsRender: function () {
      return this.allTagsRenderMethod();
    },
    allTagsIconsRender: function (){
      return this.allTagsIconsRenderMethod();
    },
  },
  methods: {
    openCloseSideBar: function () {
      this.sideBar = !this.sideBar;
    },
    allTagsRenderMethod: function () {
      for (const key in this.all_tags) {
        //console.log(key);
        /*console.log(`${prop} = ${this.all_tags[prop]}`);*/
        switch (key) {
          case "name":
            this.name_node = this.all_tags[key];
            break;
          case "shop":
            this.category_node = this.translateItem(this.all_tags[key]);
            switch(this.all_tags[key]){
              case "hairdresser":
              this.type_node = "icon_hairdresser2";
                break;
              case "cosmetic":
              this.type_node = "icon_cosmetic2";
               break;
              case  "mall":
              this.type_node = "icon_mall2";                
              break;
              case "variety_store":
              this.type_node = "icon_variety2";                
              break;
              case "confectionery":
              this.type_node = "icon_confectionery2";
                break;
              case "florist":
              this.type_node = "icon_florist2";
                break;
              case "optician":
                this.type_node = "icon_op2";
                break;
              case "pet_grooming":
              this.type_node = "icon_hairdresser2";
                break;
              case "clothes":
              this.type_node = "icon_clothes2";
                break;
              case "pet":
              this.type_node = "icon_pet2";
                break;
            }
            break;
          case "tourism":
            if (
              this.all_tags[key] == "hotel" ||
              this.all_tags[key] == "hostel"
            ) {
              this.type_node = "icon_h2";
            }
            if (this.all_tags[key] == "artwork") {
              this.type_node = "icon_artwork2";
            }
            if (this.all_tags[key] == "viewpoint") {
              this.type_node = "icon_view2";
            }
            if (this.all_tags[key] == "information") {
              this.type_node = "icon_infopoint2";
            }
            break;
          case "bus":
            if (this.all_tags[key] == "yes") {
              this.type_node = "icon_bus2";
            }
            this.category_node = "Parada de autobus";
            break;
          case "amenity":
            /* if (this.all_tags_fixed["Categoria"]) {
              this.all_tags_fixed["Categoria"] =
                this.all_tags_fixed["Categoria"];
              "/" + this.translateItem(this.all_tags[key]);
            } else {*/
            this.category_node = this.translateItem(this.all_tags[key]);
            switch(this.all_tags[key]){
              case "fuel":
              this.type_node = "icon_fuel2";
                break;
              case "restaurant":
              this.type_node = "icon_restaurant2";                
              break;
              case  "bar":
              this.type_node = "icon_bar2";                
              break;
              case "parking":
              this.type_node = "icon_p2";                
              break;
              case "taxi":
              this.type_node = "icon_taxi2";
                break;
              case "pharmacy":
              this.type_node = "icon_pharmacy2";
                break;
              case "veterinary":
              this.type_node = "icon_vet2";
                break;
              case "animal_boarding":
              this.type_node = "icon_housedog2";
                break;
            }
            break;
          case "brand":
            this.all_tags_fixed["Marca"] = this.translateItem(
              this.all_tags[key]
            );
            break;
          case "artwork_type":
            this.all_tags_fixed["Tipo de obra"] = this.translateItem(
              this.all_tags[key]
            );
            break;
          case "opening_hours":
            this.all_tags_fixed["Horario"] = this.translateItem(
              this.all_tags[key]
            );
            break;
          case "self_service":
            this.all_tags_fixed["Autoservicio"] = this.translateItem(
              this.all_tags[key]
            );
            break;
          case "fuel:diesel":
            this.all_tags_fixed["Diesel"] = this.translateItem(
              this.all_tags[key]
            );
            break;
          case "fuel:octane_95":
            this.all_tags_fixed["Gasolina 95"] = this.translateItem(
              this.all_tags[key]
            );
            break;
          case "fuel:octane_98":
            this.all_tags_fixed["Gasolina 98"] = this.translateItem(
              this.all_tags[key]
            );
            break;
          case "brand:website":
            this.all_tags_fixed["Sitio web"] = this.translateItem(
              this.all_tags[key]
            );
            break;
          case "addr:housenumber":
            this.all_tags_fixed["nº"] = this.translateItem(this.all_tags[key]);
            break;
          case "addr:street":
            this.all_tags_fixed["Direccion"] = this.translateItem(
              this.all_tags[key]
            );
            break;
          case "addr:postcode":
            this.all_tags_fixed["CP"] = this.translateItem(this.all_tags[key]);
            break;
          case "indoor_seating":
            this.all_tags_fixed["Sillas dentro"] = this.translateItem(
              this.all_tags[key]
            );
            break;
          case "fee":
            this.all_tags_fixed["Tarifa"] = this.translateItem(
              this.all_tags[key]
            );
            break;
          case "capacity":
            this.all_tags_fixed["Capacidad"] = this.translateItem(
              this.all_tags[key]
            );
            break;
          case "maxheight":
            this.all_tags_fixed["Altura máxima"] = this.translateItem(
              this.all_tags[key]
            );
            break;
          case "contact:email":
            this.all_tags_fixed["Email"] = this.translateItem(
              this.all_tags[key]
            );
            break;
          case "contact:phone" || "phone":
            this.all_tags_fixed["Teléfono"] = this.translateItem(
              this.all_tags[key]
            );
            break;
          case "contact:website":
            this.all_tags_fixed["Página web"] = this.translateItem(
              this.all_tags[key]
            );
            break;
          case "rooms":
            this.all_tags_fixed["Habitaciones"] = this.translateItem(
              this.all_tags[key]
            );
            break;
          case "stars":
            this.all_tags_fixed["Estrellas"] = this.translateItem(
              this.all_tags[key]
            );
            break;
          case "artist_name":
            this.all_tags_fixed["Nombre del artista"] = this.translateItem(
              this.all_tags[key]
            );
            break;
          case "information":
            this.all_tags_fixed["Tipo de informacion"] = this.translateItem(
              this.all_tags[key]
            );
            break;
          default:
            //console.log(key);
            break;
        }
      }
      if (this.all_tags_fixed["Direccion"] && this.all_tags_fixed["nº"]) {
        this.all_tags_fixed["Direccion"] =
          this.all_tags_fixed["Direccion"] + ", " + this.all_tags_fixed["nº"];
        if (this.all_tags_fixed["CP"]) {
          this.all_tags_fixed["Direccion"] =
            this.all_tags_fixed["Direccion"] +
            "  " +
            this.all_tags_fixed["CP"];
        }
        delete this.all_tags_fixed.nº;
        delete this.all_tags_fixed.CP;
      }
      return this.all_tags_fixed;
    },
    translateItem: function (item) {
      switch (item) {
        case "yes":
          return "Si";
        case "fuel":
          return "Gasolinera";
        case "hairdresser":
          return "Peluquería";
        case "cosmetics":
         return "Cosméticos";
        case "pharmacy":
          return "Farmacia";
        case "outside":
          return "Fuera";
        case "limited":
          return "Limitado";
        case "restaurant":
          return "Restaurante";
        case "convenience":
          return "Tienda";
        case "books":
          return "Tienda de libros";
        case "board":
          return "Tablón";
        case "office":
          return "Oficina";
        case "map":
          return "Mapa";
        case "parking_entrance":
          return "Entrada de parking";
        case "below_default":
          return ">1.9";
        case "sculpture":
          return "Escultura";
        case "statue":
          return "Estatua";
        case "shoes":
          return "Tienda de zapatos";
        case "painting":
          return "Pintura";
        case "column":
          return "Columna";
        case "ornamental_vase":
          return "Jarrón decorativo";
        case "relief":
          return "Relieve";
        case "optician":
          return "Óptica";
        case "bar":
          return "Bar";
        case "fast_food":
          return "Comida rápida";
        case "bank":
          return "Banco";
        case "mall":
          return "Centro comercial";
        case "variety_store":
          return "Bazar";
        case "clothes":
          return "Tienda de ropa";
        case "pet":
          return "Mascotas";
        case "animal_boarding":
          return "Residencia canina";
        case "confectionery":
          return "Tienda de golosinas";
        case "florist":
          return "Floristería";
        case "veterinary":
          return "Veterinaria";
        case "pet_grooming":
          return "Peluquería canina";
        default:
          //console.log(item);
          return item;
      }
    },
    allTagsIconsRenderMethod: function () {
      for (const key in this.all_tags) {
        switch (key) {
          case "wheelchair":
            this.all_tags_icons["Acceso silla de ruedas"] = this.translateItem(
              this.all_tags[key]
            );
            break;
          case "smoking":
            this.all_tags_icons["Fumar"] = this.translateItem(
              this.all_tags[key]
            );
            break;
          case "air_conditioning":
            this.all_tags_icons["Aire acondicionado"] = this.translateItem(
              this.all_tags[key]
            );
            break;
          case "outdoor_seating":
            this.all_tags_icons["Terraza"] = this.translateItem(
              this.all_tags[key]
            );
            break;
        }
      }
      return this.all_tags_icons;
    },
    closePopup: function () {
      this.$emit("close-info");
    },
  },
  created() {
    if (this.selected) {
      let geoJsonProps = this.selected.props;
      this.all_tags = Object.assign({}, geoJsonProps);
      delete this.all_tags.id;
      this.node_type = this.selected.node_type;
      this.node_id = this.selected.node_id;
    }
  },
};
</script>

<style>
@media screen and (max-width: 500px) {
  .node_info {
    width: 240px !important;
  }
  button {
    left: 245px !important;
  }
}
.node_info_tr:hover {
  background: #f6f6f6;
}
.node_info {
  max-height: 95vh;
  width: 280px;
  height: 98%;
  overflow: auto;
  background: rgb(255, 255, 255);
  box-shadow: 0px 1px 4px 1px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  padding: 20px;
  position: absolute;
  top: 8px;
  left: 5px;
  padding-top: 40px;
  z-index: 1;
  max-width: 300px;
}
/* Estilos para motores Webkit y blink (Chrome, Safari, Opera... )*/

.node_info::-webkit-scrollbar {
  -webkit-appearance: none;
}

.node_info::-webkit-scrollbar:vertical {
  width: 10px;
}

.node_info::-webkit-scrollbar-button:increment,
.contenedor::-webkit-scrollbar-button {
  display: none;
}

.node_info::-webkit-scrollbar:horizontal {
  height: 10px;
}

.node_info::-webkit-scrollbar-thumb {
  background-color: #797979;
  border-radius: 20px;
  border: 2px solid #f1f2f3;
}

.node_info::-webkit-scrollbar-track {
  border-radius: 10px;
}
button {
  top: 15px;
}
.p_close_node {
  position: relative !important;
  font-size: 14px !important;
  border: 2px black solid;
  border-radius: 25px !important;
  padding: 6px 40px 6px 40px;
  color: black !important;
}
.data {
  padding-right: 10px;
  display: flex;
  flex-direction: column;
}
td .icon {
  padding-right: 10px;
  display: flex;
}
tr {
  display: flex;
  justify-content: space-between;
  padding-bottom: 8px;
}
.icon > div {
  margin-right: 10px;
}
.title {
  font-size: 20px;
  margin-bottom: 10px;
}
.category_node {
  margin-top: 50px;
  text-align: center;
  width: 100%;
  font-size: 12px;
  color: gray;
}
.icon_node {
  margin: 20px;
  width: 10%;
  position: absolute;
  top: 10px;
  left: 100px;
  bottom: 10px;
}
.item {
  width: 30px;
  height: 30px;
  flex-direction: row;
}
.item1 {
  text-align: right;
  max-width: 140px;
  overflow-wrap: break-word;
}
a {
  color: black !important;
}
table {
  width: 95%;
}
.icon_fuel2 {
  background-image: url("data:image/svg+xml,%3Csvg width='80%' height='80%' viewBox='0 0 15 15' version='1.1' id='fuel' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13,6L13,6v5.5c0,0.2761-0.2239,0.5-0.5,0.5S12,11.7761,12,11.5v-2C12,8.6716,11.3284,8,10.5,8H9V2c0-0.5523-0.4477-1-1-1H2&%23xA;&%23x9;C1.4477,1,1,1.4477,1,2v11c0,0.5523,0.4477,1,1,1h6c0.5523,0,1-0.4477,1-1V9h1.5C10.7761,9,11,9.2239,11,9.5v2&%23xA;&%23x9;c0,0.8284,0.6716,1.5,1.5,1.5s1.5-0.6716,1.5-1.5V5c0-0.5523-0.4477-1-1-1l0,0V2.49C12.9946,2.2178,12.7723,1.9999,12.5,2&%23xA;&%23x9;c-0.2816,0.0047-0.5062,0.2367-0.5015,0.5184C11.9987,2.5289,11.9992,2.5395,12,2.55V5C12,5.5523,12.4477,6,13,6s1-0.4477,1-1&%23xA;&%23x9;s-0.4477-1-1-1 M8,6.5C8,6.7761,7.7761,7,7.5,7h-5C2.2239,7,2,6.7761,2,6.5v-3C2,3.2239,2.2239,3,2.5,3h5C7.7761,3,8,3.2239,8,3.5&%23xA;&%23x9;V6.5z'/%3E%3C/svg%3E");
}
.icon_hairdresser2 {
  background-image: url("data:image/svg+xml,%3Csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='80%' height='80%' viewBox='0 0 405.43 405.43' style='enable-background:new 0 0 405.43 405.43;' xml:space='preserve'%3E%3Cg%3E%3Cg%3E%3Cg id='Layer_5_77_'%3E%3Cg%3E%3Cpath d='M268.515,260.015c-1.523-2.409-8.688-11.193-11.079-14.108c-3.781-4.608-8.095-4.108-11.485-0.034 c-8.271,9.936-19.832,23.728-26.46,31.623c-4.397,5.24-5.228,9.391-1.73,13.266c1.542,1.709,7.954,9.045,7.954,9.045 c-12.342,27.566-7.276,61.031,15.353,83.66c29.284,29.285,76.767,29.285,106.051,0s29.284-76.766,0-106.051 C325.854,256.154,295.029,250.409,268.515,260.015z M320.292,356.642c-13.552,13.551-35.521,13.551-49.068,0 c-13.551-13.55-13.551-35.519,0-49.066c13.549-13.55,35.519-13.55,49.068,0C333.841,321.123,333.841,343.092,320.292,356.642z' /%3E%3Cpath d='M151.469,208.117c8.522-11.597,22.224-29.08,29.38-38.96c3.598-4.966,3.931-8.799,0.021-14.211 C154.247,118.092,73.446,8.208,73.446,8.208C62.269-4.913,49.637-1.985,45.375,14.716L37.66,44.942 c-4.263,16.7,2.222,40.337,14.409,52.524c0,0,66.482,82.781,88.285,110.658C143.936,212.702,148.467,212.202,151.469,208.117z' /%3E%3Cpath d='M59.064,273.079c-29.285,29.285-29.285,76.766,0,106.051c29.285,29.285,76.766,29.285,106.051,0 c22.629-22.629,27.693-56.094,15.352-83.66l160.916-192.254c12.188-12.188,18.672-35.823,14.408-52.524l-7.716-30.226 c-4.263-16.701-16.896-19.629-28.069-6.508L142.45,249.074c-1.666,1.956-3.262,4.194-4.787,6.605 C111.148,246.075,80.323,251.821,59.064,273.079z M85.886,303.239c13.551-13.549,35.52-13.549,49.068,0 c13.551,13.551,13.551,35.52,0,49.066c-13.549,13.552-35.518,13.552-49.068,0C72.337,338.759,72.337,316.79,85.886,303.239z'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E");
}
.icon_bar2 {
  background-image: url("data:image/svg+xml,%3Csvg version='1.1' width='80%' height='80%' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 297 297' style='enable-background:new 0 0 297 297;' xml:space='preserve'%3E%3Cpath d='M265.49,72.014c2.836-2.897,3.658-7.213,2.086-10.95c-1.57-3.737-5.229-6.168-9.284-6.168h-48.877l37.7-37.7 c3.934-3.934,3.934-10.313,0-14.246c-3.935-3.933-10.311-3.933-14.245,0l-51.946,51.946H38.708c-4.055,0-7.714,2.431-9.284,6.168 c-1.572,3.737-0.75,8.053,2.086,10.95l106.918,109.232v95.609H93.605c-5.563,0-10.073,4.51-10.073,10.072S88.042,297,93.605,297 h109.791c5.563,0,10.073-4.51,10.073-10.072s-4.511-10.072-10.073-10.072h-44.823v-95.609L265.49,72.014z M198.516,111.638 L148.5,162.737l-50.016-51.099H198.516z M234.338,75.041l-16.104,16.451h-45.416l16.451-16.451H234.338z M160.779,75.041 l-16.452,16.451H78.766L62.662,75.041H160.779z'/%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E%0A");
}
.icon_restaurant2 {
  background-image: url("data:image/svg+xml,%3Csvg version='1.1' width='80%' height='80%' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 232.207 232.207' style='enable-background:new 0 0 232.207 232.207;' xml:space='preserve'%3E%3Cg%3E%3Cpath d='M218.016,115.773c0-19.599-5.567-37.921-15.194-53.476c0.524-0.709,1.035-1.437,1.532-2.186 c5.263-7.931,9.549-18.023,11.463-26.998c3.313-15.525-1.424-22.389-5.98-25.413c-6.344-4.209-15.91-3.194-26.942,2.862 c-7.154,3.928-13.896,9.408-18.925,15.262c-14.28-7.63-30.575-11.963-47.865-11.963c-15.483,0-30.168,3.477-43.323,9.681 L59.654,2.792c-1.771-2.8-5.474-3.633-8.278-1.863c-2.8,1.771-3.634,5.478-1.862,8.278l12.713,20.098 c-2.18,1.364-4.305,2.806-6.372,4.326L43.009,13.322c-1.771-2.8-5.475-3.634-8.278-1.863c-2.8,1.771-3.634,5.478-1.862,8.278 l13.679,21.625c-1.923,1.799-3.779,3.67-5.559,5.611L26.362,23.851c-1.771-2.8-5.475-3.633-8.278-1.863 c-2.8,1.771-3.634,5.478-1.862,8.278l16.796,26.552c-11.851,16.653-18.826,37.004-18.826,58.954 c0,34.058,16.797,64.265,42.538,82.78l-3.39,5.108c-4.434,6.681-2.605,15.723,4.076,20.157l8.992,5.968v0 c2.468,1.638,5.258,2.421,8.019,2.421c4.714,0,9.343-2.284,12.139-6.497l6.997-10.543c7.254,1.644,14.797,2.517,22.541,2.517 c8.165,0,16.105-0.971,23.719-2.793l6.667,10.54c2.765,4.37,7.488,6.764,12.313,6.764c2.656,0,5.344-0.726,7.751-2.248l9.119-5.77 c6.777-4.286,8.804-13.287,4.517-20.064l-3.896-6.158C201.573,179.392,218.016,149.469,218.016,115.773z M170.049,210.529 c0.75,1.185,0.396,2.758-0.789,3.508h-0.001l-9.119,5.77c-1.185,0.75-2.759,0.396-3.509-0.79L83.958,104.13 c-0.489-0.775-0.418-1.534-0.332-1.917c0.087-0.383,0.347-1.1,1.122-1.59l9.119-5.77c0.421-0.266,0.891-0.393,1.355-0.393 c0.844,0,1.67,0.418,2.153,1.182L170.049,210.529z M73.043,219.787L73.043,219.787l-8.991-5.967 c-1.169-0.775-1.488-2.356-0.714-3.524l37.671-56.764l9.299,14.701l-33.741,50.842C75.792,220.243,74.213,220.564,73.043,219.787z M53.09,51.704l10.715,16.938c-1.489,0.164-3.009,0.096-4.514-0.242c-3.569-0.804-6.612-2.949-8.568-6.041l-3.056-4.831 C49.388,55.509,51.198,53.565,53.09,51.704z M188.669,21.081c5.164-2.835,9.322-3.952,11.979-3.952c1.14,0,2.004,0.206,2.552,0.569 c1.585,1.052,2.473,5.452,0.881,12.91c-1.593,7.465-5.319,16.227-9.726,22.867c-7.294,10.989-18.992,16.599-25.545,12.249 c-3.85-2.554-4.465-7.659-4.489-10.474c-0.049-5.646,2.085-12.143,5.854-17.822C174.163,31.418,181.25,25.155,188.669,21.081z M151.738,105.806l-17.271,26.025l-9.299-14.701l13.341-20.103c0.776-1.168,2.357-1.488,3.525-0.712l8.991,5.967 C152.194,103.057,152.513,104.639,151.738,105.806z M157.237,35.837c-3.244,6.369-4.97,13.135-4.916,19.518 c0.056,6.413,1.97,12.073,5.374,16.27l-9.546,14.384c-6.623-4.012-15.316-2.126-19.638,4.384l-10.372,15.628l-10.623-16.793 c-4.178-6.603-12.827-8.678-19.537-4.812l-7.251-11.464c3.281-3.363,5.582-7.572,6.639-12.271 c1.507-6.696,0.316-13.579-3.354-19.379l-4.766-7.534c11.253-5.077,23.73-7.906,36.856-7.906 C130.917,25.861,144.904,29.464,157.237,35.837z M73.873,47.716c1.955,3.092,2.59,6.76,1.787,10.33 c-0.339,1.505-0.929,2.907-1.715,4.183L62.283,43.792c2.052-1.538,4.175-2.986,6.357-4.348L73.873,47.716z M40.581,68.775 c4.885,7.722,13.232,11.953,21.758,11.953c2.766,0,5.549-0.458,8.24-1.375l7.26,11.476c-3.011,2.081-5.111,5.157-5.919,8.749 c-0.853,3.79-0.179,7.685,1.898,10.967l20.164,31.876l-30.612,46.127c-22.511-16.357-37.177-42.884-37.177-72.776 c0-17.583,5.078-34,13.837-47.871L40.581,68.775z M117.337,179.344l15.652,24.744c-5.471,1.044-11.115,1.597-16.885,1.597 c-5.24,0-10.375-0.455-15.372-1.32L117.337,179.344z M141.495,142.942l20.242-30.501c4.32-6.511,2.679-15.254-3.59-19.799 l9.526-14.354c2.031,0.604,4.152,0.904,6.325,0.904c6.682,0,13.832-2.79,20.221-7.901c7.503,13.125,11.796,28.311,11.796,44.481 c0,29.435-14.218,55.612-36.147,72.024L141.495,142.942z'/%3E%3C/g%3E%3C/svg%3E%0A");
}
.icon_h2 {
  background-image: url("data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' width='80%' height='80%' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 330 330' style='enable-background:new 0 0 330 330;' xml:space='preserve'%3E%3Cpath id='XMLID_351_' d='M45,330h60c8.284,0,15-6.716,15-15V210h90v105c0,8.284,6.716,15,15,15h60c8.284,0,15-6.716,15-15V15 c0-8.284-6.716-15-15-15h-60c-8.284,0-15,6.716-15,15v105h-90V15c0-8.284-6.716-15-15-15H45c-8.284,0-15,6.716-15,15v300 C30,323.284,36.716,330,45,330z'/%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E");
}
.icon_p2 {
  background-image: url("data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' width='80%' height='80%' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512;' xml:space='preserve'%3E%3Cg%3E%3Cg%3E%3Cpath d='M271.515,139.636h-23.273v23.273v23.273h23.273c12.833,0,23.273-10.44,23.273-23.273S284.348,139.636,271.515,139.636z'/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3Cg%3E%3Cpath d='M418.909,0H93.091C80.238,0,69.818,10.42,69.818,23.273v325.818c0,12.853,10.42,23.273,23.273,23.273h139.636v116.364 C232.727,501.58,243.146,512,256,512c12.851,0,23.273-10.42,23.273-23.273V372.364h139.636c12.851,0,23.273-10.42,23.273-23.273 V23.273C442.182,10.42,431.76,0,418.909,0z M271.515,232.727h-23.273V256c0,12.853-10.422,23.273-23.273,23.273 c-12.854,0-23.273-10.42-23.273-23.273v-46.545v-46.545v-46.545c0-12.853,10.418-23.273,23.273-23.273h46.545 c38.498,0,69.818,31.32,69.818,69.818S310.013,232.727,271.515,232.727z'/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E%0A");
}
.icon_artwork2 {
  background-image: url("data:image/svg+xml,%3Csvg version='1.1' id='Layer_1'  width='80%' height='80%' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512.001 512.001' style='enable-background:new 0 0 512.001 512.001;' xml:space='preserve'%3E%3Cg%3E%3Cg%3E%3Cg%3E%3Cpath d='M214.982,224.237c1.166,0.562,2.398,0.827,3.611,0.827c3.103,0,6.083-1.74,7.52-4.723 c3.979-8.264,7.165-17.72,9.471-28.107c0.997-4.497-1.838-8.951-6.335-9.948c-4.501-1-8.951,1.838-9.948,6.335 c-2.028,9.137-4.792,17.375-8.216,24.485C209.088,217.256,210.831,222.239,214.982,224.237z'/%3E%3Cpath d='M354.679,450.997h-23.062l-26.98-35.738c-2.199-2.912-3.821-6.167-4.819-9.676 c-17.326-60.813-23.022-123.56-16.931-186.501c0.021-0.219,0.026-0.436,0.03-0.653c0.001-0.051,0.009-0.1,0.009-0.151 c0-0.013,0-0.029,0-0.042c0-0.004,0-0.01,0-0.014c-0.004-24.065-3.305-125.932-3.444-130.211 c-0.372-14.04-11.666-25.039-25.712-25.039h-3.969c-6.885,0-13.574-1.828-19.445-5.225c3.397-6.516,4.39-14.295,2.166-21.886 l-4.297-14.675C223.657,5.595,207.255-3.375,191.666,1.19l-1.989,0.583c-15.592,4.567-24.562,20.967-19.995,36.559l4.297,14.674 c1.666,5.69,4.928,10.632,9.386,14.34c-1.171,5.13-4.24,9.691-8.701,12.698l-9.607,6.475 c-10.662,7.185-16.794,19.62-16.005,32.452l2.123,34.502c0.148,2.4,1.323,4.619,3.226,6.088c1.472,1.136,3.268,1.739,5.097,1.739 c0.536,0,1.074-0.051,1.608-0.157l29.939-5.885c0.141,0.098,0.28,0.199,0.422,0.295c-9.347,12.782-17.417,26.514-24.009,40.906 c-6.643,14.499-9.352,30.729-7.833,46.936c0.004,0.042,0.017,0.083,0.021,0.126l-0.009,0.001 c0.548,5.029,1.013,10.264,1.462,15.326c1.852,20.876,3.767,42.464,12.184,61.468c24.523,55.377,32.164,96.849,34.107,109.871 l-25.227,20.812h-4.002c-4.606,0-8.339,3.734-8.339,8.339v44.324c0,4.606,3.734,8.339,8.339,8.339h176.516 c4.607,0,8.339-3.734,8.339-8.339v-44.324C363.019,454.731,359.286,450.997,354.679,450.997z M216.516,40.549 c1.981,6.766-1.911,13.883-8.677,15.866l-1.988,0.582c-3.278,0.96-6.734,0.586-9.729-1.053c-1.5-0.821-2.794-1.908-3.834-3.201 l23.368-15.135L216.516,40.549z M186.742,23.914c1.639-2.997,4.346-5.176,7.623-6.135l1.989-0.583 c1.195-0.35,2.402-0.517,3.588-0.517c3.882,0,7.552,1.789,9.964,4.779L186.55,36.586l-0.862-2.942 C184.729,30.367,185.103,26.911,186.742,23.914z M187.173,111.927c-5.356,5.357-8.307,12.48-8.307,20.055 c0,2.931,0.447,5.76,1.276,8.42l-12.903,2.536l-1.538-24.995c-0.428-6.958,2.897-13.701,8.678-17.596l9.607-6.475 c7.153-4.82,12.322-11.864,14.847-19.875c1.122,0.131,2.25,0.205,3.382,0.205c2.781,0,5.578-0.398,8.321-1.202l1.988-0.582 c2.105-0.616,4.083-1.454,5.93-2.471c9.191,6.29,20.089,9.701,31.346,9.701h3.969c4.938,0,8.907,3.867,9.04,8.852 c0.008,0.252,0.209,6.45,0.509,16.053c-2.812-0.795-5.959-0.09-8.172,2.124c-3.257,3.257-3.257,8.536,0,11.793 c2.207,2.207,3.422,5.141,3.422,8.261c0,6.442-5.242,11.684-11.684,11.684s-11.684-5.242-11.684-11.684 c0-4.606-3.734-8.339-8.339-8.339c-4.605,0-8.339,3.734-8.339,8.339c0,1.632,0.147,3.231,0.413,4.789 c-0.009,0.153-0.023,0.305-0.023,0.46c0,6.442-5.242,11.684-11.684,11.684c-6.442,0-11.684-5.242-11.684-11.684 c0-3.121,1.215-6.055,3.422-8.263c3.257-3.257,3.256-8.537,0-11.793C195.709,108.671,190.43,108.671,187.173,111.927z M182.623,203.404c6.691-14.607,15.011-28.489,24.737-41.281c0.491-0.646,1.03-1.258,1.603-1.831 c8.427-0.511,15.869-4.722,20.728-11.022c4.775,3.651,10.733,5.828,17.195,5.828c6.723,0,12.903-2.356,17.769-6.279 c0.727,25.2,1.423,51.711,1.566,65.175c-41.665,28.815-77.342,24.974-90.311,22.155 C175.684,224.775,177.972,213.558,182.623,203.404z M188.535,313.561c-7.297-16.477-9.089-36.665-10.82-56.189 c-0.118-1.333-0.238-2.679-0.359-4.031c4.714,0.749,10.634,1.352,17.564,1.351c18.011-0.001,42.716-4.065,69.997-20.093 c-0.087,1.355-0.165,2.711-0.241,4.066l-59.595,34.609c-3.983,2.313-5.336,7.416-3.023,11.399 c1.548,2.665,4.344,4.153,7.22,4.153c1.422,0,2.862-0.364,4.181-1.13l50.483-29.316c-0.07,3.847-0.097,7.692-0.082,11.536 c-0.095,0.073-0.192,0.139-0.284,0.216l-23.138,19.534c-3.519,2.971-3.963,8.233-0.992,11.752c1.649,1.954,4.005,2.96,6.376,2.96 c1.899,0,3.81-0.646,5.375-1.968l13.182-11.129c1.814,40.106,8.29,79.874,19.401,118.87c1.564,5.496,4.104,10.595,7.549,15.156 l19.394,25.688h-60.353l-26.229-21.638c-0.485-3.556-1.442-9.696-3.192-18.062c11.621-0.538,26.553-2.362,38.134-7.67 c4.187-1.919,6.025-6.868,4.106-11.056c-1.919-4.186-6.869-6.024-11.056-4.106c-10.364,4.75-25.683,5.987-35.046,6.273 c-0.455-1.78-0.94-3.619-1.449-5.507c10.143-4.053,21.439-9.669,28.3-16.53c3.257-3.257,3.257-8.537,0-11.794 c-3.256-3.257-8.536-3.257-11.793,0c-3.808,3.808-11.457,8.181-21.177,12.208C205.694,356.066,198.455,335.96,188.535,313.561z M224.157,450.997h-15.784l7.891-6.51L224.157,450.997z M346.34,495.321H186.503v-27.645H346.34V495.321z'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E%0A");
}
.icon_ita2 {
  background-image: url("data:image/svg+xml,%3Csvg version='1.1' id='Capa_1' width='80%' height='80%' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 59.737 59.737' style='enable-background:new 0 0 59.737 59.737;' xml:space='preserve'%3E%3Cg%3E%3Cpath d='M35.869,37.869c0.552,0,1-0.447,1-1c0-3.859-3.14-7-7-7c-0.552,0-1,0.447-1,1s0.448,1,1,1c2.757,0,5,2.243,5,5 C34.869,37.421,35.316,37.869,35.869,37.869z'/%3E%3Cpath d='M38.869,37.869c0.552,0,1-0.447,1-1c0-5.514-4.486-10-10-10c-2.206,0-4,1.794-4,4c0,0.553,0.448,1,1,1s1-0.447,1-1 c0-1.103,0.897-2,2-2c4.411,0,8,3.589,8,8C37.869,37.421,38.316,37.869,38.869,37.869z'/%3E%3Cpath d='M29.869,32.869c-0.552,0-1,0.447-1,1s0.448,1,1,1c1.103,0,2,0.897,2,2c0,0.553,0.448,1,1,1s1-0.447,1-1 C33.869,34.663,32.074,32.869,29.869,32.869z'/%3E%3Cpath d='M41.869,37.869c0.552,0,1-0.447,1-1c0-7.168-5.832-13-13-13h-2c-2.757,0-5,2.243-5,5c0,0.553,0.448,1,1,1s1-0.447,1-1 c0-1.654,1.346-3,3-3h2c6.065,0,11,4.935,11,11C40.869,37.421,41.316,37.869,41.869,37.869z'/%3E%3Cpath d='M15.869,14.869c0.552,0,1-0.447,1-1h5c1.627,0,3.061-0.793,3.974-2h28.026c1.654,0,3-1.346,3-3s-1.346-3-3-3H25.843 c-0.914-1.207-2.348-2-3.974-2h-5c0-0.553-0.448-1-1-1s-1,0.447-1,1v10C14.869,14.421,15.316,14.869,15.869,14.869z M21.869,5.869 c1.004,0,1.89,0.5,2.434,1.26l0.143,0.245c0.135,0.23,0.233,0.466,0.304,0.706c0.005,0.017,0.011,0.033,0.016,0.05 c0.067,0.243,0.103,0.49,0.103,0.74s-0.036,0.496-0.103,0.74c-0.004,0.017-0.011,0.033-0.016,0.05 c-0.07,0.239-0.169,0.475-0.304,0.706l-0.143,0.245c-0.545,0.76-1.43,1.26-2.434,1.26h-5V9.871c0.726,0.001,1.948,0.002,4,0.002 c0.552,0,1-0.447,1-1s-0.448-1-1-1c-2.056,0-3.277-0.001-4-0.002V5.869H21.869z'/%3E%3Cpath d='M12.869,14.869c0.552,0,1-0.447,1-1v-10c0-0.553-0.448-1-1-1s-1,0.447-1,1v10C11.869,14.421,12.316,14.869,12.869,14.869z' /%3E%3Cpath d='M12.869,27.869c0.552,0,1-0.447,1-1v-10c0-0.553-0.448-1-1-1s-1,0.447-1,1v10C11.869,27.421,12.316,27.869,12.869,27.869z' /%3E%3Cpath d='M9.869,16.869c-0.552,0-1,0.447-1,1v10c0,0.553,0.448,1,1,1s1-0.447,1-1v-10C10.869,17.316,10.421,16.869,9.869,16.869z'/%3E%3Cpath d='M4.869,10.869c-0.552,0-1,0.447-1,1s0.448,1,1,1h4v2.289c0,0.553,0.448,1,1,1s1-0.447,1-1V3.869c0-0.553-0.448-1-1-1 s-1,0.447-1,1v1h-4c-0.552,0-1,0.447-1,1s0.448,1,1,1h4v1h-4c-0.552,0-1,0.447-1,1s0.448,1,1,1h4v1H4.869z'/%3E%3Cpath d='M50.818,48.869c-0.508-5.598-5.221-10-10.949-10h-7c-0.552,0-1,0.447-1,1s0.448,1,1,1h7c4.624,0,8.442,3.507,8.941,8h-1.01 c-0.495-3.94-3.859-7-7.931-7h-6c-0.552,0-1,0.447-1,1s0.448,1,1,1h6c2.967,0,5.431,2.167,5.91,5h-1.011 c-0.465-2.279-2.484-4-4.899-4h-5c-0.552,0-1,0.447-1,1s0.448,1,1,1h5c1.302,0,2.402,0.839,2.816,2h-1.816c0-0.553-0.448-1-1-1h-5 c-0.552,0-1,0.447-1,1h-1.017c-0.351-14.717-8.418-20-15.983-20h-1c-5.514,0-10,4.486-10,10v5c0,0.553,0.448,1,1,1s1-0.447,1-1v-5 c0-4.411,3.589-8,8-8h1c9.949,0,13.725,9.116,13.985,18h-0.999c-0.28-10.669-5.09-17-12.987-17c-3.86,0-7,3.141-7,7v1 c0,0.553,0.448,1,1,1s1-0.447,1-1v-1c0-2.757,2.243-5,5-5c9.292,0,10.826,9.8,10.984,15h-0.998c-0.287-11.536-5.55-14-9.986-14 c-1.654,0-3,1.346-3,3c0,0.553,0.448,1,1,1s1-0.447,1-1c0-0.552,0.449-1,1-1c5.171,0,7.782,3.936,7.981,12h-0.981 c0-0.553-0.448-1-1-1h-5c-0.552,0-1,0.447-1,1h-1.816c0.414-1.161,1.514-2,2.816-2h5c0.552,0,1-0.447,1-1s-0.448-1-1-1h-5 c-2.414,0-4.434,1.721-4.899,4h-1.011c0.478-2.833,2.942-5,5.91-5h4c0.552,0,1-0.447,1-1s-0.448-1-1-1h-4 c-4.072,0-7.436,3.06-7.931,7h-1.01c0.5-4.493,4.317-8,8.941-8h2c0.552,0,1-0.447,1-1s-0.448-1-1-1h-2 c-5.728,0-10.442,4.402-10.949,10H0l3.045,4.567c1.433,2.149,3.831,3.433,6.415,3.433h40.818c2.583,0,4.981-1.283,6.415-3.433 l3.045-4.567H50.818z'/%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E ");
}
.icon_mex2 {
  background-image: url("data:image/svg+xml,%3Csvg version='1.1' id='Capa_1'  width='80%' height='80%' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 460 460' style='enable-background:new 0 0 460 460;' xml:space='preserve'%3E%3Cpath id='XMLID_1240_' d='M445,313.616h-76.99c-4.506-24.654-15.107-78.055-31.29-132.186C305.529,77.1,270.621,26.384,230,26.384 S154.47,77.1,123.279,181.431c-16.183,54.131-26.783,107.532-31.29,132.186H15c-8.284,0-15,6.716-15,15c0,57.897,47.103,105,105,105 h250c57.897,0,105-47.103,105-105C460,320.332,453.284,313.616,445,313.616z M362.09,343.616h49.472l-24.144,24.257l-20.869-20.869 c-1.424-1.425-3.066-2.496-4.817-3.228C361.852,343.724,361.972,343.673,362.09,343.616z M261.442,367.898l-20.894-20.893 c-2.914-2.915-6.729-4.376-10.549-4.391c2.892-0.011,5.785,0.807,8.293,2.458h46.414c-0.838,0.552-1.634,1.196-2.371,1.933 L261.5,367.84L261.442,367.898z M219.336,347.005L198.5,367.84l-20.836-20.836c-0.737-0.738-1.533-1.381-2.371-1.933h46.414 C220.869,345.623,220.073,346.267,219.336,347.005z M151.551,191.616h156.897c3.889,13.099,7.457,26.213,10.685,38.884H140.865 C144.093,217.833,147.66,204.72,151.551,191.616z M326.382,260.501c4.927,21.503,8.655,40.176,11.094,53.116H122.521 c2.437-12.937,6.165-31.607,11.093-53.116H326.382z M347.707,345.072c-0.838,0.552-1.634,1.196-2.371,1.933l-20.894,20.893 l-20.894-20.893c-0.737-0.738-1.533-1.381-2.371-1.933H347.707z M190.181,93.935C204.022,69.719,218.164,56.384,230,56.384 c11.821,0,25.945,13.305,39.77,37.465c9.926,17.346,19.691,40.072,29.142,67.768H161.087 C170.522,133.967,180.27,111.272,190.181,93.935z M158.822,345.072c-0.838,0.552-1.634,1.196-2.371,1.933l-20.894,20.893 l-20.894-20.893c-0.737-0.738-1.533-1.381-2.371-1.933H158.822z M97.909,343.616c0.118,0.056,0.238,0.107,0.358,0.16 c-1.75,0.732-3.392,1.803-4.817,3.228l-20.279,20.278l-21.141-23.667H97.909z M105,403.616c-7.789,0-15.302-1.2-22.371-3.415 c0.178-0.162,0.364-0.313,0.535-0.484l20.894-20.893l20.894,20.893c1.962,1.962,4.335,3.251,6.839,3.899H105z M139.325,403.616 c2.505-0.648,4.878-1.937,6.839-3.899l20.894-20.893l20.894,20.893c1.962,1.962,4.335,3.251,6.839,3.899H139.325z M202.325,403.616 c2.505-0.648,4.878-1.937,6.839-3.899L230,378.882l20.836,20.835c1.962,1.962,4.335,3.251,6.839,3.899H202.325z M265.209,403.616 c2.505-0.648,4.878-1.937,6.839-3.899l20.894-20.893l20.894,20.893c1.962,1.962,4.335,3.251,6.84,3.899H265.209z M355,403.616 h-26.791c2.505-0.648,4.878-1.937,6.84-3.899l20.894-20.893l20.894,20.893c0.171,0.171,0.357,0.323,0.535,0.484 C370.302,402.416,362.789,403.616,355,403.616z'/%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E ");
}
.icon_sushi2 {
  background-image: url("data:image/svg+xml,%3Csvg version='1.1' id='Capa_1'  width='80%' height='80%' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 48.677 48.677' style='enable-background:new 0 0 48.677 48.677;' xml:space='preserve'%3E%3Cg%3E%3Cg%3E%3Cpath style='fill:%23030104;' d='M38.222,34.407c-1.189-0.805-2.412-1.562-3.596-2.375c-1.885-1.293-3.703-2.676-5.573-3.988 c-5.448-3.827-11.471-5.501-18.063-5.985c-1.515-0.111-3.025-0.103-4.53,0.022c-1.101,0.092-1.992,0.291-2.001,0.362 c-0.008,0.065-0.015,0.13-0.015,0.13c-0.079,0.771-0.138,1.751-0.113,2.855c0.041,0.868,0.133,1.802,0.316,2.779 c0.014,0.087,0.276,1.559,1.433,2.618c0.815,0.746,1.765,0.935,1.787,0.937l0.04,0.005c0.06,0.01,6.48,0.61,11.72,1.69 c0.06,0.01,6.76,1.61,9.16,2.69c0.181,0.069,4.511,1.899,7.74,1.899c0.6,0,1.129-0.063,1.586-0.19 c0.854-0.234,1.684-0.996,1.969-1.355s0.461-0.694,0.451-0.705c-0.011-0.012-0.567-0.266-1.195-0.654 C38.958,34.909,38.59,34.657,38.222,34.407z'/%3E%3Cpath style='fill:%23030104;' d='M48.462,32.89c-0.506-0.857-1.662-1.99-2.682-2.414v-0.001c-0.621-0.258-1.298-0.515-2.022-0.753 c-2.394-0.791-5.312-1.385-8.377-1.164c-1.103,0.079-1.16-0.109-0.089-0.379c1.873-0.47,4.977-0.859,8.688,0.18 c0.456,0.131,0.92,0.282,1.394,0.459c0.759,0.281,1.022-0.274,0.511-1.254c-0.228-0.435-0.501-0.928-0.826-1.465 c-0.571-0.945-1.908-2.051-2.968-2.362c-2.907-0.854-6.934-1.115-11.821,0.904c-0.118,0.045-0.237,0.094-0.356,0.145 c-0.196,0.084-0.26,0.075-0.141-0.021c0.061-0.048,0.135-0.105,0.221-0.169c1.268-0.974,5.195-3.488,10.713-2.434 c1.084,0.207,1.375-0.198,0.627-1.011c-0.479-0.521-0.994-1.046-1.549-1.57c-0.802-0.759-2.381-1.487-3.483-1.532 c-2.687-0.111-6.091,0.403-9.818,2.517c-0.961,0.545-1.134,0.355-0.29-0.356c1.551-1.307,4.387-3.062,8.549-3.222 c1.104-0.043,1.279-0.491,0.351-1.088c-0.711-0.457-1.46-0.899-2.25-1.322c-0.974-0.521-2.688-0.877-3.78-0.704 c-2.646,0.418-5.724,1.604-8.616,4.404c-0.793,0.768-0.962,0.655-0.305-0.233c1.167-1.577,3.338-3.822,6.74-4.853 c1.057-0.32,1.188-0.721,0.229-1.032c-0.567-0.184-1.151-0.358-1.752-0.519c0,0-0.331-0.112-0.92-0.262 c-0.512-0.13-1.804,0.003-2.831,0.409c-2.333,0.921-4.887,2.529-7.1,5.319c-0.686,0.865-0.926,0.756-0.421-0.226 c0.795-1.546,2.346-3.727,5.208-5.274c0.972-0.525,0.932-0.929-0.172-0.963c-0.434-0.013-0.882-0.016-1.344-0.005 c-1.104,0.026-2.779,0.569-3.67,1.223c-1.602,1.176-3.313,2.824-4.954,5.135c-0.639,0.901-0.812,0.82-0.336-0.177 c0.547-1.145,1.399-2.659,2.602-4.081c0.714-0.843,0.517-1.226-0.521-0.847c-0.523,0.191-1.047,0.407-1.57,0.652 c-1,0.469-2.371,1.603-3.025,2.492c-0.608,0.826-1.206,1.77-1.756,2.841c-0.505,0.982-0.687,0.929-0.335-0.118 c0.111-0.33,0.244-0.689,0.404-1.067c0.431-1.017,0.198-1.228-0.592-0.457c-1.278,1.246-2.49,2.752-3.589,4.575 c0,0-0.223,0.334-0.408,0.745c-0.193,0.428,0.574,0.473,1.657,0.256c1.222-0.245,2.619-0.469,2.828-0.505 c0.18-0.031,0.361-0.048,0.541-0.076c2.159-0.329,4.333-0.416,6.515-0.256c6.591,0.484,12.615,2.158,18.063,5.985 c1.869,1.313,3.689,2.696,5.572,3.989c1.186,0.813,2.408,1.568,3.597,2.375c0.739,0.502,1.483,1.008,2.292,1.367 c0.398,0.176,0.811,0.33,1.255,0.407c1.79,0.315,3.431-0.116,5.116-0.429C48.55,34.467,48.973,33.749,48.462,32.89z'/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E%0A");
}
.icon_shoe2 {
  background-image: url("data:image/svg+xml,%3Csvg version='1.1' id='Capa_1'  width='80%' height='80%' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 228.302 228.302' style='enable-background:new 0 0 228.302 228.302;' xml:space='preserve'%3E%3Cpath d='M228.302,71.001c0-17.033-7.273-44.926-26.79-47.257c-0.401-0.049-0.814-0.073-1.226-0.073 c-9.925,0-22.016,13.773-58.445,61.142c-14.413,18.741-34.057,44.281-40.104,47.787c-0.057,0.01-0.111,0.02-0.166,0.03 l-46.082,9.122c-2.073,0.264-13.799,1.862-25.701,5.702C10.023,153.831,0,163.111,0,175.037c0,24.758,37.845,27.52,56.032,28.846 c1.109,0.081,2.132,0.156,3.051,0.23c4.331,0.345,11.779,0.52,22.137,0.52c17.391,0,37.5-0.493,37.701-0.498 c0.188-0.005,0.374-0.017,0.56-0.035c1.511-0.15,37.179-4.232,52.286-51.101c4.787-14.839,18.266-30.9,30.049-35.805 c0.281-0.117,0.557-0.25,0.834-0.376v80.313c0,4.143,3.357,7.5,7.5,7.5c4.143,0,7.5-3.357,7.5-7.5v-93.474 C224.444,93.974,228.302,81.431,228.302,71.001z M196.049,103.346c-15.821,6.585-32.398,25.95-38.559,45.048 c-11.563,35.87-36.64,40.373-39.302,40.752c-2.781,0.066-21.039,0.485-36.969,0.485c-9.961,0-17.009-0.159-20.943-0.473 c-0.948-0.075-2.006-0.152-3.153-0.236C29.173,186.883,15,182.211,15,175.037c0-8.573,25.173-16.339,42.569-18.429 c0.19-0.022,0.38-0.053,0.568-0.09l45.879-9.081c8.191-0.837,18.104-12.377,49.715-53.48c15.689-20.401,39.166-50.927,46.918-55.119 c6.908,2.163,12.652,18.912,12.652,32.163C213.302,82.876,205.923,99.231,196.049,103.346z'/%3E%3Cg%3E%3C/g%3E%3C/svg%3E");
}
.icon_view2 {
  background-image: url("data:image/svg+xml,%3Csvg version='1.1' id='Capa_1' width='80%' height='80%' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 612 612' style='enable-background:new 0 0 612 612;' xml:space='preserve'%3E%3Cg%3E%3Cg%3E%3Cpath d='M609.608,315.426c3.19-5.874,3.19-12.979,0-18.853c-58.464-107.643-172.5-180.72-303.607-180.72 S60.857,188.931,2.393,296.573c-3.19,5.874-3.19,12.979,0,18.853C60.858,423.069,174.892,496.147,306,496.147 S551.143,423.069,609.608,315.426z M306,451.855c-80.554,0-145.855-65.302-145.855-145.855S225.446,160.144,306,160.144 S451.856,225.446,451.856,306S386.554,451.855,306,451.855z'/%3E%3Cpath d='M306,231.67c-6.136,0-12.095,0.749-17.798,2.15c5.841,6.76,9.383,15.563,9.383,25.198c0,21.3-17.267,38.568-38.568,38.568 c-9.635,0-18.438-3.541-25.198-9.383c-1.401,5.703-2.15,11.662-2.15,17.798c0,41.052,33.279,74.33,74.33,74.33 s74.33-33.279,74.33-74.33S347.052,231.67,306,231.67z'/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E%0A");
}
.icon_infopoint2 {
  background-image: url("data:image/svg+xml,%3Csvg version='1.1' id='Capa_1'  width='80%' height='80%' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 488.9 488.9' style='enable-background:new 0 0 488.9 488.9;' xml:space='preserve'%3E%3Cg%3E%3Cg%3E%3Cpath d='M239.15,0c31.9,0,57.7,25.8,57.7,57.7s-25.8,57.7-57.7,57.7s-57.7-25.8-57.7-57.7S207.25,0,239.15,0z M291.65,151.6h-1.5 h-92.8h-3.4c-19,0-34.3,15.4-34.3,34.3l0,0c0,19,15.4,34.3,34.3,34.3h3.4v200h-37.7v68.7h169.6v-68.7h-37.5V151.6H291.65z'/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E%0A");
}
.icon_cosmetic2 {
  background-image: url("data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' width='80%' height='80%' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512.001 512.001' style='enable-background:new 0 0 512.001 512.001;' xml:space='preserve'%3E%3Cg%3E%3Cg%3E%3Cpath d='M339.766,312.513c-4.537,0-8.213,3.677-8.213,8.213v174.847h-151.11v-233.23h151.106v34.292 c0,4.537,3.677,8.214,8.213,8.214c4.537,0,8.213-3.677,8.213-8.213v-42.505c0-4.536-3.676-8.213-8.213-8.213h-11.706v-91.976 c0-4.536-3.676-8.213-8.213-8.213h-9.582c0,0-0.015-59.835-0.039-60.09c1.048-16.049-9.25-37.614-28.588-56.953 c-6.001-6-12.394-11.271-19.005-15.669c-3.776-2.512-8.874-1.487-11.386,2.29c-2.512,3.777-1.486,8.874,2.291,11.386 c5.707,3.796,11.255,8.375,16.487,13.607c21.847,21.847,27.516,44.063,21.822,49.758c-5.699,5.694-27.912,0.025-49.758-21.821 c-21.847-21.847-27.516-44.063-21.822-49.757c2.512-2.511,8.237-2.745,15.316-0.622c4.346,1.301,8.923-1.163,10.225-5.508 c1.303-4.345-1.163-8.922-5.507-10.225c-13.347-4.001-24.586-2.318-31.649,4.742c-4.618,4.618-6.825,10.922-6.838,18.234 c-0.096,0.504-0.151,120.629-0.151,120.629h-9.505c-4.537,0-8.213,3.677-8.213,8.213v29.905c0,4.536,3.676,8.213,8.213,8.213 s8.213-3.677,8.213-8.213v-21.693h9.505h92.181h9.582v83.763H200.367v-34.696c0-4.536-3.676-8.213-8.213-8.213 c-4.537,0-8.213,3.677-8.213,8.213v34.696h-11.707c-4.537,0-8.213,3.677-8.213,8.213v249.655c0,4.536,3.676,8.213,8.213,8.213 h167.531c4.537,0,8.213-3.677,8.213-8.213V320.726C347.979,316.19,344.303,312.513,339.766,312.513z M293.836,145.73H218.08 V65.558c3.584,4.823,7.714,9.624,12.386,14.294c18.444,18.443,38.911,28.668,54.688,28.668c3.096,0,5.997-0.419,8.681-1.222 V145.73z'/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E ");
}
.icon_book2 {
  background-image: url("data:image/svg+xml,%3Csvg version='1.1' id='Capa_1'  width='80%' height='80%' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 489.4 489.4' style='enable-background:new 0 0 489.4 489.4;' xml:space='preserve'%3E%3Cg%3E%3Cg%3E%3Cpath d='M453.7,20.4c0-11.2-9.2-20.4-20.4-20.4H114.2C70.4,0,35.7,34.7,35.7,77.5c0,0,0,349.5,0,349.7c0,34.7,28.5,62.2,63.2,62.2 h333.4c8.2,0,16.3-5.1,19.4-13.3c3.1-8.2,1-17.3-6.1-22.4c-18.1-11.5-19.2-36.7-3.1-47.9c3.4-3.4,11.1-10.4,10.5-20.4 C453.5,383.8,453.7,20.4,453.7,20.4z M76.5,427.2c0-12.2,10.2-21.4,22.4-21.4h293.7c-9,15-7.1,32.6,0,42.8H98.9 C86.7,448.6,76.5,439.5,76.5,427.2z M413,365H99c-7.9,0-15.4,1.5-22.4,4.2V77.5c0-20.4,17.3-36.7,37.7-36.7h298.8V365H413z'/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E");
}
.air-conditioner {
  background-image: url("data:image/svg+xml,%3Csvg version='1.0' xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 64.000000 64.000000' preserveAspectRatio='xMidYMid meet'%3E%3Cg transform='translate(0.000000,64.000000) scale(0.100000,-0.100000)'%0Afill='%23000000' stroke='none'%3E%3Cpath d='M17 622 c-14 -15 -17 -40 -17 -129 0 -121 10 -143 62 -143 17 0 27%0A-7 31 -20 5 -19 14 -20 227 -20 213 0 222 1 227 20 4 14 14 20 33 20 50 0 60%0A24 60 147 0 94 -3 112 -18 126 -16 15 -52 17 -304 17 -263 0 -286 -1 -301 -18z%0Am591 -14 c16 -16 16 -210 0 -226 -20 -20 -58 -15 -58 8 0 19 -7 20 -230 20%0A-223 0 -230 -1 -230 -20 0 -23 -38 -28 -58 -8 -16 16 -16 210 0 226 17 17 559%0A17 576 0z m-78 -248 l0 -30 -210 0 -210 0 0 30 0 30 210 0 210 0 0 -30z'/%3E%3Cpath d='M530 586 c-19 -23 -8 -61 18 -64 44 -7 67 32 36 62 -19 20 -38 20%0A-54 2z m44 -37 c-8 -14 -34 -11 -34 4 0 8 3 17 7 20 9 9 34 -13 27 -24z'/%3E%3Cpath d='M47 574 c-4 -4 -7 -18 -7 -31 l0 -23 228 2 227 3 0 25 0 25 -221 3%0Ac-121 1 -223 -1 -227 -4z m423 -24 c0 -6 -75 -10 -205 -10 -130 0 -205 4 -205%0A10 0 6 75 10 205 10 130 0 205 -4 205 -10z'/%3E%3Cpath d='M95 440 c8 -14 442 -14 450 0 4 7 -73 10 -225 10 -152 0 -229 -3%0A-225 -10z'/%3E%3Cpath d='M213 274 c-3 -8 -1 -26 5 -38 7 -16 7 -27 0 -34 -6 -6 -6 -12 0 -16%0A5 -3 16 1 23 10 10 12 10 20 0 35 -6 11 -9 29 -6 40 8 23 -13 26 -22 3z'/%3E%3Cpath d='M273 274 c-3 -9 -1 -25 6 -36 9 -14 9 -23 1 -33 -7 -8 -7 -16 -2 -19%0A6 -3 15 1 22 9 10 12 10 21 2 40 -6 14 -9 32 -6 40 4 8 1 15 -5 15 -7 0 -14%0A-7 -18 -16z'/%3E%3Cpath d='M335 270 c-4 -12 -2 -27 4 -34 5 -6 7 -23 4 -37 -6 -21 -5 -23 10%0A-10 19 15 22 46 7 56 -6 4 -8 15 -5 26 4 10 2 19 -4 19 -5 0 -13 -9 -16 -20z'/%3E%3Cpath d='M396 274 c-3 -8 -1 -24 5 -35 5 -11 7 -29 4 -41 -5 -15 -3 -19 6 -16%0A17 6 24 47 10 61 -7 7 -7 16 0 29 7 13 6 18 -5 18 -7 0 -17 -7 -20 -16z'/%3E%3Cpath d='M95 192 c-6 -18 -10 -20 -21 -11 -24 20 -29 0 -6 -24 34 -36 27 -55%0A-8 -22 -16 16 -33 25 -37 22 -4 -4 -1 -13 5 -19 18 -18 15 -28 -8 -28 -11 0%0A-20 -4 -20 -10 0 -5 10 -10 21 -10 18 0 19 -2 9 -15 -22 -26 -1 -30 25 -5 32%0A30 45 17 15 -15 -25 -26 -21 -47 5 -25 13 10 15 9 15 -9 0 -11 5 -21 10 -21 6%0A0 10 9 10 20 0 23 10 26 28 8 6 -6 15 -9 19 -5 3 4 -6 21 -22 37 -33 35 -14%0A42 22 8 24 -23 44 -18 24 6 -9 11 -7 15 11 21 l23 8 -22 4 c-26 5 -29 13 -11%0A31 25 25 -4 24 -30 -1 -37 -35 -50 -22 -15 15 25 26 26 55 1 30 -18 -18 -26%0A-15 -31 11 l-4 22 -8 -23z'/%3E%3Cpath d='M530 191 c0 -24 -10 -27 -28 -9 -25 25 -24 -4 1 -30 35 -37 22 -50%0A-15 -15 -26 25 -55 26 -30 1 18 -18 15 -26 -10 -31 l-23 -4 23 -8 c18 -6 20%0A-10 11 -21 -20 -24 0 -29 24 -6 36 34 55 27 22 -8 -16 -16 -25 -33 -22 -37 4%0A-4 13 -1 19 5 18 18 28 15 28 -8 0 -11 5 -20 10 -20 6 0 10 10 10 21 0 18 2%0A19 15 9 26 -22 30 -1 5 25 -30 32 -17 45 15 15 26 -25 47 -21 25 5 -10 13 -9%0A15 9 15 11 0 21 5 21 10 0 6 -9 10 -20 10 -23 0 -26 10 -8 28 6 6 9 15 5 19%0A-4 3 -21 -6 -37 -22 -35 -33 -42 -14 -8 22 23 25 18 44 -7 23 -12 -10 -15 -10%0A-15 3 0 9 -4 19 -10 22 -5 3 -10 -3 -10 -14z'/%3E%3C/g%3E%3C/svg%3E");
}
.no-smoking {
  background-image: url("data:image/svg+xml,%3csvg version='1.1' width='100%' height='100%' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512.011 512.011' style='enable-background:new 0 0 512.011 512.011%3b' xml:space='preserve'%3e%3cg%3e%3cg%3e%3cg%3e%3cpath d='M490.672%2c213.341H341.339h-12.501L505.755%2c36.424c8.341-8.341%2c8.341-21.824%2c0-30.165c-8.341-8.341-21.824-8.341-30.165%2c0 L268.507%2c213.341H21.339c-11.776%2c0-21.333%2c9.557-21.333%2c21.333v85.333c0%2c11.776%2c9.557%2c21.333%2c21.333%2c21.333h119.168 L6.256%2c475.592c-8.341%2c8.341-8.341%2c21.824%2c0%2c30.165c4.16%2c4.16%2c9.621%2c6.251%2c15.083%2c6.251c5.461%2c0%2c10.923-2.091%2c15.083-6.251 l164.416-164.416h140.501h149.333c11.776%2c0%2c21.333-9.557%2c21.333-21.333v-85.333C512.005%2c222.899%2c502.448%2c213.341%2c490.672%2c213.341 z'/%3e%3cpath d='M42.672%2c192.008c11.776%2c0%2c21.333-9.557%2c21.333-21.333c0-8.107%2c2.709-11.392%2c3.051-11.691h36.565 c21.845%2c0%2c39.616-17.771%2c39.616-39.616c0-2.901-0.299-5.76-0.896-8.533c11.691-9.515%2c19.179-24%2c19.179-40.213 c0-20.608-12.181-39.232-31.04-47.488c-10.795-4.757-23.381%2c0.192-28.096%2c10.987c-4.736%2c10.795%2c0.192%2c23.381%2c10.987%2c28.096 c3.328%2c1.451%2c5.483%2c4.757%2c5.483%2c8.405c0%2c5.035-4.075%2c9.131-9.088%2c9.131c-10.389%2c0-19.264%2c7.467-21.035%2c17.707 c-1.216%2c7.083%2c1.216%2c14.08%2c6.101%2c18.859H67.056c-26.069%2c0-45.717%2c23.36-45.717%2c54.357 C21.339%2c182.451%2c30.896%2c192.008%2c42.672%2c192.008z'/%3e%3c/g%3e%3c/g%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3c/svg%3e");
}
.wheelchair {
  background-image: url("data:image/svg+xml,%3csvg version='1.1' width='100%' height='100%' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 488.7 488.7' style='enable-background:new 0 0 488.7 488.7%3b' xml:space='preserve'%3e%3cg%3e%3cg%3e%3cpath d='M419.633%2c379.2c-6.2-9.4-18.7-11.5-28.1-5.2l-5.2%2c3.1l-54.2-94.8c-4.2-6.2-10.4-10.4-17.7-10.4h-57.3v-43.7h37.5 c11.5%2c0%2c20.8-9.4%2c20.8-20.8c0-11.5-9.4-20.8-20.8-20.8h-37.5v-26c0-11.5-9.4-20.8-20.8-20.8c-11.3%2c0-20.6%2c9.2-20.8%2c20.4 c-83.8%2c7.4-150%2c78.2-150%2c163.9c0%2c90.6%2c74%2c164.6%2c164.6%2c164.6c54.7%2c0%2c104.4-26.6%2c134.9-68.9c11.5%2c10.5%2c21.3%2c5.4%2c24.4%2c3.3l25-15.6 C423.733%2c401.1%2c425.833%2c388.6%2c419.633%2c379.2z M230.033%2c449c-68.7%2c0-123.9-55.2-123.9-123.9c0-63.8%2c47.6-115.9%2c109.4-123.1v89.8 c0%2c11.5%2c9.4%2c20.8%2c20.8%2c20.8h65.6l39.1%2c68C319.733%2c422%2c277.233%2c449%2c230.033%2c449z'/%3e%3cpath d='M235.233%2c118.8c33.3%2c0%2c59.4-27.1%2c59.4-59.4s-26-59.4-59.4-59.4c-32.3%2c0-59.4%2c27.1-59.4%2c59.4 C175.933%2c91.7%2c201.933%2c118.8%2c235.233%2c118.8z M235.233%2c39.6c10.4%2c0%2c19.8%2c8.3%2c18.7%2c18.7c0%2c10.4-8.3%2c18.7-18.7%2c18.7 s-18.7-8.3-18.7-18.7C216.533%2c48%2c224.833%2c39.6%2c235.233%2c39.6z'/%3e%3c/g%3e%3c/g%3e%3cg%3e%3c/g%3e%3cg%3e%3c/g%3e%3c/svg%3e");
}
.terrace {
  background-image: url("data:image/svg+xml,%3Csvg version='1.0' xmlns='http://www.w3.org/2000/svg' widt='100%' height='100%' viewBox='0 0 64.000000 64.000000' preserveAspectRatio='xMidYMid meet'%3E%3Cg transform='translate(0.000000,64.000000) scale(0.100000,-0.100000)'%0Afill='%23000000' stroke='none'%3E%3Cpath d='M145 533 c-128 -37 -145 -45 -145 -74 0 -30 37 -41 124 -38 44 1 105%0A1 134 1 l52 -2 0 -95 0 -95 -56 0 c-34 0 -53 -4 -49 -10 3 -5 22 -10 42 -10%0A22 0 41 -7 49 -17 15 -21 19 -73 4 -73 -12 0 -34 -40 -26 -48 4 -3 13 3 21 14%0A13 17 14 17 15 2 0 -10 5 -18 10 -18 6 0 10 8 10 18 1 15 2 15 15 -2 8 -11 17%0A-17 21 -14 8 8 -14 48 -26 48 -15 0 -11 52 4 72 8 11 27 18 49 18 20 0 39 5%0A42 10 4 6 -15 10 -49 10 l-56 0 0 95 0 95 53 2 c28 0 89 0 133 -1 47 -2 90 2%0A103 8 23 13 28 43 8 59 -24 20 -265 82 -314 81 -26 -1 -102 -17 -168 -36z%0Am230 -10 l40 -28 -47 -3 c-27 -2 -69 -2 -95 0 l-48 3 40 28 c22 15 47 27 55%0A27 8 0 33 -12 55 -27z m-157 -8 c-25 -17 -51 -25 -79 -25 -54 0 -47 6 32 30%0A85 25 90 24 47 -5z m267 -2 c42 -12 53 -18 37 -21 -42 -7 -11 -22 44 -22 40 0%0A55 -4 52 -12 -6 -16 -137 -23 -151 -9 -7 7 -6 15 3 26 7 8 9 15 4 15 -5 0 -27%0A12 -49 26 -42 26 -37 26 60 -3z m-307 -55 c-3 -9 -28 -13 -78 -13 -50 0 -75 4%0A-77 13 -4 9 16 12 77 12 61 0 81 -3 78 -12z m260 0 c-6 -18 -230 -18 -235 0%0A-4 9 24 12 117 12 93 0 121 -3 118 -12z'/%3E%3Cpath d='M59 276 c10 -12 12 -40 9 -111 -5 -91 3 -123 16 -70 6 22 12 25 51%0A25 39 0 45 -3 51 -25 9 -37 28 -31 20 6 -3 17 -6 44 -6 60 0 28 -1 29 -54 29%0Al-55 0 -3 47 c-2 38 -7 49 -23 52 -17 3 -18 1 -6 -13z m121 -121 c0 -11 -12%0A-15 -45 -15 -33 0 -45 4 -45 15 0 11 12 15 45 15 33 0 45 -4 45 -15z'/%3E%3Cpath d='M557 283 c-4 -3 -7 -26 -7 -50 l0 -43 -55 0 c-54 0 -55 -1 -55 -29 0%0A-16 -3 -43 -6 -60 -8 -37 11 -43 20 -6 6 22 12 25 51 25 39 0 45 -3 51 -25 13%0A-53 21 -21 16 70 -3 68 -1 99 8 110 10 12 10 15 -2 15 -8 0 -18 -3 -21 -7z%0Am-7 -128 c0 -11 -12 -15 -45 -15 -33 0 -45 4 -45 15 0 11 12 15 45 15 33 0 45%0A-4 45 -15z'/%3E%3C/g%3E%3C/svg%3E");
}
.icon_bus2 {
  background-image: url("data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512;' xml:space='preserve'%3E%3Cg%3E%3Cg%3E%3Cpolygon points='111.263,391.157 111.263,422.557 141.042,422.557 141.042,478.878 172.441,478.878 172.441,422.557 342.24,422.557 342.24,478.878 373.639,478.878 373.639,422.557 403.418,422.557 403.418,391.157 '/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3Cg%3E%3Cpath d='M512,140.491V33.122H0v107.37h34.076v306.171H18.945v31.399h61.66v-31.399h-15.13V296.064h383.73v150.598h-15.131v31.399 h61.662v-31.399h-15.131V140.491H512z M307.379,262.634H203.769v-32.04h103.611V262.634z M449.206,264.665H338.779v-65.471H172.37 v65.471H65.476V140.491h383.73V264.665z M480.601,109.093H34.076h-2.677v-0.001V64.521h449.202V109.093z'/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E");
}
.icon_taxi2 {
  background-image: url("data:image/svg+xml,%3Csvg version='1.1' width='100%' height='100%' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 294.841 294.841' style='enable-background:new 0 0 294.841 294.841;' xml:space='preserve'%3E%3Cg%3E%3Cpath d='M64.78,72.898c13.162,0,23.831-10.662,23.831-23.831c0-13.161-10.669-23.823-23.831-23.823 c-13.165,0-23.832,10.662-23.832,23.823C40.948,62.236,51.615,72.898,64.78,72.898z'/%3E%3Cpath d='M93.667,98h63.99c5.629,0,10.191-4.563,10.191-10.191s-4.563-10.191-10.191-10.191 c-54.999-0.031-111.486-0.041-112.848,0.027c-4.092,0.205-8.1,1.982-9.903,5.932L0.923,158.024 c-2.337,5.121-0.081,11.166,5.039,13.504c5.128,2.34,11.169,0.075,13.504-5.039l16.424-35.979c0,40.338-0.03,126.857-0.03,126.857 c0,6.755,5.476,12.23,12.231,12.23s12.23-5.476,12.23-12.23v-72.879h8.917v72.879c0,6.755,5.476,12.23,12.23,12.23 c6.755,0,12.23-5.476,12.23-12.23C93.698,111.141,93.667,194.591,93.667,98z'/%3E%3Cpath d='M290.206,154.464h-15.892l-11.085-27.976c-2.397-6.05-8.246-10.023-14.754-10.023h-85.578 c-6.604,0-12.517,4.089-14.848,10.267l-10.466,27.733h-15.608c-2.56,0-4.635,2.075-4.635,4.635v8.73 c0,2.559,2.075,4.635,4.635,4.635h10.781v35.966c0,5.817,4.716,10.534,10.534,10.534h4.8v3c0,8.284,6.716,15,15,15s15-6.716,15-15 v-3h56v3c0,8.284,6.716,15,15,15c8.284,0,15-6.716,15-15v-3h4.799c5.818,0,10.534-4.717,10.534-10.534v-35.966h10.782 c2.56,0,4.635-2.075,4.635-4.635v-8.73C294.841,156.539,292.765,154.464,290.206,154.464z M180.249,194.412 c0,2.609-2.162,4.636-4.635,4.636h-25.047c-2.475,0-4.635-2.027-4.635-4.636v-8.729c0-2.609,2.162-4.636,4.635-4.636h25.047 c2.475,0,4.635,2.027,4.635,4.636V194.412z M266.249,194.412c0,2.609-2.162,4.636-4.635,4.636h-25.047 c-2.475,0-4.635-2.027-4.635-4.636v-8.729c0-2.609,2.162-4.636,4.635-4.636h25.047c2.475,0,4.635,2.027,4.635,4.636V194.412z'/%3E%3Cpath d='M191.341,108.464h29.5c4.143,0,7.5-3.357,7.5-7.5c0-4.143-3.357-7.5-7.5-7.5h-29.5c-4.143,0-7.5,3.357-7.5,7.5 C183.841,105.107,187.198,108.464,191.341,108.464z'/%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E");
}
.icon_variety2{
background-image: url("data:image/svg+xml,%3Csvg width='100%' height='100%' viewBox='0 0 52 52' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' enable-background='new 0 0 52 52' xml:space='preserve'%3E%3Cpath d='M31.6,21.6c-1.2,0-2.2-1-2.2-2.2V5.5c0-1.2,1-2.2,2.2-2.2h14.2c1.2,0,2.2,1,2.2,2.2v13.9 c0,1.2-1,2.2-2.2,2.2H31.6z' /%3E%3Cpath d='M37.7,29.8l-8.2,8.9c-0.5,0.5-0.5,1.3,0,1.9l8.2,8.9c0.5,0.6,1.5,0.6,2,0l8.2-8.9c0.5-0.5,0.5-1.3,0-1.9 l-8.2-8.9C39.2,29.2,38.3,29.2,37.7,29.8z' /%3E%3Ccircle cx='13' cy='39.4' r='9.3' /%3E%3Cpath d='M4.8,6.5l7.2-4.1c0.7-0.4,1.5-0.4,2.1,0l7.1,4.1c0.7,0.4,1.1,1.1,1.1,1.9v8.2c0,0.8-0.4,1.5-1.1,1.9 l-7.1,4.1c-0.7,0.4-1.5,0.4-2.1,0l-7.2-4.1c-0.7-0.4-1.1-1.1-1.1-1.9V8.4C3.7,7.6,4.1,6.9,4.8,6.5z' /%3E%3C/svg%3E%0A");
}
.icon_confectionery2 {
background-image: url("data:image/svg+xml,%3Csvg width='100%' height='100%' viewBox='0 0 15 15' id='confectionery' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13,4a1,1,0,0,0-1-1,1,1,0,0,0-2,0V5.0673A3.4808,3.4808,0,0,0,4.3583,9H2a1,1,0,0,0,0,2,1,1,0,0,0,1,1,1,1,0,0,0,2,0V9.9326A3.4807,3.4807,0,0,0,10.6417,6H13a1,1,0,0,0,0-2ZM7.5,9.9925A2.484,2.484,0,0,1,6.3184,5.319a1.0809,1.0809,0,0,1,.5459.307A2.1243,2.1243,0,0,1,7.25,7.0117l.001.9561A2.5821,2.5821,0,0,0,7.76,9.7031a1.5462,1.5462,0,0,0,.2591.2333A2.4861,2.4861,0,0,1,7.5,9.9925ZM8.6815,9.681a1.0813,1.0813,0,0,1-.5458-.307A2.1243,2.1243,0,0,1,7.75,7.9883l-.001-.9561A2.5821,2.5821,0,0,0,7.24,5.2969a1.5557,1.5557,0,0,0-.2592-.2334A2.4843,2.4843,0,0,1,8.6815,9.681Z'/%3E%3C/svg%3E%0A");
}
.icon_mall2 {
background-image: url("data:image/svg+xml,%3Csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='100%' height='100%' viewBox='0 0 32 32' style='enable-background:new 0 0 32 32;' xml:space='preserve'%3E%3Cg%3E%3Cpath d='M22.084,13.754V8.079l-1.282-0.247v-3.12l-4.567-1.104V3.602l-0.016,0.003l-0.015-0.003v0.007l-4.79,1.148v3.141 l-1.302,0.248v5.774L0,14.929v11.555l16.232,1.915l0.959-0.113v-5.477l4.318-0.164v5.127L32,26.545V14.773L22.084,13.754z M1.127,15.684l3.223-0.27v0.815l-3.223,0.225V15.684z M4.35,23.254l-3.223-0.17v-0.771l3.223,0.124V23.254z M4.35,21.59 l-3.223-0.076v-0.771l3.223,0.031V21.59z M4.358,19.766l-3.224,0.025V19.02l3.224-0.07V19.766z M4.358,18.101L1.134,18.22v-0.771 l3.224-0.166V18.101z M5.257,15.35l3.749-0.313v0.883l-3.749,0.26V15.35z M9.006,23.514l-3.749-0.199v-0.828l3.749,0.146V23.514z M9.006,21.713l-3.749-0.09v-0.828l3.749,0.037V21.713z M9.017,19.742L5.266,19.77v-0.828l3.751-0.083V19.742z M9.017,17.941 L5.266,18.08v-0.83l3.751-0.19V17.941z M10.778,9.237l4.52-0.777v0.971l-4.52,0.713V9.237z M10.778,11.088l4.52-0.646v0.972 l-4.52,0.582V11.088z M10.768,12.97l4.519-0.514v0.972l-4.519,0.449V12.97z M10.768,14.82l4.519-0.383v0.972l-4.519,0.318V14.82z M15.286,23.772l-4.519-0.233v-0.907l4.519,0.17V23.772z M15.286,21.791l-4.519-0.104v-0.907l4.519,0.039V21.791z M15.299,19.619 l-4.521,0.039v-0.906l4.521-0.104V19.619z M15.299,17.637l-4.521,0.171v-0.908l4.521-0.233V17.637z M17.166,8.508l4.322,0.746 v0.933l-4.322-0.683V8.508z M17.141,12.557l4.324,0.488v0.933l-4.324-0.425V12.557z M17.152,14.526l4.324,0.362v0.934l-4.324-0.3 V14.526z M17.171,18.726l4.322,0.096v0.933l-4.322-0.03V18.726z M21.499,21.735l-4.319,0.103v-0.996l4.319-0.039V21.735z M21.499,17.875l-4.319-0.159v-0.995l4.319,0.223V17.875z M21.499,12.031l-4.319-0.557v-0.996l4.319,0.62V12.031z M23.125,15.005 l3.617,0.305v0.855l-3.617-0.252V15.005z M26.762,17.194v0.855l-3.613-0.136v-0.907L26.762,17.194z M23.141,18.836l3.616,0.08 v0.855l-3.616-0.027V18.836z M23.146,20.766l3.615-0.031v0.855l-3.615,0.084V20.766z M26.771,23.278l-3.614,0.19V22.56l3.614-0.138 V23.278z M27.798,15.396l3.106,0.262v0.795l-3.106-0.216V15.396z M30.921,17.408v0.793l-3.104-0.115v-0.84L30.921,17.408z M27.812,18.938l3.104,0.069v0.794l-3.104-0.023V18.938z M27.816,20.721l3.104-0.026v0.794l-3.104,0.073V20.721z M30.93,23.057 l-3.104,0.163v-0.841l3.104-0.116V23.057z'/%3E%3C/g%3E%3C/svg%3E%0A");
}
.icon_florist2{
background-image: url("data:image/svg+xml,%3Csvg version='1.1' id='Capa_1' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 457.996 457.996' style='enable-background:new 0 0 457.996 457.996;' xml:space='preserve'%3E%3Cpath d='M457.996,228.998c0-29.372-28.261-53.269-62.998-53.269c-10.401,0-30.506,2.241-52.363,6.199 c18.254-12.657,34.055-25.288,41.41-32.643c24.563-24.563,27.648-61.443,6.879-82.213c-20.769-20.771-57.65-17.684-82.212,6.879 c-7.355,7.355-19.987,23.157-32.643,41.41c3.958-21.857,6.199-41.962,6.199-52.363C282.267,28.261,258.371,0,228.998,0 s-53.269,28.261-53.269,62.998c0,10.401,2.242,30.507,6.199,52.364c-12.657-18.253-25.288-34.055-32.643-41.411h0 c-24.563-24.563-61.443-27.647-82.213-6.879c-20.769,20.77-17.683,57.65,6.88,82.213c7.355,7.355,23.156,19.986,41.41,32.643 c-21.857-3.957-41.962-6.199-52.364-6.199C28.261,175.729,0,199.626,0,228.998s28.261,53.269,62.998,53.269 c10.401,0,30.507-2.242,52.364-6.199c-18.254,12.657-34.055,25.289-41.41,32.643c-24.563,24.563-27.649,61.443-6.879,82.213 c8.966,8.966,21.448,13.855,34.952,13.855c2.114,0,4.255-0.12,6.41-0.363c14.884-1.678,29.392-8.913,40.85-20.372 c7.355-7.354,19.987-23.156,32.644-41.41c-3.958,21.857-6.199,41.963-6.199,52.364c0,34.737,23.896,62.998,53.269,62.998 s53.269-28.261,53.269-62.998c0-10.401-2.242-30.507-6.199-52.365c12.657,18.254,25.288,34.056,32.644,41.411 c11.458,11.459,25.966,18.694,40.85,20.372c2.156,0.243,4.296,0.363,6.411,0.363c13.502,0,25.986-4.89,34.951-13.855 c20.77-20.77,17.684-57.65-6.879-82.213c-7.354-7.355-23.156-19.986-41.41-32.643c21.857,3.958,41.962,6.199,52.363,6.199 C429.735,282.267,457.996,258.37,457.996,228.998z M329.924,95.164c12.648-12.646,30.866-15.797,39.786-6.879 c8.919,8.919,5.769,27.14-6.879,39.787c-7.705,7.704-29.105,24.305-51.583,38.747c-6.641,4.268-12.556,7.823-17.794,10.778 c-3.854-4.823-8.233-9.203-13.056-13.056c2.955-5.238,6.51-11.152,10.778-17.793C305.62,124.271,322.22,102.869,329.924,95.164z M176.501,228.998c0-28.947,23.55-52.497,52.497-52.497s52.497,23.55,52.497,52.497s-23.55,52.497-52.497,52.497 S176.501,257.945,176.501,228.998z M228.998,30c12.613,0,23.269,15.111,23.269,32.998c0,10.896-3.395,37.767-9.076,63.874 c-1.674,7.694-3.338,14.375-4.949,20.16c-3.037-0.34-6.118-0.531-9.244-0.531c-3.126,0-6.207,0.191-9.244,0.531 c-1.611-5.786-3.275-12.466-4.949-20.16c-5.681-26.107-9.076-52.979-9.076-63.874C205.729,45.111,216.385,30,228.998,30z M95.165,128.072c-12.647-12.647-15.798-30.868-6.879-39.787c3.437-3.437,8.254-5.081,13.602-5.081 c8.531,0,18.411,4.186,26.185,11.96c7.705,7.705,24.305,29.106,38.748,51.584c4.269,6.644,7.822,12.557,10.777,17.794 c-4.822,3.853-9.201,8.232-13.054,13.054c-5.238-2.954-11.152-6.509-17.794-10.777C124.27,152.376,102.869,135.776,95.165,128.072z M62.998,252.267C45.111,252.267,30,241.611,30,228.998s15.111-23.269,32.998-23.269c10.896,0,37.767,3.395,63.874,9.076 c7.694,1.674,14.376,3.338,20.161,4.949c-0.34,3.037-0.531,6.117-0.531,9.243s0.191,6.207,0.531,9.243 c-5.785,1.611-12.467,3.275-20.161,4.949C100.765,248.872,73.894,252.267,62.998,252.267z M128.071,362.831 c-6.576,6.576-14.958,10.868-22.999,11.774c-3.99,0.451-11.48,0.413-16.787-4.895c-8.919-8.919-5.769-27.14,6.879-39.787 c7.705-7.704,29.105-24.304,51.583-38.747c6.644-4.269,12.556-7.822,17.795-10.777c3.853,4.822,8.233,9.202,13.055,13.055 c-2.956,5.239-6.51,11.153-10.778,17.793C152.376,333.726,135.776,355.127,128.071,362.831z M228.998,427.996 c-12.613,0-23.269-15.111-23.269-32.998c0-10.896,3.395-37.767,9.076-63.874c1.674-7.693,3.338-14.376,4.948-20.16 c3.037,0.34,6.118,0.531,9.244,0.531c3.126,0,6.207-0.191,9.244-0.531c1.611,5.786,3.275,12.467,4.949,20.16 c5.682,26.107,9.076,52.979,9.076,63.874C252.267,412.885,241.611,427.996,228.998,427.996z M362.832,329.924 c12.647,12.647,15.798,30.868,6.879,39.787c-5.307,5.307-12.798,5.344-16.787,4.895c-8.04-0.906-16.423-5.198-22.999-11.774 c-7.704-7.705-24.305-29.105-38.748-51.583c-4.268-6.642-7.821-12.554-10.777-17.794c4.822-3.854,9.201-8.232,13.055-13.055 c5.239,2.955,11.151,6.509,17.794,10.777C333.726,305.619,355.126,322.22,362.832,329.924z M331.125,243.19 c-7.693-1.674-14.376-3.338-20.161-4.948c0.34-3.037,0.531-6.118,0.531-9.244s-0.191-6.207-0.531-9.244 c5.786-1.61,12.467-3.274,20.161-4.949c26.106-5.682,52.978-9.076,63.873-9.076c17.887,0,32.998,10.655,32.998,23.269 s-15.111,23.269-32.998,23.269C384.102,252.267,357.231,248.872,331.125,243.19z'/%3E%3Cg%3E%3C/g%3E%3C/svg%3E");
}
.icon_clothes2 {
  background-image: url("data:image/svg+xml,%3Csvg xmlns:dc='http://purl.org/dc/elements/1.1/' xmlns:cc='http://creativecommons.org/ns%23' xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns%23' xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' version='1.1' width='100%' height='100%' viewBox='0 0 14 14' id='svg2'%3E%3Cmetadata id='metadata8'%3E%3Crdf:RDF%3E%3Ccc:Work rdf:about=''%3E%3Cdc:format%3Eimage/svg+xml%3C/dc:format%3E%3Cdc:type rdf:resource='http://purl.org/dc/dcmitype/StillImage' /%3E%3Cdc:title%3E%3C/dc:title%3E%3C/cc:Work%3E%3C/rdf:RDF%3E%3C/metadata%3E%3Cdefs id='defs6' /%3E%3Crect width='14' height='14' x='0' y='0' id='canvas' style='fill:none;stroke:none;visibility:hidden' /%3E%3Cpath d='M 3,1 0,3 1,6.35 3,5 3,13 11,13 11,5 13,6.35 14,3 11,1 9,1 C 9,2 8,3 7,3 6,3 5,2 5,1 z' id='clothes' style='fill:%23000000;fill-opacity:1;stroke:none' /%3E%3C/svg%3E");
}
.icon_vet2 {
background-image: url("data:image/svg+xml,%3Csvg width='100%' height='100%' viewBox='0 0 50 50' version='1.2' baseProfile='tiny' xmlns='http://www.w3.org/2000/svg' overflow='inherit'%3E%3Cpath d='M18.48 18.875c2.33-.396 4.058-2.518 4.321-5.053.267-2.578.869-12.938-3.02-12.279-10.088 1.711-9.38 18.702-1.301 17.332zm13.273 0c8.077 1.37 8.785-15.621-1.303-17.333-3.888-.659-3.287 9.701-3.021 12.279.264 2.536 1.994 4.658 4.324 5.054zm-17.417 8.005c0-1.348-.481-2.57-1.256-3.459-1.275-1.666-5.328-5.035-6.323-4.172-2.077 1.806-2.01 6.251-.759 9.481.643 1.796 2.196 3.059 4.011 3.059 2.389 0 4.327-2.198 4.327-4.909zm29.137-7.631c-.993-.863-5.046 2.506-6.321 4.172-.775.889-1.257 2.111-1.257 3.459 0 2.711 1.94 4.909 4.327 4.909 1.816 0 3.37-1.263 4.013-3.059 1.248-3.23 1.317-7.675-.762-9.481zm-8.136 15.277c-3.676-1.833-3.562-5.363-4.398-8.584-.665-2.569-3.02-4.469-5.823-4.469-2.743 0-5.057 1.821-5.779 4.312-.895 3.082-.356 6.67-4.363 8.717-3.255 1.061-4.573 2.609-4.573 6.27 0 2.974 2.553 6.158 5.848 6.554 3.676.554 6.544-.17 8.867-1.494 2.323 1.324 5.189 2.047 8.871 1.494 3.293-.396 5.847-3.568 5.847-6.554-.001-3.741-1.235-5.135-4.497-6.246zm-4.337 4.474h-3.811l.005 4h-4.156l.006-4h-4.044v-4h4.045l-.006-4h4.156l-.005 4h3.81v4z'/%3E%3C/svg%3E%0A");
}
.icon_dog2 {
background-image: url("data:image/svg+xml,%3Csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='100%' height='100%' viewBox='0 0 235.516 235.515' style='enable-background:new 0 0 235.516 235.515;' xml:space='preserve'%3E%3Cg%3E%3Cg%3E%3Cellipse cx='77.836' cy='88.914' rx='10.583' ry='14.218'/%3E%3Cpath d='M100.862,111.649c5.417,2.21,12.211-1.872,15.19-9.125c2.981-7.264,1.034-14.952-4.39-17.176 c-5.384-2.216-12.193,1.875-15.166,9.123C93.513,101.747,95.477,109.417,100.862,111.649z'/%3E%3Cpath d='M54.801,111.649c5.394-2.232,7.35-9.902,4.366-17.178c-2.966-7.248-9.766-11.331-15.168-9.123 c-5.424,2.216-7.37,9.913-4.388,17.176C42.601,109.77,49.401,113.854,54.801,111.649z'/%3E%3Cpath d='M235.516,176.918l-16.121-48.911c-0.028-0.092-0.137-0.12-0.177-0.2c-1.848-14.18-33.438-21.888-63.462-21.888 c-2.597,0-5.197,0.136-7.794,0.249c-4.204-18.951-8.528-38.543-6.188-57.524c0.016-0.163-0.124-0.261-0.124-0.411 c1.065-1.222,1.795-2.533,1.795-4.043V28.373c0-15.549-63.225-15.729-65.908-15.729c-2.69,0-65.92,0.18-65.92,15.729v15.815 c0,1.491,0.739,2.801,1.797,4.027c0,0.159-0.134,0.265-0.11,0.415c2.334,19.077-2.023,38.766-6.242,57.813 c-4.338,19.589-8.83,39.842-6.357,60.111c1.961,14.819,19.502,25.904,33.873,25.904h2.358c-1.986,3.138-3.332,6.692-3.332,10.503 c0,3.326,0.859,6.66,2.484,9.622c3.515,6.348,10.197,10.287,17.433,10.287c2.098,0,4.171-0.32,5.843-0.905 c6.233-1.379,13.565-7.206,21.776-17.309h73.33c0.429,0,0.842,0.044,1.263,0.044c0.429,0,0.838-0.044,1.267-0.044h16.903 c8.227,10.103,15.54,15.93,21.491,17.216c1.983,0.661,4.067,0.998,6.147,0.998c7.254,0,13.922-3.939,17.448-10.303 c1.619-2.946,2.469-6.256,2.469-9.622c0-3.503-1.183-6.753-2.881-9.73C228.956,188.512,235.516,182.853,235.516,176.918z M219.603,185.43c1.134-2.517,1.888-5.182,1.888-8.011c0-3.351-0.854-6.664-2.477-9.622c-3.499-6.348-10.183-10.287-17.444-10.287 c-2.068,0-4.132,0.321-5.823,0.886c-6.219,1.398-13.549,7.21-21.776,17.296h-23.082h-8.392H83.298l7.859-23.579l4.929-14.796 c0.958,0.966,1.981,1.876,3.242,2.757c0.008,0,0.008,0.017,0.008,0.017s0.008,0,0.016,0c1.487,1.025,2.994,2.056,4.867,2.962 c10.772,5.226,27.312,8.187,44.116,8.892c2.224,0.104,4.456,0.213,6.684,0.229c0.257,0,0.51,0.017,0.77,0.017 c24.61,0,50.161-5.214,59.707-14.872l13.32,40.03C228.443,179.696,225.021,182.561,219.603,185.43z M214.794,202.939 c0,2.268-0.533,4.416-1.631,6.396c-2.333,4.216-6.777,6.837-11.598,6.837c-1.383,0-2.737-0.229-4.389-0.758 c-4.132-0.897-9.706-5.406-15.869-12.499c-0.874-1.018-1.724-1.96-2.612-3.073c-0.193-0.221-0.369-0.397-0.554-0.63l-1.002-1.271 H157.03h-2.561h-34.109h-14.312h-28.12l-1.006,1.271c-7.44,9.386-14.182,15.145-19.326,16.286 c-5.941,1.948-12.662-0.77-15.663-6.163c-1.088-1.995-1.639-4.132-1.639-6.388c0-3.939,1.751-7.674,4.791-10.219l0.353-0.301 l2.729-2.269l-3.082-2.561c-0.621-0.513-0.928-1.25-1.438-1.848c-1.992-2.368-3.352-5.197-3.352-8.331 c0-2.256,0.551-4.408,1.631-6.372c2.342-4.231,6.785-6.837,11.596-6.837c1.384,0,2.757,0.213,4.398,0.734 c4.813,1.073,11.58,6.824,19.02,16.205l0.693,0.854l0.314,0.397h4.324h4.743h46.442h11.762h31.951l0.998-1.251 c7.449-9.381,14.214-15.14,19.319-16.298c6.012-1.932,12.672,0.781,15.653,6.18c1.106,1.995,1.643,4.132,1.643,6.388 c0,3.939-1.743,7.674-4.793,10.211l-3.081,2.577l0.437,0.353l2.661,2.208c0.092,0.076,0.136,0.188,0.212,0.269 c0.906,0.789,1.487,1.799,2.133,2.765C213.784,197.925,214.794,200.318,214.794,202.939z M155.756,112.595 c35.406,0,57.122,9.586,57.122,16.455c0,6.868-21.732,16.47-57.122,16.47c-0.429,0-0.805-0.048-1.218-0.048 c-2.332-0.016-4.517-0.137-6.717-0.229c-8.868-0.385-16.743-1.318-23.399-2.701c6.773-1.595,14.552-2.604,22.895-3.033 c2.208-0.124,4.425-0.217,6.701-0.232c0.589-0.016,1.158-0.076,1.755-0.076c1.848,0,3.351-1.486,3.351-3.342 c0-1.84-1.495-3.343-3.351-3.343c-0.89,0-1.731,0.076-2.621,0.093c-2.28,0.031-4.508,0.136-6.725,0.244 c-13.216,0.737-25.243,2.913-34.169,6.332c-2.284-0.826-4.3-1.688-6.029-2.589c3.557-2.854,10.245-5.566,19.228-7.546 c5.723-1.255,12.315-2.244,19.845-2.714c2.152-0.136,4.461-0.168,6.744-0.212c1.251-0.032,2.441-0.124,3.735-0.124 c1.848,0,3.351-1.487,3.351-3.343c0-1.839-1.495-3.338-3.351-3.338c-1.695,0-3.298,0.09-4.953,0.144 c-2.292,0.058-4.568,0.134-6.769,0.285c-16.354,1.1-30.088,4.44-38.463,9.317c-0.441,0.261-0.763,0.553-1.164,0.813 c-1.411,0.905-2.677,1.855-3.711,2.854c-1.204-1.259-2.043-2.501-2.043-3.667c0-1.471,1.196-3.082,3.102-4.661 c5.849-4.907,20.111-9.812,40.861-11.311c2.141-0.158,4.501-0.185,6.777-0.269C151.509,112.738,153.532,112.595,155.756,112.595z M77.543,37.4c-18.254,0-32.672-1.491-42.735-3.338c13.305-3.643,24.796-3.573,43.268-2.417c1.8-0.072,3.425-1.302,3.543-3.136 c0.118-1.843-1.289-3.43-3.132-3.536c-23.275-1.477-36.584-1.281-55.815,6.037c-2.427-0.874-3.943-1.691-4.35-2.343v-0.076 c1.789-3.346,22.93-9.257,59.222-9.257c36.443,0,57.643,5.959,59.278,8.776C135.202,31.439,114.001,37.4,77.543,37.4z M18.322,44.181v-8.225c0.769,0.375,1.587,0.735,2.448,1.072c0.591,0.491,1.281,0.81,2.06,0.81c0.038,0,0.076-0.024,0.13-0.024 c18.3,6.141,52.614,6.268,54.583,6.268c2.152,0,42.981-0.143,59.238-8.142l0.023,7.985c-1.631,3.334-22.826,9.295-59.268,9.295 C41.094,53.219,19.917,47.258,18.322,44.181z M34.586,185.75c-11.139,0-25.77-8.96-27.239-20.045 c-2.33-19.1,2.024-38.771,6.24-57.817c3.995-18.051,7.88-36.668,6.562-55.298c17.32,7.183,55.323,7.321,57.395,7.321 c2.074,0,40.062-0.138,57.375-7.321c-1.271,18.182,2.376,36.347,6.287,53.986c-18.283,1.499-35.329,5.763-43.737,12.639 c-5.841-5.55-13.737-9.073-19.72-9.059c-9.648,0.008-24.421,9.335-27.112,21.522c-0.487,1.526-0.78,3.153-0.771,4.849 c0.032,5.979,3.32,11.128,8.189,13.837c2.26,1.247,4.875,1.94,7.646,1.94c4.891,0,9.245-2.232,12.129-5.727 c1.733,2.067,4.067,3.479,6.616,4.436l-6.877,20.663c-6.75-7.498-12.85-12.066-17.889-13.197 c-8.975-2.873-19.063,1.146-23.59,9.334c-1.617,2.925-2.477,6.255-2.477,9.605c0,2.957,0.86,5.727,2.082,8.331H34.586 L34.586,185.75z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A");
}
.icon_housedog2 {
background-image: url("data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 511.999 511.999' style='enable-background:new 0 0 511.999 511.999;' xml:space='preserve'%3E%3Cg%3E%3Cg%3E%3Cg%3E%3Cpath d='M511.896,173.728c-0.321-1.876-1.373-3.549-2.928-4.649L291.195,14.891c-8.395-5.952-19.674-5.953-28.065-0.002 L45.353,169.079c-1.554,1.101-2.608,2.773-2.928,4.649c-0.322,1.877,0.117,3.804,1.218,5.359l19.775,27.924 c1.4,1.975,3.614,3.03,5.863,3.03c1.434,0,2.882-0.428,4.142-1.321l13.343-9.448v260.827H17.424 c-2.985,0-5.659,1.848-6.714,4.641L0.464,491.858c-0.834,2.205-0.531,4.679,0.81,6.618c1.34,1.939,3.547,3.096,5.905,3.096 h453.198c3.964,0,7.178-3.215,7.178-7.178V199.271l13.343,9.448c3.234,2.289,7.713,1.525,10.005-1.71l19.776-27.924 C511.779,177.532,512.217,175.605,511.896,173.728z M17.563,487.217l4.821-12.762h78.057l4.821,12.762H17.563z M166.339,487.217 h-45.729l-8.494-22.478c-1.055-2.792-3.729-4.641-6.714-4.641h-4.277v-13.342h65.215V487.217z M166.339,432.4h-65.215v-40.447 h65.215V432.4z M166.339,358.654v18.943h-65.215v-40.46h67.318C167.067,344.1,166.339,351.292,166.339,358.654z M101.125,322.78 v-40.46h95.769c-10.888,11.443-19.36,25.207-24.593,40.46H101.125z M373.625,487.217h-192.93V358.654 c0-53.19,43.274-96.464,96.465-96.464c53.19,0,96.464,43.273,96.464,96.464V487.217z M453.195,377.597h-65.214v-18.944 c0-7.36-0.729-14.554-2.104-21.517h67.318V377.597z M453.196,487.217h-65.215v-40.459h65.215V487.217z M453.196,432.4h-65.215 v-40.447h65.215V432.4z M453.197,322.78h-0.001H382.02c-5.233-15.254-13.703-29.016-24.592-40.46h95.769V322.78z M453.197,267.963h-0.001H340.777c-18.018-12.677-39.962-20.13-63.616-20.13c-23.655,0-45.6,7.453-63.618,20.13H101.125v-40.456 h89.897v7.237c0,3.964,3.215,7.178,7.178,7.178h157.922c3.964,0,7.178-3.215,7.178-7.178v-7.237h89.896V267.963z M352.606,117.883l57.143,40.46H363.3v-8.542c0-3.964-3.215-7.178-7.178-7.178H198.199c-3.964,0-7.178,3.215-7.178,7.178v8.542 h-46.45l57.144-40.46H352.606z M221.992,103.526l55.169-39.062l55.169,39.062H221.992z M430.025,172.7l23.172,16.406v24.045 H363.3V172.7H430.025z M348.944,156.98v70.587H205.378V156.98H348.944z M191.021,172.7v40.451h-89.896v-24.045l23.172-16.406 H191.021z M483.334,192.854L281.308,49.811c-1.242-0.879-2.695-1.32-4.148-1.32s-2.906,0.44-4.148,1.32L70.986,192.854 l-11.478-16.207L271.43,26.603c3.426-2.431,8.034-2.43,11.465,0.002l211.919,150.041L483.334,192.854z'/%3E%3Cpath d='M234.489,222.182c11.874,0,21.535-9.661,21.535-21.535c0-0.402-0.037-0.798-0.06-1.196h42.391 c-0.022,0.398-0.06,0.794-0.06,1.196c0,11.874,9.661,21.535,21.535,21.535c11.875,0,21.536-9.661,21.536-21.535 c0-2.91-0.579-5.743-1.699-8.375c1.12-2.633,1.699-5.465,1.699-8.375c0-11.874-9.661-21.535-21.536-21.535 c-11.874,0-21.535,9.661-21.535,21.535c0,0.402,0.037,0.798,0.06,1.196h-42.391c0.022-0.398,0.06-0.794,0.06-1.196 c0-11.874-9.661-21.535-21.535-21.535s-21.535,9.661-21.535,21.535c0,2.91,0.579,5.743,1.698,8.375 c-1.119,2.632-1.698,5.465-1.698,8.375C212.954,212.522,222.615,222.182,234.489,222.182z M314.012,188.078 c-0.889-1.234-1.359-2.68-1.359-4.18c0-3.959,3.219-7.178,7.178-7.178c3.959,0,7.18,3.221,7.18,7.178 c0,1.5-0.47,2.944-1.359,4.178c-1.807,2.506-1.805,5.887,0.001,8.394c0.888,1.232,1.358,2.676,1.358,4.178 c0,3.959-3.221,7.178-7.18,7.178s-7.178-3.219-7.178-7.178c0-1.5,0.47-2.945,1.358-4.179 C315.816,193.963,315.816,190.583,314.012,188.078z M228.669,188.076c-0.888-1.232-1.358-2.676-1.358-4.178 c0-3.959,3.219-7.178,7.178-7.178c3.959,0,7.178,3.221,7.178,7.178c0,1.501-0.47,2.945-1.358,4.178 c-1.807,2.506-1.805,5.887,0.001,8.394c0.887,1.231,1.357,2.676,1.357,4.178c0,3.959-3.219,7.178-7.178,7.178 c-3.959,0-7.178-3.219-7.178-7.178c0-1.501,0.47-2.945,1.357-4.178C230.474,193.964,230.475,190.582,228.669,188.076z'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
.icon_pharmacy2 {
  background-image: url("data:image/svg+xml,%3Csvg version='1.1' id='Capa_1' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 488.9 488.9' style='enable-background:new 0 0 488.9 488.9;' xml:space='preserve'%3E%3Cg%3E%3Cg%3E%3Cpath d='M412.759,89.1h-133.7c-5.4,0-10.1,4.7-10.1,10.1v63c0,7.4,7.8,12.4,14.4,8.9l133.7-62.9 C426.759,103.4,423.259,89.1,412.759,89.1z'/%3E%3Cpath d='M220.059,162.1v-63c0-5.4-4.7-10.1-10.1-10.1h-133.7c-10.9,0-14,14.8-4.3,19l133.7,63.3 C212.259,174.6,220.059,169.5,220.059,162.1z'/%3E%3Cpath d='M270.159,187c-5.4-0.8-10.1,3.1-10.9,8.5s3.1,10.1,8.5,10.9c32.3,4.3,47,15.9,47,22.1c0,8.5-23.7,21.4-60.2,23.7v-183l0,0 c14.8-4.3,25.6-17.9,25.6-33.8c-0.4-19.4-16.3-35.4-35.7-35.4c-19.4,0-35.4,15.9-35.4,35.4c0,16.3,10.9,29.9,25.6,33.8v183 c-36.5-1.9-60.2-14.8-60.2-23.7c0-6.6,14.8-17.9,47-22.1c5.4-0.8,8.9-5.4,8.5-10.9c-0.8-5.4-5.4-8.9-10.9-8.5 c-39.2,5.4-64.1,21.4-64.1,41.6c0,16.3,15.9,28.4,37.7,35.7c-14,7.8-22.5,18.7-22.5,31.5c0,16.3,14,29.9,36.1,37.3 c-8.9,7.8-14.4,18.3-14.4,29.5c0,13.6,7.8,25.6,19.4,33.4c-12,7.8-19.4,20.2-19.4,33.4c0,14.8,8.9,28.4,23.7,36.1 c4.7,2.7,10.5,0.8,13.2-3.9c2.7-4.7,0.8-10.5-3.9-13.2c-8.5-4.7-13.6-11.7-13.6-19c0-10.5,10.1-19.8,23.7-22.9v72.7 c0,5.4,4.3,9.7,9.7,9.7s9.7-4.3,9.7-9.7v-72.7c13.6,3.1,23.7,12,23.7,22.9c0,7.4-5.1,14.4-13.6,19c-4.7,2.7-6.6,8.5-3.9,13.2 c1.9,3.1,6.4,7.2,13.2,3.9c14.8-8.2,23.7-21.4,23.7-36.1c0-13.6-7.8-25.6-19.4-33.4c12-7.8,19.4-20.2,19.4-33.4 c0-11.7-5.4-21.8-14.4-29.5c21.8-7.4,36.1-21,36.1-37.3c0-12.8-8.5-23.7-22.5-31.5c21.8-7,37.7-19,37.7-35.7 C334.259,208.4,309.759,192.4,270.159,187z M234.759,385.9c-13.6-3.1-23.7-12-23.7-22.9c0-10.5,10.1-19.8,23.7-22.9V385.9z M234.759,319.1c-26.4-1.9-45.1-13.2-45.1-23.3c0-10.1,18.7-21,45.1-23.3L234.759,319.1L234.759,319.1z M254.259,386.3v-45.8 c13.6,3.1,23.7,12,23.7,22.9C277.959,373.9,267.859,383.2,254.259,386.3z M299.259,295.8c0,10.1-18.7,21.4-45.1,23.3v-46.6 C280.659,274.8,299.259,285.7,299.259,295.8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E ");
}
.icon_deco2{
  background-image: url("data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 291.488 291.488' style='enable-background:new 0 0 291.488 291.488;' xml:space='preserve'%3E%3Cg%3E%3Cg%3E%3Cg%3E%3Cpath d='M145.745,0L92.654,33.628C85.102,28.58,80.12,19.983,80.12,10.237h-9.375c0,15.511-12.614,28.125-28.125,28.125v9.375 c6.553,0,12.572,2.269,17.358,6.038L0.432,92.053v57.952l28.125-17.813v37.42c0,12.923-10.514,23.438-23.438,23.438v9.375 c12.923,0,23.438,10.514,23.438,23.438v65.625h37.5h75h121.875V132.192l28.125,17.813V92.03L145.745,0z M75.432,28.378 c3.417,6.155,8.517,11.255,14.672,14.672c-6.155,3.417-11.255,8.513-14.672,14.672c-1.88-3.389-4.308-6.412-7.106-9.056 l-0.117-0.183l-0.052,0.033c-2.24-2.096-4.697-3.966-7.397-5.466C66.915,39.633,72.014,34.537,75.432,28.378z M22.008,197.738 c4.594-2.77,8.466-6.642,11.236-11.236c2.77,4.594,6.642,8.47,11.236,11.236c-4.594,2.77-8.466,6.642-11.236,11.236 C30.474,204.38,26.602,200.508,22.008,197.738z M131.682,282.113h-56.25v-0.001V160.238h56.25V282.113z M253.557,282.112h-112.5 v-131.25h-75v131.25H37.932v-56.25c0-12.923,10.514-23.438,23.438-23.438v-9.375c-12.923,0-23.438-10.514-23.438-23.438v-43.355 l107.812-68.283l30.22,19.139c-7.669,7.884-18.375,12.811-30.22,12.811V99.3c23.259,0,42.188,18.923,42.188,42.188h9.375 c0-15.919,8.869-29.798,21.919-36.98l34.331,21.745V282.112z M192.62,69.211c5.152,11.203,14.203,20.25,25.397,25.402 c-11.198,5.152-20.245,14.198-25.397,25.402c-5.152-11.203-14.203-20.25-25.397-25.402 C178.417,89.461,187.467,80.414,192.62,69.211z M281.682,132.97L281.682,132.97l-51.479-32.606 c2.995-0.675,6.094-1.064,9.291-1.064v-9.375c-23.259,0-42.188-18.923-42.188-42.188h-9.375c0,8.034-2.297,15.525-6.211,21.923 l-35.977-22.786L9.807,132.97V97.172l56.541-36.347c2.77,4.355,4.397,9.506,4.397,15.037h9.375 c0-15.511,12.614-28.125,28.125-28.125v-9.375c-1.655,0-3.267-0.173-4.842-0.445L145.745,11.1l135.938,86.095V132.97z'/%3E%3Cpath d='M159.807,207.113h70.313v-56.25h-70.313V207.113z M169.182,160.238h51.563v37.5h-51.563V160.238z'/%3E%3Crect x='112.932' y='221.175' width='9.375' height='9.375'/%3E%3Crect x='201.995' y='169.613' width='9.375' height='9.375'/%3E%3Crect x='234.807' y='263.362' width='9.375' height='9.375'/%3E%3Crect x='216.057' y='263.362' width='9.375' height='9.375'/%3E%3Crect x='197.307' y='263.362' width='9.375' height='9.375'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A");
}
.icon_furniture2{
  background-image: url("data:image/svg+xml,%3Csvg xmlns:dc='http://purl.org/dc/elements/1.1/' xmlns:cc='http://creativecommons.org/ns%23' xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns%23' xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' version='1.1' width='100%' height='100%' viewBox='0 0 14 14' id='svg2'%3E%3Cmetadata id='metadata8'%3E%3Crdf:RDF%3E%3Ccc:Work rdf:about=''%3E%3Cdc:format%3Eimage/svg+xml%3C/dc:format%3E%3Cdc:type rdf:resource='http://purl.org/dc/dcmitype/StillImage' /%3E%3Cdc:title%3E%3C/dc:title%3E%3C/cc:Work%3E%3C/rdf:RDF%3E%3C/metadata%3E%3Cdefs id='defs6' /%3E%3Crect width='14' height='14' x='0' y='0' id='canvas' style='fill:none;stroke:none;visibility:hidden' /%3E%3Cpath d='M 3,2 C 2,2 1,3 1,4 3,4 4,5.5760463 4,7 l 6,0 C 10,5.4818344 11,4 13,4 13,3 12,2 11,2 z M 1,5 C 0,5 0,6 0,6 0,6.5181656 0.481834,7 1,7 l 0,3 c 0,0.645252 0.423351,1 1,1 l 0.5,0 c 0,0 0,1 1,1 1,0 1,-1 1,-1 l 5,0 c 0,0 0,1 1,1 1,0 1,-1 1,-1 l 0.5,0 c 0.509491,0 1,-0.48425 1,-1 l 0,-3 c 0.494613,0 1,-0.3876224 1,-1 0,0 0,-1 -1,-1 -1,0 -2,1 -2,3 L 3,8 C 3,6 2,5 1,5 z' id='furniture' style='fill:%23000000;fill-opacity:1;stroke:none' /%3E%3C/svg%3E%0A");
}
.icon_houseware2 {
background-image: url("data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512;' xml:space='preserve'%3E%3Cg%3E%3Cg%3E%3Cpath d='M227.607,382.466c-22.157,0-40.184,18.027-40.184,40.185s18.027,40.184,40.184,40.184s40.184-18.026,40.184-40.184 S249.765,382.466,227.607,382.466z M227.607,429.443c-3.745,0-6.793-3.046-6.793-6.793c0-3.747,3.048-6.794,6.793-6.794 c3.745,0,6.793,3.047,6.793,6.794C234.4,426.397,231.353,429.443,227.607,429.443z'/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3Cg%3E%3Cpath d='M343.505,122.635v-4.184V45.658H286.72V0H168.495v45.658H111.71v72.793v131.641l34.972,97.414l-34.972,49.969V512h231.795 V397.472l-34.972-49.969l34.675-96.584h57.084V122.635H343.505z M253.329,33.391v12.267h-51.442V33.391H253.329z M145.101,244.279 V135.147h32.743v113.034l10.187,85.121h-10.97v-0.001l-6.202-17.276L145.101,244.279z M310.113,407.997v70.612H145.101v-70.612 l28.908-41.304h107.196L310.113,407.997z M211.236,246.189V135.146h32.744v111.043l-10.425,87.112H221.66L211.236,246.189z M310.114,244.279l-31.96,89.022h-10.97l10.187-85.121V135.147h32.744V244.279z M310.114,101.756H145.101V79.049h23.394H286.72 h23.394V101.756z M366.899,217.529h-23.394v-61.502h23.394V217.529z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A");
}
.icon_bath2 {
  background-image: url("data:image/svg+xml,%3Csvg width='100%' height='100%' viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M32,384a95.4,95.4,0,0,0,32,71.09V496a16,16,0,0,0,16,16h32a16,16,0,0,0,16-16V480H384v16a16,16,0,0,0,16,16h32a16,16,0,0,0,16-16V455.09A95.4,95.4,0,0,0,480,384V336H32ZM496,256H80V69.25a21.26,21.26,0,0,1,36.28-15l19.27,19.26c-13.13,29.88-7.61,59.11,8.62,79.73l-.17.17A16,16,0,0,0,144,176l11.31,11.31a16,16,0,0,0,22.63,0L283.31,81.94a16,16,0,0,0,0-22.63L272,48a16,16,0,0,0-22.62,0l-.17.17c-20.62-16.23-49.83-21.75-79.73-8.62L150.22,20.28A69.25,69.25,0,0,0,32,69.25V256H16A16,16,0,0,0,0,272v16a16,16,0,0,0,16,16H496a16,16,0,0,0,16-16V272A16,16,0,0,0,496,256Z'/%3E%3C/svg%3E");
}
.icon_museum2 {
  background-image: url("data:image/svg+xml,%3Csvg version='1.1' id='Capa_1' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 203.357 203.357' style='enable-background:new 0 0 203.357 203.357;' xml:space='preserve'%3E%3Cg%3E%3Cpath d='M21.632,149.888c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h160.094c4.142,0,7.5-3.358,7.5-7.5s-3.358-7.5-7.5-7.5 h-16.547V88.429l16.547,0c3.297,0,6.208-2.154,7.172-5.307c0.964-3.153-0.245-6.566-2.978-8.411l-80.047-53.997 c-2.535-1.71-5.854-1.71-8.389,0L17.438,74.712c-2.733,1.844-3.942,5.257-2.978,8.411c0.964,3.153,3.875,5.307,7.172,5.307 l16.547,0v61.459H21.632z M112.845,88.43v61.459H90.512V88.43L112.845,88.43z M150.179,149.888h-22.333V88.43l22.333,0V149.888z M101.679,35.979l55.518,37.45l-111.035,0L101.679,35.979z M53.179,88.43l22.333,0v61.459H53.179V88.43z'/%3E%3Cpath d='M198.357,173.925H5c-2.761,0-5,2.239-5,5s2.239,5,5,5h193.357c2.761,0,5-2.239,5-5S201.119,173.925,198.357,173.925z'/%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E ");
}
</style>