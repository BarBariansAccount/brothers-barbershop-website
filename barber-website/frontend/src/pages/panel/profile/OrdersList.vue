<template>

  <div class=" ">
    <h3>Orders</h3>
          <ul v-for="(item,i) in orders" :key="i">
            <li>
              {{item.name}}
              <span class="ml-auto">
                {{item.count}}X
              </span>
              <div>
                {{item.date}}
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
    orders: [
      {
        date: '2022-09-12 12:00', name: 'shampoo', count: 3
      },
      {
        date: '2022-09-12 12:00', name: 'Conditioner', count: 1
      }
    ],


  }),
  methods: {

  }
}
</script>

