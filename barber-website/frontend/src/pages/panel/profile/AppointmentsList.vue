<template>

  <div class=" bg-white">
    <h3>Appoinments</h3>
    <ul v-for="(item,i) in items" :key="i">
      <li>
        {{item.date}}
        <div>
          {{item.service}}
        </div>
        <div class="pa-2 text-right">
          <v-btn depressed small color="primary">confirm</v-btn>
          <v-btn depressed small color="primary" class="ml-2">cancel</v-btn>
        </div>
      </li>
    </ul>
  </div>

</template>

<script>

export default {

  data: () => ({

    items: [
      {
        date: '2022-09-12 12:00', service: 'haircut by kevin'
      },
      {
        date: '2022-09-12 12:00', service: 'haircut by kevin'
      }
    ]


  }),
  methods: {

  }
}
</script>

<style>


</style>