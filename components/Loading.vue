<template>
  <v-overlay :value="loading" z-index="1000">
    <div class="sk-cube-grid">
      <div class="sk-cube sk-cube1" />
      <div class="sk-cube sk-cube2" />
      <div class="sk-cube sk-cube3" />
      <div class="sk-cube sk-cube4" />
      <div class="sk-cube sk-cube5" />
      <div class="sk-cube sk-cube6" />
      <div class="sk-cube sk-cube7" />
      <div class="sk-cube sk-cube8" />
      <div class="sk-cube sk-cube9" />
    </div>
    <v-row>
      <v-col cols="12" class="text-center">
        {{ $store.state.loading.text }}
      </v-col>
    </v-row>
  </v-overlay>
</template>

<script>
export default {
  computed: {
    loading: {
      get() {
        return this.$store.state.loading.value;
      },
      set(value) {
        this.$store.dispatch("setLoadingProperty", {
          property: "value",
          value,
        });
      },
    },
  },
};
</script>

<style>
.sk-cube-grid {
  width: 100px;
  height: 100px;
  margin: 100px auto;
}

.sk-cube-grid .sk-cube {
  width: 33%;
  height: 33%;
  background-color: #ffffff;
  float: left;
  -webkit-animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
  animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
}
.sk-cube-grid .sk-cube1 {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}
.sk-cube-grid .sk-cube2 {
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}
.sk-cube-grid .sk-cube3 {
  -webkit-animation-delay: 0.4s;
  animation-delay: 0.4s;
}
.sk-cube-grid .sk-cube4 {
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s;
}
.sk-cube-grid .sk-cube5 {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}
.sk-cube-grid .sk-cube6 {
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}
.sk-cube-grid .sk-cube7 {
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
}
.sk-cube-grid .sk-cube8 {
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s;
}
.sk-cube-grid .sk-cube9 {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}

@-webkit-keyframes sk-cubeGridScaleDelay {
  0%,
  70%,
  100% {
    -webkit-transform: scale3D(1, 1, 1);
    transform: scale3D(1, 1, 1);
  }
  35% {
    -webkit-transform: scale3D(0, 0, 1);
    transform: scale3D(0, 0, 1);
  }
}

@keyframes sk-cubeGridScaleDelay {
  0%,
  70%,
  100% {
    -webkit-transform: scale3D(1, 1, 1);
    transform: scale3D(1, 1, 1);
  }
  35% {
    -webkit-transform: scale3D(0, 0, 1);
    transform: scale3D(0, 0, 1);
  }
}
</style>
