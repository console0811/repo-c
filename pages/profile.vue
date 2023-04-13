<template>
  <v-row no-gutters justify="center" class="fill-height" align-content="center">
    <v-col cols="12" lg="10" md="10" sm="10">
      <v-card outlined width="100%" style="border-radius: 10px" class="my-4">
        <v-form
          v-model="valid"
          @submit.prevent="
            updateProfile({ user: applicant, attachments, profile })
          "
        >
          <v-row no-gutters class="pa-8">
            <v-col cols="12">
              <UserInput :value="applicant" :type="$auth.user.type">
                <template v-slot:profile>
                  <v-file-input
                    prepend-icon="mdi-image"
                    v-model="profile"
                    accept="image/*"
                    label="Profile"
                    dense
                    outlined
                    hint="Optional"
                    :rules="[$rules.acceptImageOnly]"
                  ></v-file-input>
                </template>
              </UserInput>
            </v-col>
            <v-col cols="12" class="mt-3">
              <v-row no-gutters justify="center">
                <v-col cols="12" lg="7" class="pa-2">
                  <v-btn
                    block
                    type="submit"
                    :disabled="!valid"
                    color="#0C7FDA"
                    class="white--text pa-5"
                    style="border-radius: 4.18px"
                    >Update</v-btn
                  >
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

  mounted() {
    this.applicant = JSON.parse(JSON.stringify(this.$auth.user));
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
    updateProfile({ user = new UserModel(), attachments = [], profile = {} }) {
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
        .$put("/user/", data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(async ({ message }) => {
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
          await this.$auth.fetchUser();
          this.applicant = JSON.parse(JSON.stringify(this.$auth.user));
          this.attachments = [];
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