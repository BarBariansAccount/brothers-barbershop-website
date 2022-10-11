<template>
    <v-container>
        <v-row>
            <v-col lg="3" md="4" sm="6" xs="12" justify="space-around" v-for="item in menuItems" :key="item.title"
                class="pa-10 mb-5">
                <v-card width="300" class="">
                    <v-img height="300px" src="../assets/barber-avatar.jpg.webp">
                        <v-app-bar flat color="rgba(0, 0, 0, 0)">
                            <v-spacer></v-spacer>
                            <v-menu bottom right>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn color="white" icon v-bind="attrs" v-on="on">
                                        <v-icon>mdi-dots-vertical</v-icon>
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item v-for="(item, index) in items" :key="index">
                                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </v-app-bar>
                        <v-card-title class="white--text mt-15 mr-10">
                            <v-spacer></v-spacer>
                            <p class=" text-right">
                                {{item.title}}
                            </p>
                        </v-card-title>
                    </v-img>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" class="text-center">
                <v-btn color="#5F6BBA" class="white--text mb-15" @click="bookNow()">ADD+</v-btn>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
export default {
    name: "BarbersManagementPage",
    data() {
        return {
            items: [
                { title: 'User Profile' },
                { title: 'Delete User' },
            ],
            offset: true,
            menuItems: [
                { title: "BARBERS", },
                { title: "CLIENTS", },
                { title: "APPOINTMENT" },
                { title: "PHOTOS", },
                { title: "PRODUCTS", },
                { title: "QUESTIONS", },
                { title: "OUR INFO", },
                { title: "OUR INF", }
            ],
            messages: [
                {
                    from: 'You',
                    message: `Sure, I'll see you later.`,
                    time: '10:42am',
                    color: 'deep-purple lighten-1',
                },
                {
                    from: 'John Doe',
                    message: 'Yeah, sure. Does 1:00pm work?',
                    time: '10:37am',
                    color: 'green',
                },
                {
                    from: 'Started: 9:00am',
                },
            ],
        }
    }
}
</script>

<style>

</style>