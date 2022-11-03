<template>

  <div class="">
    <h3>Available</h3>
    <ul v-for="(item,i) in Available" :key="i">
      <li>
        {{item.day}}
        <span class="ml-auto">
          {{item.date}}
        </span>
        <div>
          {{item.from}}
          {{"To"}}
          {{item.to}}
        </div>
        <div class="pa-2 text-right">
          <v-btn depressed small color="primary">Edit</v-btn>
          <v-btn depressed small color="primary" class="ml-2">cancel</v-btn>
        </div>
      </li>
    </ul>
  </div>

</template>

<script>

export default {

  data: () => ({
    Available: [
      {
        date: '2022-09-14', day: 'Monday', from:'12 pm',to:'4 pm'
      },
      {
        date: '2022-09-20', day: 'Tuseday', from:'12 pm',to:'4 pm'
      },
      {
        date: '2022-09-22', day: 'Friday', from:'12 pm',to:'4 pm'
      }
     
    ],


  }),
  methods: {

  }
}
</script>

