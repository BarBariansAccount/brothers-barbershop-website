<template>
  <div>
    <!-- Slideshow section -->
    <SlideshowSection :status="status" :nextAvailability="nextAvailability" />
    <!-- About Brothers' Barbershop section -->
    <AboutSection />
    <!-- Services section -->
    <ServicesSection />
    <!-- Pricing and Working Hours section -->
    <PricingAndHoursSection />
    <!-- Faq section -->
    <FaqSection />
    <!-- Review section -->
    <ReviewSection />
  </div>
</template>

<script>
import BarbershopStatusService from "@/services/barbershopStatus";
import ReviewSection from "@/components/Pages/Home/Review/ReviewSec.vue";
import FaqSection from "@/components/Pages/Home/Faq/FaqSec.vue";
import SlideshowSection from "@/components/Pages/Home/Slideshow/SlideshowSec.vue";
import AboutSection from "@/components/Pages/Home/About/AboutSec.vue";
import ServicesSection from "@/components/Pages/Home/Services/ServicesSec.vue";
import PricingAndHoursSection from "@/components/Pages/Home/PricingAndHours/PricingAndHoursSec.vue";
export default {
  name: "HomePage",
  components: {
    ReviewSection,
    FaqSection,
    SlideshowSection,
    AboutSection,
    ServicesSection,
    PricingAndHoursSection,
  },
  data: () => ({
    status: "",
    nextAvailability: "3:00pm",
  }),
  methods: {
    async getStatus() {
      const response = await BarbershopStatusService.getStatus();
      this.status = response.data;
    },
  },
  mounted() {
    this.getStatus();
  },
};
</script>

<style></style>
