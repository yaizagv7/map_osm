# Moovemap

Moovemap es un proyecto basado en el código de Open Recycle Map que ayuda a organizar la busqueda de distintas utilidades en una determinada ubicación.

![OpenRecycleMap](https://raw.githubusercontent.com/meta-systems/openrecyclemap/master/public/android-chrome-144x144.png)

[openrecyclemap.org](https://openrecyclemap.org/)


## Instalación

- Instalar vue https://vuejs.org/v2/guide/installation.html#NPM
  `npm install vue`
- Instalar vue/cli https://cli.vuejs.org/#getting-started
  `npm install -g @vue/cli`

## Desarrollo

- Run `npm run serve`

De este modo la aplicación usa un servidor de OSM para desarrolladores.

## Despliegue en Android o iOS

Seguir el tutorial [Capacitor: de Vue a APK]( https://gerardofloresgr.medium.com/capacitor-de-web-a-android-y-ios-con-proyectos-existentes-a59725d7f81d/ )

[Crear apk en Android Studio] (https://code.tutsplus.com/es/tutorials/how-to-generate-apk-and-signed-apk-files-in-android-studio--cms-37927 )

## OSM Tags & data

Las etiquetas de búsqueda y las opciones del menú se encuentran en el directorio **src/menu-data.json**.

Ejemplos ya añadidos:

| Title in UI     |    OSM Tag                | Note |
|-----------------|---------------------------|------|
| Restaurantes    | amenity:restaurant        |      |
| Bares           | amenity:bar               |      |
| Peluquerias     | shop:hairdresser          |      |
| Gasolineras     | amenity:fuel              |      |

Para más información sobre las posibles etiquetas de búsqeuda visitar [OSM Wiki](https://wiki.openstreetmap.org/wiki/).

