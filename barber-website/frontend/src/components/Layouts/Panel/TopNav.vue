<template>
    <v-app-bar flat rounded color="white" outlined>
        <v-app-bar-nav-icon @click="$emit('toggle')"></v-app-bar-nav-icon>

        <v-toolbar-title>Dashboard Panel</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-menu left bottom offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </template>

            <v-list>
                <v-list-item @click="logout">
                    <v-list-item-title>logout</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>
<script>
export default {
    methods: {
        logout() {
            this.$store.dispatch('logout')
            this.$router.push('/')
        }
    }
}
</script>
<style>
.v-app-bar {
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1) !important;
}
</style>