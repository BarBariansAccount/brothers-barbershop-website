/* eslint-disable */
// layouts
import DefaultLayout from "@/layouts/default.vue"
import PanelLayout from '@/layouts/panel.vue'
// components
import HomePage from "../home/HomePage.vue";
import AdminPage from "../admin/AdminPage.vue";
import GalleryPage from "../gallery/GalleryPage.vue";
import AppointmentPage from "../appointment/AppointmentPage.vue";
import BarbersManagementPage from "../admin/BarbersManagementPage.vue";
// panell components
import PanelHome from '@/pages/panel/home/HomePage.vue'
import CommonPage from "../pages/panel/profile/ProfileForm.vue";
import OrdersList from "../pages/panel/profile/OrdersList.vue";
import Appointment from "../pages/panel/profile/AppointmentsList.vue"
import Availabilities from "../pages/panel/profile/AvailabilitiesList.vue"
import ChangePassword from "../pages/panel/profile/ChangePassword"
export default [
  // pages under default layout
  {
    path: "/", component: DefaultLayout, children: [
      { path: "", component: HomePage },
      { path: "/barbersManagement", component: BarbersManagementPage },
      { path: "/admin", component: AdminPage },
      { path: "/gallery", component: GalleryPage },
      { path: "/appointment", component: AppointmentPage },
    ]
  },
  // pages under panel layout
  {
    path: "/panel", component: PanelLayout, children: [
      { path: "", component: PanelHome },

      { path: "profile/common", component: CommonPage },
      { path: "profile/change-password", component: ChangePassword },

      { path: "orders", component: OrdersList },
      { path: "appointments", component: Appointment },
      { path: "availabilities", component: Availabilities },
    ]
  },



];

