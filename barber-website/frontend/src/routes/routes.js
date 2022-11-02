/* eslint-disable */
import HomePage from "../home/HomePage.vue";
import ProfilePage from "../pages/profile/MainPage.vue";
import AdminPage from "../admin/AdminPage.vue";
import GalleryPage from "../gallery/GalleryPage.vue";
import AppointmentPage from "../appointment/AppointmentPage.vue";
import BarbersManagementPage from "../admin/BarbersManagementPage.vue";
import ProfileForm from "../pages/profile/subs/ProfileForm.vue";
import OrdersList from "../pages/profile/subs/OrdersList.vue";
import Appointment from "../pages/profile/subs/AppointmentsList.vue"
import Availabilities from "../pages/profile/subs/AvailabilitiesList.vue"
import ChangePassword from "../pages/profile/subs/ChangePassword"
import DefaultLayout from "@/layouts/default.vue"
import PanelLayout from '@/layouts/panel.vue'
import PanelHome from '@/pages/home/HomePage.vue'
export default [
  // pages under default layout
  {
    path: "/", component: DefaultLayout, children: [
      { path: "", component: HomePage },
    ]
  },
  // pages under panel layout
  {
    path: "/panel", component: PanelLayout, children: [
      { path: "dashboard", component: PanelHome },
      {
        path: "/profile", component: ProfilePage, children: [
          { path: "", component: ProfileForm },
          { path: "orders", component: OrdersList },
          { path: "appointments", component: Appointment },
          { path: "availabilities", component: Availabilities },
          { path: "changepassword", component: ChangePassword },
        ]
      },
    ]
  },

  { path: "/barbersManagement", component: BarbersManagementPage },
  { path: "/admin", component: AdminPage },
  { path: "/gallery", component: GalleryPage },
  { path: "/appointment", component: AppointmentPage },

];

