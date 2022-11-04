<template>
    <aside>
        <div class="menu-wrap">
            <!-- profile -->
            <div class=" ">
                <div class="icon text-center">
                    <v-icon size="140"> mdi-account-circle-outline </v-icon>
                    <div>

                        <v-icon class="edit-icon" size="30" color="blue">
                            mdi-pencil-circle-outline
                        </v-icon>
                    </div>
                </div>
                <div class="text-center">
                    <h1>{{ firstname + " " + lastname }}</h1>
               </div>
            </div>
            <!-- list -->
            <v-list>
                <template v-for="item in items">
                    <v-list-group :key="item.title" v-if="item.items && item.items.length>0" v-model="item.active"
                        :prepend-icon="item.action" no-action>
                        <template v-slot:activator>
                            <v-list-item-content>
                                <v-list-item-title v-text="item.title"></v-list-item-title>
                            </v-list-item-content>
                        </template>

                        <v-list-item v-for="child in item.items" :key="child.title" exact :to="child.to">
                            <v-list-item-content>
                                <v-list-item-title v-text="child.title"></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-group>
                    <v-list-item v-else :key="'x'+item.title" exact :to="item.to">
                        <v-list-item-icon>
                            <v-icon v-text="item.action"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.title"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>
        </div>
    </aside>
</template>
<script>
export default {
    data: () => ({
        items: [
            {
                action: 'mdi-home',
                title: 'Home',
                to: '/panel'
            },
            {
                action: 'mdi-basket',
                title: 'Orders',
                to: '/panel/orders'
            },
            {
                action: 'mdi-calendar',
                title: 'Availabilities',
                to: '/panel/availabilities'
            },
            {
                action: 'mdi-account',
                active: true,
                items: [
                    { title: 'Edit Profile', to: '/panel/profile/edit-profile' },
                    { title: 'Change Password', to: '/panel/profile/change-password' },
                    { title: 'Unsubscribe', to: '/panel/profile/unsubrcibe' },
                ],
                title: 'Profile',
            }
        ],
    }),
    computed: {
        firstname() {
            return this.$store.state.user?.firstname
        },
        lastname() {
            return this.$store.state.user?.lastname
        },
    },

}
</script>
<style scoped>
aside {
    width: 300px !important;
    height: 100%;
    padding: 30px 0 30px 30px;
    flex-grow: 0;
    flex-shrink: 0;
}

@media (max-width:700px) {
    aside {
        position: absolute;
        left: -30px;
        top: 30px;
        /* background-color: rgba(0, 0, 0, 0.1); */
        z-index: 100;
    }
}

.menu-wrap {
    background-color: white;
    border-radius: 10px !important;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1) !important;
    height: 100% !important;

}

.edit-icon {
    position: relative;
    top: -110px;
    right: -45px;
    background-color: white;
    border-radius: 100px;
}
</style>