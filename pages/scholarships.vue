<template>
  <v-row no-gutters justify="center">
    <v-col cols="12" class="mb-lg-1 mb-md-1">
      <div id="map-wrap" style="height: 100vh">
        <v-card class="pa-2 mx-4" style="height: 50vh; border-radius: 10px">
          <client-only>
            <l-map
              style="z-index: 0; height: 100%; width: 100%"
              :zoom="zoom"
              :center="center"
              :max-zoom="maxZoom"
              :min-zoom="minZoom"
            >
              <l-tile-layer
                :url="url"
                :attribution="attribution"
              ></l-tile-layer>
              <l-marker :lat-lng="[55.9464418, 8.1277591]"></l-marker>
            </l-map>
          </client-only>
        </v-card>
      </div>
    </v-col>

    <v-card style="border-radius: 10px" class="mx-5 mt-2">
      <v-col cols="12" lg="6" class="mb-lg-1 mb-md-1">
        <InputTextField
          v-model="options.search"
          hint="Press enter or click icon to search"
          label="search"
          append-outer-icon="mdi-search-web"
          @click:append-outer="
            getScholarships({ page: options.page, search: options.search })
          "
          @keyup.enter="
            getScholarships({ page: options.page, search: options.search })
          "
        />
      </v-col>
      <v-col
        cols="12"
        class="mt-lg-1 mt-md-1"
        v-if="$auth.user.type == 'sponsor'"
      >
        <v-row no-gutters justify="center">
          <v-col cols="12" lg="6">
            <v-btn
              dense
              @click="setScholarship({ mode: 'create', dialog: true })"
              >offer scholarship</v-btn
            >
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" class="mt-4">
        <v-row no-gutters>
          <v-col
            cols="12"
            lg="4"
            md="4"
            sm="6"
            class="pa-2"
            v-for="scholarshipOffer in scholarships"
            :key="scholarshipOffer._id"
          >
            <v-card
              dark
              outlined
              width="100%"
              style="border-radius: 15px; background: #181823"
            >
              <v-row no-gutters>
                <v-col cols="12">
                  <v-img
                    class="ma-2"
                    src="/sponsor.jpg"
                    height="250px"
                    style="border-radius: 15px; background-color: blue"
                  >
                  </v-img>
                </v-col>
                <v-col cols="12">
                  <v-divider class="pa-2"></v-divider>
                </v-col>

                <v-col cols="12">
                  <v-row no-gutters class="pa-4">
                    <v-col cols="12">
                      Course: {{ scholarshipOffer.course }}
                    </v-col>
                    <v-col cols="12">
                      Date Posted:
                      {{ new Date(scholarshipOffer.date).toLocaleString() }}
                    </v-col>
                    <v-col cols="12">
                      Slots:
                      {{ scholarshipOffer.applicants }}/{{
                        scholarshipOffer.limit
                      }}
                    </v-col>
                    <v-col cols="12">
                      cut-off: {{ scholarshipOffer.cutOff }}
                    </v-col>
                    <v-col cols="12" class="mt-4">
                      <v-row no-gutters>
                        <v-col
                          cols="12"
                          lg="6"
                          md="6"
                          sm="6"
                          class="pa-1"
                          white
                        >
                          <v-btn block>view</v-btn>
                        </v-col>

                        <v-col cols="12" lg="6" md="6" sm="6" class="pa-1">
                          <v-btn
                            color="primary button font-weight-regular"
                            block
                            :disabled="
                              scholarshipOffer.applicants ==
                              scholarshipOffer.limit
                            "
                            @click="
                              applyForScholarship({
                                applicant: $auth.user._id,
                                scholarship: scholarshipOffer._id,
                              })
                            "
                          >
                            Apply
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-card>

    <v-col cols="12">
      <v-pagination
        v-model="options.page"
        :length="options.length"
      ></v-pagination>
    </v-col>

    <v-dialog v-model="options.dialog" width="600px" persistent>
      <v-form
        v-model="options.valid"
        @submit.prevent="createScholarship(scholarship)"
      >
        <!-- header -->
        <v-card tile height="5vh" class="default-gradient">
          <v-row no-gutters class="fill-height" justify="center" align="center">
            <span class="text-capitalize font-weight-medium">
              {{ options.mode }} scholarship
            </span>
          </v-row>
        </v-card>
        <!-- content -->
        <v-card tile max-height="80vh" style="overflow: auto">
          <v-row no-gutters class="pa-4">
            <v-col cols="12">
              <InputCombobox
                v-model="scholarship.course"
                :items="options.course"
                label="Course"
                required
                :rules="[$rules.required]"
              />
            </v-col>

            <v-col cols="12" lg="6" md="6" class="pr-lg-1 pr-md-1 mt-2">
              <InputTextField
                v-model.number="scholarship.limit"
                label="Limit"
                type="number"
                required
                :rules="[$rules.required]"
              />
            </v-col>

            <v-col cols="12" lg="6" md="6" class="pl-lg-1 pl-md-1 mt-2">
              <InputTextField
                v-model="scholarship.cutOff"
                label="Cut-Off"
                type="date"
                required
                :rules="[$rules.required]"
              />
            </v-col>

            <v-col cols="12" class="mt-2">
              <InputTextarea
                v-model="scholarship.descriptions"
                outlined
                label="Descriptions"
                :rules="[$rules.required]"
                required
                height="400"
                no-resize
              />
            </v-col>
          </v-row>
        </v-card>
        <!-- footer -->
        <v-card tile max-height="5vh">
          <v-row
            no-gutters
            class="fill-height"
            justify="center"
            align-content="center"
          >
            <v-col cols="10" lg="3" md="4" sm="4" class="ma-1">
              <v-btn small block @click="setScholarship({})"> cancel </v-btn>
            </v-col>

            <v-col cols="10" lg="3" md="4" sm="4" class="ma-1">
              <v-btn small block type="submit" :disabled="!options.valid">
                submit
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-form>
    </v-dialog>
  </v-row>
