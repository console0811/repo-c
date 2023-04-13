<template>
  <v-row
    no-gutters
    class="fill-height"
    justify="center"
    align-content="center"
    style="background-color: #c7d0d8"
  >
    <v-col cols="12" lg="4" md="5" class="mx-lg-4 mx-md-4 mx-sm-2 pa-2">
      <v-card style="background-color: #48a8f5; border-radius: 10px">
        <v-col cols="12" class="pa-5">
          <v-layout justify-center align-center class="pb-2">
            <v-flex shrink>
              <v-img
                style="border-radius: 10px"
                lazy-src="https://picsum.photos/id/11/10/6"
                max-height="500"
                max-width="550"
                src="https://img.freepik.com/premium-vector/smiling-graduate-student-wearing-academic-robe-graduation-cap-3d-vector-people-character-illustrationcartoon-minimal-style_365941-798.jpg"
              ></v-img>
            </v-flex>
          </v-layout>
          <v-col cols="12"
            ><v-btn
              style="border-radius: 10px"
              block
              x-large
              :to="{ name: 'sign-up-type', params: { type: 'applicant' } }"
            >
              applicant
            </v-btn></v-col
          >
        </v-col>
      </v-card>
    </v-col>
    <v-col cols="12" lg="4" md="5" class="mx-lg-4 mx-md-4 mx-sm-2 pa-2">
      <v-card style="background-color: #48a8f5; border-radius: 10px">
        <v-col cols="12" class="pa-5">
          <v-layout justify-center align-center class="pb-2">
            <v-flex shrink>
              <v-img
                style="border-radius: 10px"
                lazy-src="https://picsum.photos/id/11/10/6"
                max-height="500"
                max-width="550"
                src="https://img.freepik.com/premium-vector/young-woman-jane-student-graduation-cap-holding-diploma-3d-vector-people-character-illustration_365941-604.jpg"
              ></v-img>
            </v-flex>
          </v-layout>
          <v-col cols="12">
            <v-btn
              style="border-radius: 10px"
              block
              x-large
              :to="{ name: 'sign-up-type', params: { type: 'sponsor' } }"
            >
              sponsor
            </v-btn></v-col
          >
        </v-col>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: "plain",
};
</script>

<style>
</style>