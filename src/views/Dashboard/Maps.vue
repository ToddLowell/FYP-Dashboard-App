<template>
  <div class="gMap-container">
    <h3 class="gMap-label">Branches</h3>
    <div ref="gMap" class="gMap" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
/* global google */

interface PlaceConfig {
  location: {
    lat: number;
    lng: number;
  };
  info: string;
}

export default defineComponent({
  setup() {
    const gMap = ref(null);
    const places = [
      {
        location: {
          lat: 3.0079312936374625,
          lng: 101.72011515409301,
        },
        info: `
          <h2 class="gMap-center">Branch A</h2>
          <p>View Access Terminal: <a class="gMap-blue">link_will_go_here</a></p>
        `,
      },
      {
        location: {
          lat: 2.8656357608536567,
          lng: 101.52241445479191,
        },
        info: `
          <h2 class="gMap-center">Branch B</h2>
          <p>View Access Terminal: <a class="gMap-blue">link_will_go_here</a></p>
        `,
      },
      {
        location: {
          lat: 2.846867031777766,
          lng: 101.87539548085807,
        },
        info: `
          <h2 class="gMap-center">Branch C</h2>
          <p>View Access Terminal: <a class="gMap-blue">link_will_go_here</a></p>
        `,
      },
    ] as PlaceConfig[];

    const center: google.maps.LatLngLiteral = {
      lat: 3.0079312936374625,
      lng: 101.72011515409301,
    };

    onMounted(() => {
      const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let labelIndex = 0;

      const map = new google.maps.Map(gMap.value as HTMLElement, {
        center,
        zoom: 10,
      });

      // set-up markers
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const markers = places.map((place) => {
        const marker = new google.maps.Marker({
          position: place.location,
          map,
          label: labels[labelIndex++ % labels.length],
        });

        const infowindow = new google.maps.InfoWindow({
          content: place.info,
        });

        marker.addListener('click', () => {
          infowindow.open(map, marker);
        });

        return marker;
      });
    });

    return {
      gMap,
    };
  },
});
</script>

<style lang="scss" scoped>
.gMap-container {
  position: relative;
  height: 100%;
  margin: 0 2rem 2rem;
  border-radius: 6px;
  overflow: hidden;
}

.gMap-label {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 20%);
  font-size: 1.8em;
  z-index: 1;
}

.gMap {
  color: black;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;
}
</style>

<style>
.gMap-center {
  text-align: center;
}

.gMap-blue {
  color: blue;
  text-decoration: underline;
}
</style>
