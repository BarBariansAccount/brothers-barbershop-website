<template>
  <div>
    <h1>Profile</h1>
    <v-container>
      <v-row>
        <v-col cols="12" md="4" v-for="item , i in items" :key="i">
          <div class="card ">
            <div>
              <span>{{item.title}}</span>
              <p>{{item.count}}</p>

            </div>
            <div>
              <v-icon>
                {{item.icon}}
              </v-icon>
            </div>
          </div>
        </v-col>
        <v-col cols="12" >
          <div class="content">

            <h1>content</h1>
          </div>
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<script>

export default {
  data() {
    return {
      items: [
        { title: 'Orders', count: '*Shampoo 300ml x1', icon: 'mdi-basket' },
        { title: 'Avaibilities', count:'*Monday 2 to 4 pm 2022-10-01', icon: 'mdi-calendar' },
        { title: 'Last Password Change', count: '* 2022-10-02 10:20:00 pm', icon: 'mdi-key' },
      ]
    }
  }
}
</script>

<style>
.card {
  display: flex;
  justify-content: space-between;
  /* border: 1px solid gray; */
  border-radius: 10px;
  /* height: 60px; */
  padding: 20px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
  background-color: #EFF3F8;
}
.content{
  background-color: #EFF3F8;
  height: 300px;
  border-radius: 10px;
  padding: 20px;
}
</style>