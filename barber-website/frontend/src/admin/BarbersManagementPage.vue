<template>
  <v-container>
    <v-row>
      <v-col
        lg="3"
        md="4"
        sm="6"
        xs="12"
        justify="space-around"
        v-for="barber in barbers"
        :key="barber.index"
        class="pa-10 mb-5"
      >
        <v-card width="300" class="">
          <v-img height="300px" src="../assets/black.jpeg">
            <v-app-bar flat color="rgba(0, 0, 0, 0)">
              <v-spacer></v-spacer>
              <v-menu bottom right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="white" icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item-group>
                    <v-list-item v-for="(item, index) in items" :key="index">
                      <v-list-item-content>
                        <v-list-item-title
                          @click="
                            selectedAction(item.optionID, barber.telephone)
                          "
                          v-text="item.title"
                        ></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-menu>
            </v-app-bar>
            <v-card-title
              class="white--text"
              style="margin-right: auto; margin-left: auto"
            >
              <p style="margin-right: auto; margin-left: auto">
                {{ barber.firstname }}
              </p>
            </v-card-title>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-center">
        <v-btn @click="getAllBarbers()" class="white--text mb-15">
          <SignUp @BarberCreated="getAllBarbers()"> Add Account </SignUp>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SignUp from "../components/SignUp.vue";
import axios from "axios";

export default {
  components: { SignUp },
  name: "BarbersManagementPage",
  data() {
    return {
      items: [
        { title: "User Profile", optionID: 0 },
        { title: "Delete User", optionID: 1 },
      ],
      offset: true,
      barbers: [],
    };
  },
  methods: {
    selectedAction(optionID, barberPhone) {
      console.log(optionID);
      if (optionID == 1) {
        this.deleteBarber(barberPhone);
      }
    },
    async getAllBarbers() {
      try {
        const data = await axios.get(`http://localhost:5001/users`);
        var users = data.data;
        this.barbers = this.extractBarbersFromUsersList(users);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteBarber(barberPhone) {
      console.log(barberPhone);
      try {
        const data = await axios.post(`http://localhost:5001/deleteUser`, {
          Telephone: barberPhone,
        });
        this.getAllBarbers();
        console.log(barberPhone);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
    extractBarbersFromUsersList(user) {
      var barberList = [];
      for (var i = 0; i < user.length; i++) {
        if (user[i].userrole == "Barber") {
          barberList.push(user[i]);
        } else continue;
      }
      return barberList;
    },
  },
  created: function () {
    this.getAllBarbers();
  },
};
</script>
<style></style>
