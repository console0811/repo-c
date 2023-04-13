<template>
  <v-row no-gutters justify="center">
    <v-col cols="12" class="mb-4">
      <v-card class="pa-2 mx-4 mt-2" style="height: 60vh; border-radius: 10px">
        <client-only>
          <l-map
            style="z-index: 0; height: 100%; width: 100%"
            :zoom="zoom"
            :center="center"
            :max-zoom="maxZoom"
            :min-zoom="minZoom"
          >
            <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
            <l-marker
              v-for="(marker, index) in scholarships"
              :key="index"
              :lat-lng="marker.markerLatLng"
            >
              <l-popup :max-width="1000" style="max-height: 500px">
                <v-row no-gutters class="px-4 pb-4">
                  <v-col cols="12" class="overline">
                    Title: {{ marker.title }}
                  </v-col>
                  <v-col
                    cols="12"
                    class="overline"
                    v-if="$auth.user.type !== 'sponsor'"
                  >
                    Sponsor: {{ marker.organization }}
                  </v-col>
                  <v-col cols="12" class="overline">
                    Type: {{ marker.type }}
                  </v-col>
                  <v-col cols="12" class="overline">
                    Date Posted:
                    {{ new Date(marker.date).toLocaleString() }}
                  </v-col>
                  <v-col cols="12" class="overline">
                    Slots:
                    {{ marker.applicants }}/{{ marker.limit }}
                  </v-col>
                  <v-col cols="12" class="overline">
                    cut-off: {{ marker.cutOff }}
                  </v-col>
                </v-row>

                <v-btn
                  block
                  small
                  color="primary"
                  :to="{
                    name: 'scholarship-id',
                    params: { id: marker._id },
                  }"
                  >Visit</v-btn
                >
              </l-popup></l-marker
            >
          </l-map>
        </client-only>
      </v-card>
    </v-col>

    <v-col
      cols="12"
      class=""
      :class="{ 'text-center': $vuetify.breakpoint.xsOnly }"
    >
      <v-card class="mx-4 mb-3" style="border-radius: 10px">
        <v-row no-gutters class="pt-3 px-3">
          <v-col cols="12" lg="6">
            <v-row no-gutters>
              <v-icon large color="blue darken-2" class="pl-3">
                mdi-list-box-outline
              </v-icon>
              <v-card-title>List of Scholarships</v-card-title>
            </v-row>
          </v-col>
          <v-col cols="12" lg="6" class="mb-lg-1 mb-md-1 mt-3 pr-3">
            <InputTextField
              class="pl-2"
              style="border-radius: 10px"
              v-model="options.search"
              hint="Press enter or click icon to search"
              label="Search"
              append-outer-icon="mdi-search-web"
              @click:append-outer="
                getScholarships({ page: options.page, search: options.search })
              "
              @keyup.enter="
                getScholarships({ page: options.page, search: options.search })
              "
            />
          </v-col>
        </v-row>

        <v-col align-self="end" cols="12" v-if="$auth.user.type == 'sponsor'">
          <v-row no-gutters class="mx-2" justify="end">
            <v-col cols="12">
              <v-btn
                light
                :block="$vuetify.breakpoint.mdAndDown"
                class="pa-5 px-15"
                small
                color="#6EBBF7"
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
                outlined
                width="100%"
                style="border-radius: 10px; background: #f4f9fd"
                elevation="5"
              >
                <v-row no-gutters>
                  <v-col cols="12">
                    <v-img
                      :src="
                        scholarshipOffer.cover
                          ? `${resource}/${scholarshipOffer.createdBy}/profile/${scholarshipOffer.cover}`
                          : '/sponsor.jpg'
                      "
                      height="250px"
                      class="ma-4"
                      style="border-radius: 10px"
                    >
                    </v-img>
                  </v-col>
                  <v-col cols="12">
                    <v-divider class="pa-2"></v-divider>
                  </v-col>

                  <v-col cols="12">
                    <v-row no-gutters class="px-4 pb-4">
                      <v-col cols="12" class="overline">
                        Title: {{ scholarshipOffer.title }}
                      </v-col>
                      <v-col
                        cols="12"
                        class="overline"
                        v-if="$auth.user.type !== 'sponsor'"
                      >
                        Sponsor: {{ scholarshipOffer.organization }}
                      </v-col>
                      <v-col cols="12" class="overline">
                        Type: {{ scholarshipOffer.type }}
                      </v-col>
                      <v-col cols="12" class="overline">
                        Date Posted:
                        {{ new Date(scholarshipOffer.date).toLocaleString() }}
                      </v-col>
                      <v-col cols="12" class="overline">
                        Slots:
                        {{ scholarshipOffer.applicants }}/{{
                          scholarshipOffer.limit
                        }}
                      </v-col>
                      <v-col cols="12" class="overline">
                        cut-off: {{ scholarshipOffer.cutOff }}
                      </v-col>
                      <v-col cols="12" class="mt-4">
                        <v-btn
                          color="primary"
                          block
                          :to="{
                            name: 'scholarship-id',
                            params: { id: scholarshipOffer._id },
                          }"
                        >
                          view
                        </v-btn>
                      </v-col>
                      <v-col
                        cols="12"
                        class="mt-4"
                        v-if="$auth.user.type == 'sponsor'"
                      >
                        <v-btn
                          color="error"
                          dark
                          block
                          @click="deleteScholarship(scholarshipOffer._id)"
                        >
                          Delete
                        </v-btn>
                      </v-col>

                      <v-col
                        cols="12"
                        class="mt-4"
                        v-if="$auth.user.type == 'sponsor'"
                      >
                        <v-btn
                          color="secondary"
                          block
                          @click="
                            setScholarship({
                              value: scholarshipOffer,
                              mode: 'edit',
                              dialog: true,
                            })
                          "
                        >
                          edit
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>

          <v-col cols="12">
            <v-pagination
              v-model="options.page"
              :length="options.length"
            ></v-pagination>
          </v-col>
        </v-col>
      </v-card>
    </v-col>

    <v-dialog v-model="options.dialog" width="800px" persistent>
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
          <v-card class="pa-2 mx-4" style="height: 60vh; border-radius: 10px">
            <client-only>
              <l-map
                style="z-index: 0; height: 100%; width: 100%"
                :zoom="zoom"
                :center="center"
                :max-zoom="maxZoom"
                :min-zoom="minZoom"
              >
                <l-tile-layer
                  url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                ></l-tile-layer>

                <l-marker
                  :lat-lng="
                    scholarship.markerLatLng[0] && scholarship.markerLatLng[1]
                      ? scholarship.markerLatLng
                      : markerLatLng
                  "
                  :draggable="isEditing"
                  @dragend="addMarker"
                >
                </l-marker>
              </l-map>
            </client-only>
          </v-card>
          <v-row no-gutters class="pa-4">
            <v-col cols="12">
              <InputTextField
                v-model="scholarship.title"
                label="Title"
                required
                :rules="[$rules.required]"
              />
            </v-col>

            <v-col cols="12">
              <InputCombobox
                v-model="scholarship.type"
                :items="scholarshipCategory"
                label="Type"
                required
                :rules="[$rules.required]"
                class="mt-2"
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
                height="200"
                no-resize
              />
            </v-col>

            <v-col cols="12" class="mt-2">
              <InputTextarea
                v-model="scholarship.requirements"
                outlined
                label="Requirements"
                height="200"
                no-resize
              />
            </v-col>

            <v-col cols="12" class="mt-2">
              <InputTextarea
                v-model="scholarship.qualifications"
                outlined
                label="Qualifications"
                height="200"
                no-resize
              />
            </v-col>

            <v-col cols="12" class="mt-2">
              <InputTextarea
                v-model="scholarship.responsibilities"
                outlined
                label="Responsibilities"
                height="200"
                no-resize
              />
            </v-col>
          </v-row>
        </v-card>
        <!-- footer -->
        <v-card
          tile
          max-height="7vh"
          style="border-radius: 10px; background: #f4f9fd"
        >
          <v-row
            no-gutters
            class="fill-height py-2"
            justify="center"
            align-content="center"
          >
            <v-col cols="10" lg="3" md="4" sm="4" class="ma-1">
              <v-btn small block @click="setScholarship({})" color="secondary">
                cancel
              </v-btn>
            </v-col>

            <v-col
              cols="10"
              lg="3"
              md="4"
              sm="4"
              class="ma-1"
              v-if="options.mode == 'edit'"
            >
              <v-btn
                color="primary"
                small
                block
                @click="updateScholarship(scholarship)"
                :disabled="!options.valid"
              >
                update
              </v-btn>
            </v-col>

            <v-col cols="10" lg="3" md="4" sm="4" class="ma-1" v-else>
              <v-btn
                small
                block
                type="submit"
                :disabled="!options.valid"
                color="primary"
              >
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
import $axios from "@nuxtjs/axios";
import util from "~/plugins/util";
export default {
  mixins: [util],

  mounted() {
    this.getScholarships({
      page: this.options.page,
      search: this.options.search,
    });
    this.getScholarshipsTypes();
  },

  data() {
    return {
      options: new ScholarshipOptionsModel(),
      scholarship: new ScholarshipModel(),
      scholarships: [],
      isEditing: true,
      zIndex: "1",
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 17,
      maxZoom: 18,
      minZoom: 5,
      center: [18.19714677007932, 120.5948676054568],
      markerLatLng: [18.19714677007932, 120.5948676054568],
      scholarshipCategory: [
        "Academic",
        "Tech-Voc",
        "Agriculture_and_Fisheries(Secondary)",
        "Agriculture_and_Fisheries(Tertiary)",
        "Arts",
        "SHS",
        "Doctor_of_Medicine",
      ],
    };
  },

  methods: {
    addMarker(event) {
      this.markerLatLng = [event.target._latlng.lat, event.target._latlng.lng];
      console.log(this.markerLatLng);
    },
    getScholarships({
      page = this.options.page,
      search = "",
      type = this.$auth.user.type,
    } = {}) {
      this.$axios
        .$get("/scholarship/", { params: { page, search, type } })
        .then(({ items, length }) => {
          this.scholarships = items;
          console.log(this.scholarships);
          this.options.length = Math.floor(length / 10) + (length % 10 ? 1 : 0);
        })
        .catch((error) => {
          console.log(error.response.data.error);
        });
    },
    getScholarshipsTypes() {
      this.$axios
        .$get("/scholarship/types")
        .then(({ data }) => {
          this.options.types = data;
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
      this.scholarship =
        value && value._id
          ? value
          : new ScholarshipModel({
              type: "Tech-Voc",
              descriptions:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
              date: "",
              limit: 100,
              cutOff: "",
              createdBy: this.$auth.user._id,
              lastModified: "",
              status: "active",
            });
      this.options.dialog = dialog;
      this.options.mode = mode;
    },
    createScholarship(
      data = new ScholarshipModel(),
      markerLatLng = this.markerLatLng
    ) {
      if (markerLatLng) {
        data.markerLatLng = markerLatLng;
      }

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
          this.getScholarshipsTypes();
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
    updateScholarship(
      data = new ScholarshipModel(),
      markerLatLng = this.markerLatLng
    ) {
      if (markerLatLng) {
        data.markerLatLng = markerLatLng;
      }

      this.$axios
        .$put("/scholarship/update", { data })
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

    deleteScholarship(id) {
      console.log(id);
      this.$axios
        .$delete(`/scholarship/delete/${id}`)
        .then(({ message }) => {
          this.$store.dispatch("setNotificationProperty", {
            value: message,
            property: "text",
          });
          this.$store.dispatch("setNotificationProperty", {
            value: true,
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
  },

  computed: {
    resource() {
      const { DO_SPACES_LINK, ASSET_DIRECTORY } = this.$config;
      return `${DO_SPACES_LINK}/${ASSET_DIRECTORY}/sponsors/attachments/`;
    },
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

<style scope>
.leaflet-popup-close-button {
  color: red !important;
  font-size: 30px !important;
  padding-right: 30px !important;
}
</style>