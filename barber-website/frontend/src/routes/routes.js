/* eslint-disable */
// layouts
import DefaultLayout from "@/layouts/default.vue"
import PanelLayout from '@/layouts/panel.vue'
// components
import HomePage from "../home/HomePage.vue";
import AdminPage from "../admin/AdminPage.vue";
import GalleryPage from "../gallery/GalleryPage.vue";
import AppointmentPage from "../pages/appointment/AppointmentPage.vue";
import AppointmentDetail from "../pages/appointment/AppointmentDetail.vue";
import BarbersManagementPage from "../admin/BarbersManagementPage.vue";
// panell components
import PanelHome from '@/pages/panel/home/HomePage.vue'
import CommonPage from "../pages/panel/profile/ProfileForm.vue";
import OrdersList from "../pages/panel/profile/OrdersList.vue";
import Appointment from "../pages/panel/profile/AppointmentsList.vue"
import Availabilities from "../pages/panel/profile/AvailabilitiesList.vue"
import ChangePassword from "../pages/panel/profile/ChangePassword"
import DeleteAccount from "../pages/panel/profile/DeleteAccount"
// Product Page Component
import ProductPage from "../components/ProductComponents/ProductPage.vue"
// import 
import BarberPage from '../pages/panel/barber/barber-page.vue'

export default [
  // pages under default layout
  {
    name: 'HomeRoute',
    path: "/", component: DefaultLayout, children: [
      { name: 'Home', path: "", component: HomePage },
      { name: 'BarbersManagement', path: "/barbersManagement", component: BarbersManagementPage },
      
      { name: 'Gallery', path: "/gallery", component: GalleryPage },
      { name: 'Appointment', path: "/appointment", component: AppointmentPage },
      { name: 'AppointmentDetail', path: "/appointment/:token", component: AppointmentDetail },
      {name: 'ProductsPage', path:"/products", component: ProductPage},
    ]
  },
  // pages under panel layout
  {
    path: "/panel", component: PanelLayout, children: [
      { path: "", component: PanelHome },
      { path: "admin", component: AdminPage },
      { path: "barber", component: BarberPage },
      { path: "profile/edit_profile", component: CommonPage },
      { path: "profile/change-password", component: ChangePassword },
      { path: "profile/unsubscribe", component: DeleteAccount },

      { path: "orders", component: OrdersList },
      { path: "appointments", component: Appointment },
      { path: "availabilities", component: Availabilities },
    ]
  },



];

