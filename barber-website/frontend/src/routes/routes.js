/* eslint-disable */
import HomePage from "../home/HomePage.vue";
import ProfilePage from "../profile/MainPage.vue";
import AdminPage from "../admin/AdminPage.vue";
import GalleryPage from "../gallery/GalleryPage.vue";
import AppointmentPage from "../appointment/AppointmentPage.vue";
import BarbersManagementPage from "../admin/BarbersManagementPage.vue";
import ProfileForm from "../profile/subs/ProfileForm.vue";
import OrdersList from "../profile/subs/OrdersList.vue";
import Appointment from "../profile/subs/AppointmentsList.vue"
import Availabilities from "../profile/subs/AvailabilitiesList.vue"
import ChangePassword from "../profile/subs/ChangePassword"

export default [
  { path: "/", component: HomePage },
  {
    path: "/profile", component: ProfilePage, children: [
      { path: "", component: ProfileForm },
      { path: "orders", component: OrdersList },
      { path: "appointments", component: Appointment },
      { path: "availabilities", component: Availabilities },
      { path: "changepassword", component: ChangePassword },
    ]
  },
  { path: "/barbersManagement", component: BarbersManagementPage },
  { path: "/admin", component: AdminPage },
  { path: "/gallery", component: GalleryPage },
  { path: "/appointment", component: AppointmentPage },

];