</template>

<script>
import ScholarshipModel, {
  ScholarshipOptionsModel,
} from "~/models/model.scholarship";
import ApplicationModel from "~/models/model.application";
import $axios from "@nuxtjs/axios";
import util from "~/plugins/util";

export default {
  mixins: [util],

  fetch() {
    this.getScholarships({
      page: this.options.page,
      search: this.options.search,
    });
  },

  data() {
    return {
      options: new ScholarshipOptionsModel(),
      scholarship: new ScholarshipModel(),
      scholarships: [],
      // leafelt
      zIndex: "1",
      isLoad: false,
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 17,
      maxZoom: 18,
      minZoom: 5,
      center: [18.19714677007932, 120.5948676054568],
      markerLatLng: [18.19714677007932, 120.5948676054568],
    };
  },

  methods: {
    getScholarships({ page = 0, search = "" }) {
      this.$axios
        .$get("/scholarship/", { params: { page, search } })
        .then(({ items, length }) => {
          this.scholarships = items;
          this.options.length = Math.floor(length / 10) + (length % 10 ? 1 : 0);
        })
        .catch((error) => {
          console.log(error.response.data.error);
        });
    },
    setScholarship({
      value = new ScholarshipModel(),
      mode = "",
      dialog = false,
    } = {}) {
      this.scholarship = new ScholarshipModel({
        course: "Tech-Voc",
        descriptions:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        date: "",
        limit: 100,
        createdBy: this.$auth.user._id,
        lastModified: "",
        status: "active",
      });
      this.options.dialog = dialog;
      this.options.mode = mode;
    },
    createScholarship(data = new ScholarshipModel()) {
      this.$axios
        .$post("/scholarship/create", { data })
        .then(({ message }) => {
          this.$store.dispatch("setNotificationProperty", {
            value: message,
            property: "text",
          });
          this.$store.dispatch("setNotificationProperty", {
            value: true,
            property: "value",
          });
          this.$store.dispatch("setLoadingProperty", {
            value: false,
            property: "value",
          });
          this.setScholarship();
          this.getScholarships();
        })
        .catch((error) => {
          this.$store.dispatch("setNotificationProperty", {
            value: error.response.data.error,
            property: "text",
          });
          this.$store.dispatch("setNotificationProperty", {
            value: true,
            property: "value",
          });
          this.$store.dispatch("setLoadingProperty", {
            value: false,
            property: "value",
          });
        });
    },
    applyForScholarship({ applicant = this.$auth.user._id, scholarship = "" }) {
      this.$axios
        .$post("/applicant/create", {
          data: new ApplicationModel({ applicant, scholarship }),
        })
        .then(({ message }) => {
          this.$store.dispatch("setNotificationProperty", {
            value: message,
            property: "text",
          });
          this.$store.dispatch("setNotificationProperty", {
            value: true,
            property: "value",
          });
          this.$store.dispatch("setLoadingProperty", {
            value: false,
            property: "value",
          });

          this.getScholarships({
            page: this.options.page,
            search: this.options.search,
          });
        })
        .catch((error) => {
          this.$store.dispatch("setNotificationProperty", {
            value: error.response.data.error,
            property: "text",
          });
          this.$store.dispatch("setNotificationProperty", {
            value: true,
            property: "value",
          });
          this.$store.dispatch("setLoadingProperty", {
            value: false,
            property: "value",
          });
        });
    },
  },

  computed: {
    page() {
      return this.options.page;
    },
  },

  watch: {
    page(value) {
      this.getScholarships({ page: value, search: this.options.search });
    },
  },
};
</script>

<style>
</style>