import HomePage from "../home/HomePage.vue";
import ProfilePage from "../profile/ProfilePage.vue";
import AdminPage from "../admin/AdminPage.vue";
import GalleryPage from "../gallery/GalleryPage.vue";
import AppointmentPage from "../appointment/AppointmentPage.vue";
import BarbersManagementPage from "../admin/BarbersManagementPage.vue"

export default [
  { path: "/", component: HomePage },
  { path: "/profile", component: ProfilePage },
  { path: "/admin", component: AdminPage,  },
  { path: "/BarbersManagement", component: BarbersManagementPage},
  { path: "/gallery", component: GalleryPage },
  { path: "/appointment", component: AppointmentPage },
];
