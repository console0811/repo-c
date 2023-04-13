<template>
  <v-row no-gutters class="fill-height">
    <v-col cols="12">
      <v-col
        cols="12"
        style="height: 91vh; background-color: #e8f1ff"
        v-if="$auth.user.type == 'applicant'"
      >
        <v-row no-gutters class="fill-height">
          <v-col
            cols="12"
            md="6"
            lg="6"
            class="d-flex align-center justify-center"
          >
            <v-col
              cols="12 "
              class="ml-sm-0 ml-md-15"
              :class="{ 'ml-md-15': $vuetify.breakpoint.mdAndUp }"
            >
              <v-col
                class="text-left"
                cols="12"
                :class="{ 'text-center': $vuetify.breakpoint.xsOnly }"
              >
                <h1 class="display-3 font-weight-bold">
                  Become a <span style="color: #4141ff">Scholar</span>
                </h1>
              </v-col>
              <v-col
                class="text-left"
                cols="12"
                :class="{ 'text-center': $vuetify.breakpoint.xsOnly }"
              >
                <h5 class="body-2">
                  Don't miss out on this incredible opportunity to become a
                  scholar! Click the "Apply" button now to take the first step
                  towards your future.
                </h5>
              </v-col>
              <v-col
                cols="12 "
                class="text-left"
                :class="{ 'text-center': $vuetify.breakpoint.xsOnly }"
              >
                <v-btn
                  color="primary"
                  dark
                  class=""
                  style="width: 200px"
                  :to="{ name: 'scholarships' }"
                >
                  Apply
                </v-btn>
              </v-col>
            </v-col>
          </v-col>
          <v-col
            cols="12"
            md="6"
            lg="6"
            class="d-flex align-center justify-center"
          >
            <v-img
              :src="svgIcon"
              style="max-height: 40vh; fill: #0c7fda"
              contain
            >
            </v-img>
          </v-col>
        </v-row>
      </v-col>
      <!-- Sponsor -->
      <v-col
        cols="12"
        style="height: 50vh; background-color: white"
        :style="{
          height: $vuetify.breakpoint.xsOnly
            ? ''
            : $vuetify.breakpoint.smOnly
            ? ''
            : $vuetify.breakpoint.mdOnly
            ? ''
            : '50vh',
        }"
        v-if="$auth.user.type == 'sponsor'"
      >
        <v-row no-gutters class="fill-height">
          <v-col
            cols="12"
            sm="6"
            md="6"
            lg="6"
            xs="6"
            class="d-flex align-center justify-center"
          >
            <v-img
              :src="svgIconProviderWelcome"
              style="max-height: 40vh"
              contain
              class="Provider-post-color"
            >
            </v-img>
          </v-col>
          <v-col
            cols="12"
            xs="6"
            sm="6"
            md="6"
            lg="6"
            class="d-flex align-center justify-center pb-10"
          >
            <v-col cols="12 " class="mb-4">
              <v-col class="text-center" cols="12">
                <h1 class="display-2 font-weight-bold">
                  Welcome <span style="color: #4141ff">Sponsor</span>
                </h1>
              </v-col>
              <v-col class="text-center text-justify" cols="12">
                <h5 class="caption font-weight-medium">
                  Welcome to our scholarship platform! We're excited to have you
                  as a provider, and we appreciate your interest in supporting
                  students in their academic pursuits. As a provider, you play a
                  vital role in helping us achieve our mission of providing
                  access to education for all. We believe that everyone should
                  have the opportunity to pursue their dreams, regardless of
                  their financial situation. That's why we're committed to
                  connecting students with scholarships that can help make their
                  dreams a reality.
                </h5>
              </v-col>
            </v-col>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        style="background-color: #e8f1ff"
        :style="{
          height: $vuetify.breakpoint.xsOnly
            ? ''
            : $vuetify.breakpoint.smOnly
            ? ''
            : $vuetify.breakpoint.mdOnly
            ? ''
            : $vuetify.breakpoint.lgOnly
            ? ''
            : '50vh',
        }"
        v-if="$auth.user.type == 'sponsor'"
      >
        <v-row no-gutters class="fill-height">
          <v-col
            cols="12"
            sm="6"
            md="6"
            lg="6"
            xs="6"
            class="d-flex align-center justify-center"
          >
            <v-col cols="12 " class="ml-sm-0 ml-md-15">
              <v-col class="text-center" cols="12">
                <h1
                  :class="[
                    $vuetify.breakpoint.xsOnly ? 'display-2' : 'display-2',
                    'font-weight-bold',
                  ]"
                >
                  Post <span style="color: #4141ff">Scholaships</span>
                </h1>
              </v-col>
              <v-col class="text-center text-justify" cols="12">
                <h5 class="body-2 caption font-weight-medium">
                  Scholarship providers can easily post their scholarships on
                  various scholarship search engines and platforms, enabling
                  them to reach a larger pool of potential applicants. By
                  providing detailed information about the scholarship,
                  including eligibility criteria and application requirements,
                  providers can attract qualified candidates and make the
                  application process more accessible.
                </h5>
              </v-col>
              <v-col cols="12 " class="text-center">
                <v-btn
                  color="primary"
                  dark
                  class=""
                  style="width: 200px"
                  :to="{ name: 'scholarships' }"
                >
                  Post
                </v-btn>
                <v-divider
                  class="mt-5"
                  v-if="$vuetify.breakpoint.xsOnly"
                  style="
                    border-width: 1px;
                    border-color: black;
                    border-style: solid;
                  "
                ></v-divider>
              </v-col>
            </v-col>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="6"
            lg="6"
            xs="6"
            class="d-flex align-center justify-center"
          >
            <v-img
              :src="svgIconProviderPost"
              style="max-height: 40vh"
              contain
              class="Provider-post-color"
            >
            </v-img>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        style="height: 50vh; background-color: white"
        :style="{
          height: $vuetify.breakpoint.xsOnly
            ? ''
            : $vuetify.breakpoint.smOnly
            ? ''
            : $vuetify.breakpoint.mdOnly
            ? ''
            : '50vh',
        }"
        v-if="$auth.user.type == 'sponsor'"
      >
        <v-row no-gutters class="fill-height">
          <v-col
            cols="12"
            sm="6"
            md="6"
            lg="6"
            xs="6"
            class="d-flex align-center justify-center"
          >
            <v-img
              :src="svgIconProviderMap"
              style="max-height: 40vh"
              id="undraw-svg"
              contain
            >
            </v-img>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="6"
            lg="6"
            xs="6"
            class="d-flex align-center justify-center"
          >
            <v-col
              cols="12 "
              class="ml-sm-0 ml-md-15 pr-10"
              :class="{ 'ml-md-15': $vuetify.breakpoint.mdAndUp }"
            >
              <v-col class="text-center" cols="12">
                <h1
                  :class="[
                    $vuetify.breakpoint.xsOnly ? 'display-2' : 'display-2',
                    'font-weight-bold',
                  ]"
                >
                  Locate the location of the
                  <span style="color: #4141ff">Scholarships</span>
                </h1>
              </v-col>
              <v-col class="text-center" cols="12">
                <h5 class="body-2 caption font-weight-medium">
                  Dashboard function is an essential feature of any system that
                  provides users with an overview of relevant information in a
                  visually appealing format. It allows users to monitor key
                  metrics, track progress, and make informed decisions based on
                  real-time data.
                </h5>
              </v-col>
            </v-col>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        style="height: 50vh; background-color: #e8f1ff"
        :style="{
          height: $vuetify.breakpoint.xsOnly
            ? ''
            : $vuetify.breakpoint.smOnly
            ? ''
            : $vuetify.breakpoint.mdOnly
            ? ''
            : '50vh',
        }"
        v-if="$auth.user.type == 'sponsor'"
      >
        <v-row no-gutters class="fill-height">
          <v-col
            cols="12"
            sm="6"
            md="6"
            lg="6"
            xs="6"
            class="d-flex align-center justify-center"
          >
            <v-col
              cols="12 "
              :class="{ 'ml-md-15': $vuetify.breakpoint.mdAndUp }"
            >
              <v-col class="text-center" cols="12">
                <h1
                  :class="[
                    $vuetify.breakpoint.xsOnly ? 'display-2' : 'display-2',
                    'font-weight-bold',
                  ]"
                >
                  Dashboard
                  <span style="color: #4141ff">Scholarships</span>
                </h1>
              </v-col>
              <v-col class="text-center" cols="12">
                <h5 class="body-2 caption font-weight-medium">
                  Dashboard function is an essential feature of any system that
                  provides users with an overview of relevant information in a
                  visually appealing format. It allows users to monitor key
                  metrics, track progress, and make informed decisions based on
                  real-time data.
                </h5>
              </v-col>
              <!-- <v-col cols="12 " class="text-center">
                <v-btn
                  color="primary"
                  dark
                  class=""
                  style="width: 200px"
                  :to="{ name: 'dashboard' }"
                >
                  Apply
                </v-btn>
              </v-col> -->
            </v-col>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="6"
            lg="6"
            xs="6"
            class="d-flex align-center justify-center"
          >
            <v-img
              :src="svgIconProviderdashboard"
              style="max-height: 40vh; fill: #0c7fda"
              contain
            >
            </v-img>
          </v-col>
        </v-row>
      </v-col>
      <!-- Admin -->
      <v-col
        cols="12"
        style="height: 50vh; background-color: white"
        :style="{
          height: $vuetify.breakpoint.xsOnly
            ? ''
            : $vuetify.breakpoint.smOnly
            ? ''
            : $vuetify.breakpoint.mdOnly
            ? ''
            : '50vh',
        }"
        v-if="$auth.user.type == 'admin'"
      >
        <v-row no-gutters class="fill-height">
          <v-col
            cols="12"
            sm="6"
            md="6"
            lg="6"
            xs="6"
            class="d-flex align-center justify-center"
          >
            <v-img
              :src="svgIconProviderWelcome"
              style="max-height: 40vh"
              contain
              class="Provider-post-color"
            >
            </v-img>
          </v-col>
          <v-col
            cols="12"
            xs="6"
            sm="6"
            md="6"
            lg="6"
            class="d-flex align-center justify-center pb-10"
          >
            <v-col cols="12 " class="mb-4">
              <v-col class="text-center" cols="12">
                <h1 class="display-2 font-weight-bold">
                  Welcome <span style="color: #4141ff">Admin</span>
                </h1>
              </v-col>
              <v-col class="text-center text-justify" cols="12">
                <h5 class="caption font-weight-medium">
                  Welcome to our scholarship platform! We're excited to have you
                  as a provider, and we appreciate your interest in supporting
                  students in their academic pursuits. As a provider, you play a
                  vital role in helping us achieve our mission of providing
                  access to education for all. We believe that everyone should
                  have the opportunity to pursue their dreams, regardless of
                  their financial situation. That's why we're committed to
                  connecting students with scholarships that can help make their
                  dreams a reality.
                </h5>
              </v-col>
            </v-col>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        style="background-color: #e8f1ff"
        :style="{
          height: $vuetify.breakpoint.xsOnly
            ? ''
            : $vuetify.breakpoint.smOnly
            ? ''
            : $vuetify.breakpoint.mdOnly
            ? ''
            : $vuetify.breakpoint.lgOnly
            ? ''
            : '50vh',
        }"
        v-if="$auth.user.type == 'admin'"
      >
        <v-row no-gutters class="fill-height">
          <v-col
            cols="12"
            sm="6"
            md="6"
            lg="6"
            xs="6"
            class="d-flex align-center justify-center"
          >
            <v-col cols="12 " class="ml-sm-0 ml-md-15">
              <v-col class="text-center" cols="12">
                <h1
                  :class="[
                    $vuetify.breakpoint.xsOnly ? 'display-2' : 'display-2',
                    'font-weight-bold',
                  ]"
                >
                  Validate Provider for
                  <span style="color: #4141ff">Scholaships</span>
                </h1>
              </v-col>
              <v-col class="text-center text-justify" cols="12">
                <h5 class="body-2 caption font-weight-medium">
                  Scholarship providers can easily post their scholarships on
                  various scholarship search engines and platforms, enabling
                  them to reach a larger pool of potential applicants. By
                  providing detailed information about the scholarship,
                  including eligibility criteria and application requirements,
                  providers can attract qualified candidates and make the
                  application process more accessible.
                </h5>
              </v-col>
            </v-col>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="6"
            lg="6"
            xs="6"
            class="d-flex align-center justify-center"
          >
            <v-img
              :src="svgIconAdminApprove"
              style="max-height: 40vh"
              contain
              class="Provider-post-color"
            >
            </v-img>
          </v-col>
        </v-row>
      </v-col>

      <v-col
        cols="12"
        style="height: 50vh; background-color: white"
        :style="{
          height: $vuetify.breakpoint.xsOnly
            ? ''
            : $vuetify.breakpoint.smOnly
            ? ''
            : $vuetify.breakpoint.mdOnly
            ? ''
            : '50vh',
        }"
        v-if="$auth.user.type == 'admin'"
      >
        <v-row no-gutters class="fill-height">
          <v-col
            cols="12"
            sm="6"
            md="6"
            lg="6"
            xs="6"
            class="d-flex align-center justify-center"
          >
            <v-col
              cols="12 "
              :class="{ 'ml-md-15': $vuetify.breakpoint.mdAndUp }"
            >
              <v-col class="text-center" cols="12">
                <h1
                  :class="[
                    $vuetify.breakpoint.xsOnly ? 'display-2' : 'display-2',
                    'font-weight-bold',
                  ]"
                >
                  Dashboard
                  <span style="color: #4141ff">Scholarships</span>
                </h1>
              </v-col>
              <v-col class="text-center" cols="12">
                <h5 class="body-2 caption font-weight-medium">
                  Dashboard function is an essential feature of any system that
                  provides users with an overview of relevant information in a
                  visually appealing format. It allows users to monitor key
                  metrics, track progress, and make informed decisions based on
                  real-time data.
                </h5>
              </v-col>
              <!-- <v-col cols="12 " class="text-center">
                <v-btn
                  color="primary"
                  dark
                  class=""
                  style="width: 200px"
                  :to="{ name: 'dashboard' }"
                >
                  Apply
                </v-btn>
              </v-col> -->
            </v-col>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="6"
            lg="6"
            xs="6"
            class="d-flex align-center justify-center"
          >
            <v-img
              :src="svgIconProviderdashboard"
              style="max-height: 40vh; fill: #0c7fda"
              contain
            >
            </v-img>
          </v-col>
        </v-row>
      </v-col>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      svgIcon: require("@/static/Apply.svg"),
      svgIconProviderPost: require("@/static/provider/postScholarship.svg"),
      svgIconProviderMap: require("@/static/provider/providerMap.svg"),
      svgIconProviderdashboard: require("@/static/provider/dashboardProvider.svg"),
      svgIconProviderWelcome: require("@/static/provider/welcomeProvider.svg"),
      // provider asset
      svgIconAdminApprove: require("@/static/admin/Approve.svg"),
    };
  },
};
</script>

<style>
</style>