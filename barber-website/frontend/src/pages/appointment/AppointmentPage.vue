<template>
  <v-container>
    <h1>Set an Appointment</h1>
    <!-- step 1 -->
    <h2 class="mt-4">1. Select Service</h2>
    <v-item-group multiple>
      <v-container>
        <v-row>
          <v-col v-for="s, i in services" :key="i" cols="6" md="2">
            <v-item v-slot="{ active, toggle }">
              <v-card :color="active ? 'gray' : 'white'" @click="toggle">
                <v-card-title>
                  <div>
                    {{ s.title }}
                  </div>
                  <div class="subtitle-2">
                    {{ s.price }} - {{ s.time }}
                  </div>

                </v-card-title>
                <v-card-text>
                  <div class="overline">
                    {{ s.discount }} off on :
                  </div>
                  <div v-for="d, j in s.off_days" :key="j">
                    - {{ d }}
                  </div>

                </v-card-text>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
    <!-- step 2 -->
    <h2 class="mt-4">2. Select Staff Member</h2>
    <v-item-group>
      <v-container>
        <v-row>
          <v-col class="mr-4" v-for="s, i in staffs" :key="i" cols="6" md="2">
            <v-item v-slot="{ active, toggle }">
              <v-avatar :size="200" :class="active ? 'avatar-active' : ''" @click="toggle">
                <img :src="s.img" alt="">
              </v-avatar>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
    <!-- step 3 -->
    <h2 class="mt-4 mb-2">3. Select prefered Date and Time</h2>
    <v-row>
      <v-col cols="12" md="6">
        <v-date-picker v-model="picker"  full-width></v-date-picker>
      </v-col>
      <v-col cols="12" md="6">
        <div class="font-weight-bold">
          Available on {{ picker }} :
        </div>
        <div class="text-muted">
          Time zone
        </div>
        <div v-for="a, i in avaiables" :key="i" class="subtitle-2 mt-4">

          {{ a.time }}
          <v-chip-group v-model="selectedTime" column>
            <v-chip v-for="t in a.av" :key="t" filter outlined>
              {{ t }}
            </v-chip>
          </v-chip-group>
        </div>
      </v-col>
    </v-row>
    <!-- step 3 -->
    <h2 class="mt-4 mb-2">4. You are nearly done ,Enter your details below</h2>
    <v-row>
      <v-col cols="6">
        <v-text-field label="mobile phone" dense></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field label="Email" dense></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field label="First Name" dense></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field label="Last Name" dense></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-textarea label="Note" dense />
      </v-col>
      <v-col cols="12">
        <v-btn class="mr-4" color="secondary">Book Appointment</v-btn>
        <v-btn color="secondary">Back to home</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      services: [
        {
          title: 'Haircut', price: '35$', time: '45min', discount: '5%', off_days: ['Tuesday', 'wednesday', 'thursday']
        },
        {
          title: 'Haircut', price: '35$', time: '45min', discount: '5%', off_days: ['Tuesday', 'wednesday', 'thursday']
        },
        {
          title: 'Haircut', price: '35$', time: '45min', discount: '5%', off_days: ['Tuesday', 'wednesday', 'thursday']
        },
        {
          title: 'Haircut', price: '35$', time: '45min', discount: '5%', off_days: ['Tuesday', 'wednesday', 'thursday']
        },
        {
          title: 'Haircut', price: '35$', time: '45min', discount: '5%', off_days: ['Tuesday', 'wednesday', 'thursday']
        },
      ],
      staffs: [
        {
          id: 1, name: "ali", img: 'av.png'
        },
        {
          id: 1, name: "ali", img: 'av.png'
        },
        {
          id: 1, name: "ali", img: 'av.png'
        },
      ],
      picker: null,
      avaiables: [
        {
          time: 'Morning', av: ['10:00', '12:00']
        },
        {
          time: 'Afternoon', av: ['11:00', '12:00']
        },
        {
          time: 'Evening', av: ['10:00', '12:00']
        },
      ],
      selectedTime: null
    }
  }
}
</script>

<style scoped>
.v-card__title {
  flex-direction: column;
  align-items: flex-start;
}

.v-sheet.v-card {
  border-radius: 20px;
}

.avatar-active {
  border: 3px solid yellow;

}
</style>