<template>
    <aside>
        <div class="menu-wrap">
            <!-- profile -->
            <div class=" ">
                <div class="icon text-center pt-4" @click="dialog = true">
                    <v-avatar v-if="picturelink" size="120">
                        <img :src="picturelink">
                    </v-avatar>
                    <v-icon v-else size="140"> mdi-account-circle-outline </v-icon>
                </div>
                <div class="text-center">

                    {{ firstname + " " + lastname }}

                </div>
            </div>
            <!-- list -->
            <v-list>
                <template v-for="item in items">
                    <v-list-group :key="item.title" v-if="item.items && item.items.length > 0" v-model="item.active"
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
                    <v-list-item v-else :key="'x' + item.title" exact :to="item.to">
                        <v-list-item-icon>
                            <v-icon v-text="item.action"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.title"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>
            <!-- Picture upload dialoge -->
            <v-dialog v-model="dialog" width="500px">
                <v-card class="py-2">
                    <div class="icon text-center pt-4">
                        <v-avatar v-if="picturelink" size="120">
                            <img :src="picturelink">
                        </v-avatar>
                        <v-icon v-else size="140"> mdi-account-circle-outline </v-icon>
                    </div>
                    <v-btn ref="image" class="mt-3" block text @click="onEdit">
                        <v-icon left color="blue">
                            mdi-pencil
                        </v-icon>
                        Upload Photo
                    </v-btn>
                    <v-divider></v-divider>
                    <v-btn @click="deletePic" block text>
                        <v-icon left color="red">
                            mdi-delete
                        </v-icon>
                        Delete Current Photo
                    </v-btn>

                    <v-divider></v-divider>
                    <v-btn block text @click="dialog = false">
                        <v-icon left>
                            mdi-close
                        </v-icon>
                        Cancel
                    </v-btn>
                    <v-file-input size="sm" v-show="false" v-model="file" ref="image" truncate-length="15"
                        @change="uploadPic">
                    </v-file-input>

                </v-card>

            </v-dialog>
        </div>
    </aside>
</template>
<script>
import userService from '@/services/user'
import Swal from "sweetalert2";
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
                { title: 'Edit Profile', to: '/panel/profile/edit_profile' },
                    { title: 'Change Password', to: '/panel/profile/change-password' },
                    { title: 'Unsubscribe', to: '/panel/profile/unsubscribe' },
                ],
                title: 'Profile',
            }
        ],
        file: null,
        dialog: false
    }),
    computed: {
        firstname() {
            return this.$store.state.user?.firstname
        },
        lastname() {
            return this.$store.state.user?.lastname
        },
        picturelink() {
            return this.$store.state.user?.picturelink
        },
    },
    methods: {
        async uploadPic() {
            const fd = new FormData()
            fd.append('UserImage', this.file)
            try {
                await userService.updatePic(fd)
                this.get()
            } catch (err) { console.log(err) }
            this.file = null
        },
        async deletePic() {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(async (result) => {
                if (result.isConfirmed) {

                    try {
                        await userService.deletePic()
                        this.get()
                    } catch (err) { console.log(err) }
                }
            })
        },
        async get() {
            try {
                const res = await userService.getUser();
                this.$store.commit("setUser", res.data[0]);

            } catch (error) {
                console.log("erro", error);
            }
        },
        onEdit() {
            this.$refs.image.$refs.input.click()
        }
    },
    watch: {
        file(newVal) {
            if (newVal) {
                this.uploadPic()
            }
        }
    }

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

.edit-icon2 {
    position: relative;
    top: -84px;
    right: -33px;
    background-color: white;
    border-radius: 100px;
}
</style>