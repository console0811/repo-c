<template>
  <client-only>
    <v-row
      no-gutters
      class="fill-height pa-4"
      justify="center"
      align-content="center"
    >
      <v-col cols="12">
        <v-col cols="12" v-if="$route.params.type == 'admin'">
          <v-row no-gutters justify="center">
            <v-col cols="12" lg="7" md="7" class="my-1">
              <v-card outlined>
                <Chart
                  class="pa-7"
                  :id="uuidv4()"
                  type="bar"
                  :options="{
                    ...chart.userType.options,
                    plugins: {
                      title: {
                        display: true,
                        text: 'Total User Chart',
                        font: {
                          weight: 'bold',
                          size: 16,
                        },
                        padding: {
                          top: 10,
                          bottom: 0,
                        },
                      },
                      datalabels: {
                        color: '#333#', // set color to a darker color value
                        font: {
                          weight: 'bold',
                          size: 25,
                        },
                      },
                    },
                  }"
                  :data="chart.userType.data"
                  :dataLabel="true"
                />
              </v-card>
            </v-col>

            <v-col cols="12" lg="7" md="7" class="my-1">
              <v-card outlined>
                <Chart
                  class="pa-7"
                  :id="uuidv4()"
                  type="bar"
                  :options="{
                    ...chart.userGender.options,
                    plugins: {
                      title: {
                        display: true,
                        text: 'User Gender Chart',
                        font: {
                          weight: 'bold',
                          size: 16,
                        },
                        padding: {
                          top: 10,
                          bottom: 0,
                        },
                      },
                      datalabels: {
                        color: '#333#', // set color to a darker color value
                        font: {
                          weight: 'bold',
                          size: 25,
                        },
                      },
                    },
                  }"
                  :data="chart.userGender.data"
                  :dataLabel="true"
                />
              </v-card>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" v-if="$route.params.type == 'sponsor'">
          <v-row no-gutters justify="center">
            <v-col cols="12" lg="7" md="7" class="my-1">
              <v-card outlined>
                <Chart
                  class="pa-7"
                  :id="uuidv4()"
                  type="bar"
                  :options="{
                    ...chart.applicantType.options,
                    plugins: {
                      title: {
                        display: true,
                        text: 'Scholars Educational level Chart',
                        font: {
                          weight: 'bold',
                          size: 16,
                        },
                        padding: {
                          top: 10,
                          bottom: 0,
                        },
                      },
                      datalabels: {
                        color: '#333#', // set color to a darker color value
                        font: {
                          weight: 'bold',
                          size: 25,
                        },
                      },
                    },
                  }"
                  :data="chart.applicantType.data"
                  :dataLabel="true"
                />
              </v-card>
            </v-col>

            <v-col cols="12" lg="7" md="7" class="my-1">
              <v-card outlined>
                <Chart
                  class="pa-7"
                  :id="uuidv4()"
                  type="bar"
                  :options="{
                    ...chart.applicantGender.options,
                    plugins: {
                      title: {
                        display: true,
                        text: 'Scholars Gender Chart',
                        font: {
                          weight: 'bold',
                          size: 16,
                        },
                        padding: {
                          top: 10,
                          bottom: 0,
                        },
                      },
                      datalabels: {
                        color: '#333#', // set color to a darker color value
                        font: {
                          weight: 'bold',
                          size: 25,
                        },
                      },
                    },
                  }"
                  :data="chart.applicantGender.data"
                  :dataLabel="true"
                />
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-col>
    </v-row>
  </client-only>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
const colors = [
  "#7C4DFF",
  "#536DFE",
  "#448AFF",
  "#40C4FF",
  "#FF5252",
  "#18FFFF",
  "#64FFDA",
  "#69F0AE",
  "#FF4081",
  "#B2FF59",
  "#E040FB",
].reverse();

export default {
  mounted() {
    if (this.$auth.user.type == "sponsor") {
      this.$axios
        .$get("/applicant/count-by-gender")
        .then((data) => {
          const { male = 0, female = 0, total = 0 } = data;
          this.chart.applicantGender.data.datasets[0].data = [
            male,
            female,
            total,
          ];
        })
        .catch((err) => console.log(err));

      this.$axios
        .$get("/applicant/count-by-level-of-education")
        .then((data) => {
          const { highSchool = 0, college = 0, total = 0 } = data;
          this.chart.applicantType.data.datasets[0].data = [
            highSchool,
            college,
            total,
          ];
        })
        .catch((err) => console.log(err));
    }

    if (this.$auth.user.type == "admin") {
      this.$axios
        .$get("/user/count-by-gender")
        .then((data) => {
          const { male = 0, female = 0, total = 0 } = data;
          this.chart.userGender.data.datasets[0].data = [male, female, total];
        })
        .catch((err) => console.log(err));

      this.$axios
        .$get("/user/count-by-type")
        .then((data) => {
          const { applicant = 0, sponsor = 0, total = 0 } = data;
          this.chart.userType.data.datasets[0].data = [
            applicant,
            sponsor,
            total,
          ];
        })
        .catch((err) => console.log(err));
    }
  },
  data() {
    return {
      chart: {
        userGender: {
          options: {
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  color: "black",
                  font: {
                    weight: "bold",
                  },
                },
              },
              x: {
                ticks: {
                  color: "black",
                  font: {
                    weight: "bold",
                  },
                },
              },
            },
            plugins: {
              legend: {
                display: false, // set display property to false to hide the legend
              },
              datalabels: {
                color: "black",
                font: {
                  weight: "bold",
                },
              },
            },
          },
          data: {
            labels: ["Male", "Female"],
            datasets: [
              {
                data: [],
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1,
              },
            ],
          },
        },
        userType: {
          options: {
            title: {
              display: true,
              text: "User Type Chart",
              font: {
                weight: "bold",
                size: 16,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  color: "black",
                  font: {
                    weight: "bold",
                  },
                },
              },
              x: {
                ticks: {
                  color: "black",
                  font: {
                    weight: "bold",
                  },
                },
              },
            },
            plugins: {
              legend: {
                display: false, // set display property to false to hide the legend
              },
              datalabels: {
                color: "black",
                font: {
                  weight: "bold",
                },
              },
            },
          },
          data: {
            labels: ["Applicant", "Sponsor", "Total"],
            datasets: [
              {
                data: [],
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1,
              },
            ],
          },
        },
        applicantType: {
          options: {
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  color: "black",
                  font: {
                    weight: "bold",
                  },
                },
              },
              x: {
                ticks: {
                  color: "black",
                  font: {
                    weight: "bold",
                  },
                },
              },
            },
            plugins: {
              legend: {
                display: false, // set display property to false to hide the legend
              },
              datalabels: {
                color: "black",
                font: {
                  weight: "bold",
                },
              },
            },
          },
          data: {
            labels: ["High School", "College", "Total"],
            datasets: [
              {
                data: [],
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1,
              },
            ],
          },
        },
        applicantGender: {
          options: {
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  color: "black",
                  font: {
                    weight: "bold",
                  },
                },
              },
              x: {
                ticks: {
                  color: "black",
                  font: {
                    weight: "bold",
                  },
                },
              },
            },
            plugins: {
              legend: {
                display: false, // set display property to false to hide the legend
              },
              datalabels: {
                color: "black",
                font: {
                  weight: "bold",
                },
              },
            },
          },
          data: {
            labels: ["Male", "Female"],
            datasets: [
              {
                data: [],
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1,
              },
            ],
          },
        },
      },
    };
  },

  methods: {
    uuidv4,
  },
};
</script>

<style>
</style>