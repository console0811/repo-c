<template>
  <v-row no-gutters class="pa-4">
    <v-card outlined width="100%">
      <v-row no-gutters class="pa-8">
        <v-col cols="12">
          <span class="font-weight-bold">Course:</span> {{ scholarship.course }}
        </v-col>
        <v-col cols="12">
          <span class="font-weight-bold">Date Published:</span>
          {{ new Date(scholarship.date).toLocaleDateString() }}
        </v-col>
        <v-col cols="12">
          <span class="font-weight-bold">Cut-off:</span>
          {{ new Date(scholarship.cutOff).toLocaleDateString() }}
        </v-col>
        <v-col cols="12">
          <span class="font-weight-bold">Limit:</span> {{ scholarship.limit }}
        </v-col>
        <v-col cols="12">
          <span class="font-weight-bold">Descriptions:</span>
          {{ scholarship.descriptions }}
        </v-col>
      </v-row>
    </v-card>
  </v-row>
</template>

<script>
import ScholarshipModel from "~/models/model.scholarship";
export default {
  data() {
    return {
      scholarship: new ScholarshipModel(),
    };
  },

  mounted() {
    this.getScholarship(this.$route.params.id);
  },

  methods: {
    getScholarship(id = "") {
      this.$axios
        .$get(`/scholarship/${id}`)
        .then(({ data }) => {
          console.log(data);
          this.scholarship = data;
        })
        .catch((error) => {
          console.log(error.response.data.error);
        });
    },
  },
};
</script>

<style>
</style>