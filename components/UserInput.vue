<template>
  <v-row no-gutters>
    <v-col cols="12" class="h4 text-capitalize" v-if="isApplicant">
      personal details
    </v-col>
    <v-col cols="12" class="h4 text-capitalize" v-else>
      Provider Information
    </v-col>

    <v-col cols="12" v-if="isApplicant">
      <v-row no-gutters>
        <v-col cols="12" lg="6" md="6" class="my-1 pr-lg-1 pr-md-1">
          <InputTextField
            v-model="value.name[0]"
            label="Given Name"
            :rules="[$rules.required]"
            required
          />
        </v-col>

        <v-col cols="12" lg="6" md="6" class="my-1 pl-lg-1 pl-md-1">
          <InputTextField
            v-model="value.name[1]"
            label="Middle Name"
            :rules="[$rules.required]"
            required
          />
        </v-col>

        <v-col cols="12" lg="6" md="6" class="my-1 pr-lg-1 pr-md-1">
          <InputTextField
            v-model="value.name[2]"
            label="Surname"
            :rules="[$rules.required]"
            required
          />
        </v-col>

        <v-col cols="12" lg="6" md="6" class="my-1 pl-lg-1 pl-md-1">
          <InputTextField v-model="value.name[3]" label="Suffix" :rules="[]" />
        </v-col>
      </v-row>
    </v-col>
    <!-- Provider -->
    <v-col cols="12" v-else>
      <v-row no-gutters>
        <v-col cols="12" lg="6" md="6" class="my-1 pr-lg-1 pr-md-1">
          <InputTextField
            v-model="value.organization"
            label="Name of the Organization"
            :rules="[$rules.required]"
            required
          />
        </v-col>

        <v-col cols="12" lg="6" md="6" class="my-1 pl-lg-1 pl-md-1">
          <InputTextField
            v-model="value.contactNumber"
            label="Contact Number"
            :rules="[$rules.required]"
            required
          />
        </v-col>

        <v-col cols="12" lg="6" md="6" class="my-1 pr-lg-1 pr-md-1">
          <InputTextField
            v-model="value.email"
            label="Email"
            :rules="[$rules.required, $rules.email]"
            required
          />
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12">
      <InputTextField
        v-model="value.address"
        :label="isApplicant ? 'Address(Permanent)' : 'Address'"
        :rules="[$rules.required]"
        required
      />
    </v-col>

    <v-col cols="12" v-if="isApplicant">
      <v-row no-gutters>
        <v-col cols="12" lg="4" md="4" class="my-1 pr-lg-1 pr-md-1">
          <InputTextField
            v-model="value.dateOfBirth"
            label="Date Of Birth"
            type="date"
            :rules="[$rules.required]"
            required
          />
        </v-col>

        <v-col cols="12" lg="4" md="4" class="my-1 px-lg-1 px-md-1">
          <InputTextField
            v-model="value.contactNumber"
            label="Contact Number"
            :rules="[$rules.required]"
            required
          />
        </v-col>

        <v-col cols="12" lg="4" md="4" class="my-1 pl-lg-1 pl-md-1">
          <InputTextField
            v-model="value.email"
            label="Email"
            :rules="[$rules.required, $rules.email]"
            required
          />
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" v-else>
      <v-row no-gutters>
        <v-col cols="12" lg="6" md="6" class="my-1 pr-lg-1 pr-md-1">
          <slot name="profile"></slot>
        </v-col>

        <v-col cols="12" lg="6" md="6" class="my-1 px-lg-1 px-md-1">
          <InputTextField
            v-model="value.tin"
            label="TIN"
            :rules="[$rules.required]"
            required
          />
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" v-if="isApplicant">
      <v-row no-gutters>
        <v-col cols="12" lg="6" md="6" class="pr-lg-4 pr-md-4">
          <v-row no-gutters>
            <v-col cols="12" class="h4 text-capitalize"> mother </v-col>
            <v-col cols="12" class="my-1">
              <InputTextField
                v-model="value.mother.name"
                label="Name (Maiden)"
                :rules="[$rules.required]"
                required
              />
            </v-col>

            <v-col cols="12" class="my-1">
              <InputTextField
                v-model="value.mother.contactNumber"
                label="Contact Number"
                :rules="[$rules.required]"
                required
              />
            </v-col>

            <v-col cols="12" class="my-1">
              <InputTextField
                v-model="value.mother.occupation"
                label="Occupation"
                :rules="[$rules.required]"
                required
              />
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" lg="6" md="6" class="pl-lg-4 pl-md-4">
          <v-row no-gutters>
            <v-col cols="12" class="h4 text-capitalize"> father </v-col>
            <v-col cols="12" class="my-1">
              <InputTextField
                v-model="value.father.name"
                label="Name"
                :rules="[$rules.required]"
                required
              />
            </v-col>

            <v-col cols="12" class="my-1">
              <InputTextField
                v-model="value.father.contactNumber"
                label="Contact Number"
                :rules="[$rules.required]"
                required
              />
            </v-col>

            <v-col cols="12" class="my-1">
              <InputTextField
                v-model="value.father.occupation"
                label="Occupation"
                :rules="[$rules.required]"
                required
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" v-else>
      <v-row no-gutters>
        <v-col cols="12">
          <InputTextarea
            v-model="value.background"
            outlined
            name="input-7-4"
            label="Background of the organization"
            :rules="[$rules.required]"
            required
            height="200"
            no-resize
          />
        </v-col>
      </v-row>
    </v-col>

    <v-col
      cols="12"
      lg="4"
      md="4"
      sm="6"
      class="my-1 pr-lg-1 pr-md-1"
      v-if="isApplicant"
    >
      <InputTextField
        v-model="value.gwa"
        label="General Weighted Average"
        :rules="[$rules.required]"
        required
      />
    </v-col>

    <v-col
      cols="12"
      lg="4"
      md="4"
      sm="6"
      class="my-1 pl-lg-1 pl-md-1"
      v-if="isApplicant"
    >
      <InputSelect
        v-model="value.levelOfEducation"
        :items="options.levelOfEducations"
        label="Level of education"
        :rules="[$rules.required]"
        required
        class="text-capitalize"
      />
    </v-col>

    <v-col cols="12" v-if="isApplicant">
      <v-row no-gutters>
        <v-col cols="12" class="h4 text-capitalize my-1 pr-lg-1 pr-md-1">
          educational background
        </v-col>

        <v-col cols="12" lg="8" md="8" class="my-1 pr-lg-1 pr-md-1">
          <InputTextField
            v-model="value.collegeCourse"
            label="College Course"
            :rules="[$rules.required]"
            required
            style="text-transform: capitalize"
          />
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" v-if="isApplicant">
      <v-row no-gutters>
        <v-col cols="12" class="h4 text-capitalize">
          Do you have an existing scholarship?
        </v-col>

        <v-col cols="12" lg="8" md="8">
          <v-radio-group
            v-model="value.existingScholarship"
            dense
            hide-details
            class="ma-0"
          >
            <v-radio label="Yes" :value="true"></v-radio>
            <v-radio label="No" :value="false"></v-radio>
          </v-radio-group>
        </v-col>

        <v-col
          cols="12"
          lg="6"
          md="6"
          class="mt-4"
          v-if="value.existingScholarship"
        >
          <slot name="attachment"> </slot>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import UserModel, { UserOptionsModel } from "~/models/model.user";
import util from "~/plugins/util";
export default {
  mixins: [util],

  inheritAttrs: false,

  props: {
    value: {
      type: Object,
      default() {
        return new UserModel();
      },
    },
  },

  data() {
    return {
      options: new UserOptionsModel(),
    };
  },

  computed: {
    typeOfApplicant() {
      return this.$route.params.type;
    },
    isApplicant() {
      return this.typeOfApplicant == "applicant";
    },
  },
};
</script>

<style>
</style>