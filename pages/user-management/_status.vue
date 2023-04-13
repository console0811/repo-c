<template>
  <v-row no-gutters class="pa-4">
    <v-col cols="12">
      <v-row no-gutters>
        <template v-for="status in statuses">
          <v-col
            cols="12"
            lg="2"
            md="4"
            sm="4"
            :key="status.text"
            :class="{
              'px-2 ': $vuetify.breakpoint.smAndUp && status.text == 'Active',
              'my-2': $vuetify.breakpoint.xsOnly && status.text == 'Active',
            }"
          >
            <v-btn
              block
              :to="{ name: status.to, params: status.params }"
              tile
              :color="status.color"
              dark
              style="border-radius: 5px"
            >
              {{ status.text }}
            </v-btn>
          </v-col>
        </template>
      </v-row>
    </v-col>

    <v-col cols="12" class="mt-2">
      <v-card outlined>
        <v-row no-gutters>
          <v-col cols="12" class="">
            <v-row no-gutters>
              <v-col
                cols="12"
                lg="6"
                class="pa-2 mt-1"
                :class="{ 'text-center': $vuetify.breakpoint.xsOnly }"
              >
                <h1 class="headline font-weight-medium">
                  {{
                    this.$route.params.status === "active"
                      ? "Active Provider List"
                      : this.$route.params.status === "pending"
                      ? "Pending Provider List"
                      : "Disapproved Provider List"
                  }}
                </h1>
              </v-col>
              <v-col cols="12" lg="6" class="pa-2">
                <v-text-field
                  solo
                  prepend-inner-icon="mdi-search-web"
                  v-model="search"
                  dense
                  label="search"
                  outlined
                  hide-details
                  @keyup.enter="
                    getUsers({
                      status: $route.params.status,
                      page: $route.params.page,
                      search: search,
                    })
                  "
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12">
            <v-divider></v-divider>
          </v-col>
          <v-col cols="12">
            <v-data-table
              :headers="headers"
              :items="items"
              :server-items-length="length"
              :sort-desc="[false, true]"
              multi-sort
              @update:page="
                getUsers({
                  status: $route.params.status,
                  page: $event,
                  search: search,
                }),
                  (page = $event)
              "
            >
              <template v-slot:[`item.dateCreated`]="{ item }">
                {{
                  new Date(item.dateCreated).toLocaleString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })
                }}
              </template>
              <template v-slot:[`item.name`]="{ item }">
                {{
                  item.organization || item.name.toString().replace(/,/g, " ")
                }}
              </template>

              <template v-slot:[`item.actions`]="{ item }">
                <v-btn
                  dense
                  class="outline black--text yellow accent-4 text-capitalize"
                  elevation="2"
                  @click="setUser({ value: item, mode: 'view' })"
                >
                  view
                </v-btn>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-card>
    </v-col>

    <v-dialog v-model="userDialog" width="70%" persistent>
      <v-form v-model="userIsValid" @submit.prevent="() => {}">
        <!-- header -->
        <v-card tile height="5vh" color="#EFF2F4">
          <v-row no-gutters class="fill-height" justify="center" align="center">
            <span class="text-capitalize font-weight-medium"> View </span>
          </v-row>
        </v-card>
        <!-- content -->
        <v-card tile height="79vh" style="overflow: auto" class="pa-0">
          <v-row no-gutters class="pa-8" justify="center">
            <v-col cols="12" lg="10" md="6">
              <UserInput :value="user" :type="user.type" readonly> </UserInput>
            </v-col>
          </v-row>
        </v-card>
        <v-card tile max-height="6vh" color="#EFF2F4">
          <v-row no-gutters justify="center">
            <v-col cols="12" lg="2" md="2" sm="3" class="pa-2">
              <v-btn
                block
                small
                @click="setUser({ dialog: false })"
                color="#5D7285"
                dark
                >close</v-btn
              >
            </v-col>

            <v-col
              cols="12"
              lg="2"
              md="2"
              sm="3"
              class="pa-2"
              v-if="user.status == 'pending'"
            >
              <v-btn color="primary" block small @click="approveUser(user)">
                Approve
              </v-btn>
            </v-col>

            <v-col
              cols="12"
              lg="2"
              md="2"
              sm="3"
              class="pa-2"
              v-if="user.status == 'pending'"
            >
              <v-btn color="error" block small @click="disapproveUser(user)">
                Disapprove
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-form>
    </v-dialog>
  </v-row>
</template>

<script>
import UserModel from "~/models/model.user";
export default {
  data() {
    return {
      search: "",
      length: 0,
      page: 0,
      headers: [
        {
          text: "Date And Time ",
          value: "dateCreated",
        },
        {
          text: "Name",
          value: "name",
        },
        {
          text: "Actions",
          value: "actions",
        },
      ],
      items: [],
      statuses: [
        {
          text: "Pending",
          to: "user-management-status",
          params: { status: "pending" },
          color: "info",
        },
        {
          text: "Active",
          to: "user-management-status",
          params: { status: "active" },
          color: "success",
        },
        {
          text: "Disapproved",
          to: "user-management-status",
          params: { status: "disapproved" },
          color: "error",
        },
      ],
      user: new UserModel(),
      userDialog: false,
      userIsValid: false,
      mode: "",
    };
  },

  mounted() {
    this.getUsers();
  },

  methods: {
    getUsers({
      status = this.$route.params.status,
      search = "",
      page = this.page,
    } = {}) {
      this.$axios
        .$get(`/user/status/${status}/page/${page}`, { params: { search } })
        .then((data) => {
          this.items = data.items;
          this.length = data.length;
        })
        .catch(() => {
          this.items = [];
          this.length = 0;
        });
    },
    setUser({ value = new UserModel(), mode = "", dialog = true } = {}) {
      this.user = JSON.parse(JSON.stringify(value));
      this.mode = mode;
      this.userDialog = dialog;
    },
    updateUser({ _id = "", mode = "" } = {}) {
      this.$axios
        .$put(`/user/${mode}/${_id}`)
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
          await this.getUsers();
          await this.setUser({ dialog: false });
        })
        .catch((error) => {
          console.log(error);
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
    approveUser(value = new UserModel()) {
      this.updateUser({ _id: value._id, mode: "approve" });
    },
    disapproveUser(value = new UserModel()) {
      this.updateUser({ _id: value._id, mode: "disapprove" });
    },
  },
};
</script>

<style >
.v-application--is-ltr .v-data-footer {
  padding: 12px;
}

.v-application--is-ltr .v-data-footer__select {
  display: none;
}

.v-application--is-ltr .v-data-footer__pagination {
  margin-left: auto;
}
</style>