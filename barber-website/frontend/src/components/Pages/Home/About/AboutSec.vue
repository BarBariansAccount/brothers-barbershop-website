<template>
  <v-row class="mb-8 mt-8" justify="center">
    <v-col cols="12" lg="6" justify="center">
      <v-card
        class="text-center d-flex flex-column align-center justify-center"
        height="100%"
        flat
      >
        <div class="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2797.176987553061!2d-73.62923248398603!3d45.48638057910121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc919fd69f12841%3A0xbe6e66664b3010b9!2s4961c%20Queen%20Mary%20Rd%2C%20Montreal%2C%20QC%20H3W%201X4!5e0!3m2!1sen!2sca!4v1665265848312!5m2!1sen!2sca"
            width="100%"
            height="100%"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </v-card>
    </v-col>
    <v-col cols="12" lg="6" justify="center">
      <v-card
        class="text-center d-flex flex-column align-center justify-center"
        height="100%"
        flat
      >
        <div class="barbershop-description">
          <h2 class="mt-2">ABOUT BROTHERS' BARBERSHOP</h2>
          <br />
          <p
            class="description-paragraph"
            :contenteditable="userRole == 'Admin'"
            @input="onInput"
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident
            fuga, molestias deleniti vel rerum nisi aperiam. Quibusdam corrupti
            rem voluptate explicabo minus officia, incidunt eum dolorem voluptas
            assumenda. Aut, quia? Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Reiciendis maxime, enim et aliquid sunt quibusdam
            quidem nam quo consectetur animi, dolore minima quam nostrum earum.
            Commodi sint eligendi in ratione. Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Asperiores accusamus harum ex incidunt
            aperiam voluptate iure non alias, esse fugiat, quas nam! Voluptates
            velit sed labore ipsum nobis provident corrupti.
          </p>
          <div class="mb-10 px-6" v-if="!isHidden">
            <v-row style="justify-content: center;">
              <v-col cols="auto">
                <v-btn color="green" outlined @click="onSaveDescription()"
                  >save</v-btn
                >
              </v-col>
              <v-col cols="auto">
                <v-btn color="red" outlined @click="onCancel()">cancel</v-btn>
              </v-col>
            </v-row>
          </div>
          <v-btn color="black" class="mt-12" @click="bookNow()" outlined
            >BOOK NOW</v-btn
          >
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      description: "",
      userRole: "",
      isHidden: true,
    };
  },
  methods: {
    bookNow() {
      this.$router.push("/appointment");
    },
    onSaveDescription() {
      console.log(this.description);
      this.isHidden = true;
    },
    onInput(e) {
      this.description = e.target.innerText;
      this.isHidden = false;
    },
    onCancel() {
      this.isHidden = true;
    },
    getUser() {
      if (this.$store.state.user) {
        this.userRole = this.$store.state.user.userrole;
        console.log("userRole", this.userRole);
      }
    },
  },

  created: function() {
    this.getUser();
  },
};
</script>

<style>
.barbershop-description {
  text-align: center;
  /* margin-left: 14%; */
  width: 75%;
  height: 100%;
}

.map {
  text-align: center;
  /* margin-left: 14%; */
  width: 75%;
  height: 100%;
  border-color: #424949;
  border-style: solid;
}

.description-paragraph {
  /* margin-right: 10%;
  margin-left: 10%; */
  margin-top: 10px;
}
</style>
