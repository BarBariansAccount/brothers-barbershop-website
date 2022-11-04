<template>
    <v-card class="mx-auto ">
        <v-card-text class="text-center">

            <v-avatar size="90">
                <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
            </v-avatar>
            <h3 class="my-2 text-center font-weight-bold">
                user
            </h3>

            <div class="my-2 text-center">
                <v-rating :value="4.5" color="amber" dense half-increments readonly size="20"></v-rating>
            </div>

            <div class="text-center">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab autem assumenda quis excepturi veniam
                laudantium temporibus, est optio voluptatem tenetur necessitatibus molestias dolores corporis fuga dicta
                distinctio expedita explicabo obcaecati!
            </div>
            <div class="text-center subtitle-2 my-4">
                10 min ago
            </div>
        </v-card-text>
    </v-card>
</template>
<script>
export default {
    data: () => ({
        loading: false,
        selection: 1,
    }),

    methods: {
        reserve() {
            this.loading = true

            setTimeout(() => (this.loading = false), 2000)
        },
    },
}
</script>