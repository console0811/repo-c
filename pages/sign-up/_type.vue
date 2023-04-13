<template>
  <v-row
    no-gutters
    justify="center"
    class="pa-8 fill-height"
    align-content="center"
    style="background-color: #c7d0d8"
  >
    <v-col cols="12" lg="8" md="10" sm="10">
      <v-card outlined width="100%" style="border-radius: 10px">
        <v-form
          v-model="valid"
          @submit.prevent="signup({ user: applicant, attachments, profile })"
        >
          <v-row no-gutters class="pa-8">
            <v-col cols="12">
              <UserInput :value="applicant">
                <template v-slot:profile>
                  <v-file-input
                    v-model="profile"
                    accept="image/*"
                    label="Profile"
                    dense
                    outlined
                    hint="Optional"
                    :rules="[$rules.acceptImageOnly]"
                  ></v-file-input>
                </template>

                <template v-slot:attachment>
                  <v-file-input
                    v-model="attachments"
                    accept="application/pdf"
                    label="Attachments"
                    dense
                    outlined
                    :rules="[$rules.required]"
                    hint="Required"
                    multiple
                  ></v-file-input>
                </template>
              </UserInput>
            </v-col>
            <v-col cols="12">
              <v-row no-gutters justify="center">
                <v-col cols="12" lg="3" class="pa-2">
                  <v-btn block type="submit" :disabled="!valid" color="primary"
                    >submit</v-btn
                  >
                </v-col>
                <v-col cols="12" lg="3" class="pa-2">
                  <v-btn
                    block
                    @click="$router.push({ name: 'sign-up' })"
                    color="#2d3436"
                    class="white--text"
                  >
                    back
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import UserModel from "~/models/model.user";
import util from "~/plugins/util";
export default {
  mixins: [util],
  layout: "plain",

  mounted() {
    const { type = "" } = this.$route.params;
    if (type == "applicant") {
      this.applicant = new UserModel({
        name: [""],
        organization: "",
        email: "",
        password: "",
        contactNumber: "",
        dateOfBirth: "",
        address: "",
        mother: {
          name: "",
          contactNumber: "",
          occupation: "",
        },
        father: {
          name: "",
          contactNumber: "",
          occupation: "",
        },
        gwa: "",
        levelOfEducation: "",
        collegeCourse: "",
        yearLevel: "",
        existingScholarship: true,
        type: "",
        tin: "",
        background: "",
        profile: "",
        attachments: [],
      });
    }

    if (type == "sponsor") {
      console.log("1sponsor");
      this.applicant = new UserModel({
        name: [],
        organization: "",
        email: "",
        password: "",
        contactNumber: "",
        dateOfBirth: "",
        address: "",
        mother: { name: "", contactNumber: "", occupation: "" },
        father: { name: "", contactNumber: "", occupation: "" },
        gwa: "",
        levelOfEducation: "",
        collegeCourse: "",
        yearLevel: "",
        existingScholarship: false,
        type: "",
        tin: "",
        background: "",
        profile: "",
        attachments: [],
      });
    }
  },

  data() {
    return {
      valid: false,
      applicant: new UserModel({ type: this.$route.params.type }),
      profile: null,
      attachments: [],
    };
  },

  methods: {
    signup({ user = new UserModel(), attachments = [], profile = {} }) {
      this.$store.dispatch("setLoadingProperty", {
        value: true,
        property: "value",
      });
      const json = JSON.stringify(user);
      const blob = new Blob([json], { type: "application/json" });
      const data = new FormData();
      data.append("user", blob);
      for (const attachment of attachments) {
        data.append("file", attachment);
      }

      if (profile && profile.name) {
        data.append("profile", profile);
      }

      this.$axios
        .$post("/user/sign-up", data, {
          headers: { "Content-Type": "multipart/form-data" },
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
          this.$router.push({ name: "index" });
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
};
</script>

<style>
</style>