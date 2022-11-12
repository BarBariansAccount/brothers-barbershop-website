<template>
  <v-card class="mx-auto rounded-xl" color="#F7F7F7">
    <v-card-text class="text-center">
      <p
        contentEditable="True"
        class="my-2 text-center font-weight-bold text-h5"
      >
        <slot></slot>
      </p>

      <div contentEditable="True" class="text-center mt-6 text-h6">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab autem
        assumenda quis excepturi veniam laudantium temporibus, est optio
        voluptatem tenetur necessitatibus molestias dolores corporis fuga dicta
        distinctio expedita explicabo obcaecati!
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    loading: false,
    selection: 1,
    faqList: [],
  }),

  methods: {
    reserve() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
    },

    async getFAQlist() {
      try {
      } catch {}
    },
  },
};
</script>
