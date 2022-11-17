<template>
  <div>
    <FaqCard :isAdminEditableComponent="true" />
  </div>
</template>
<script>
import FaqCard from "./Pages/Home/Faq/FaqCard.vue";

export default {
  components: { FaqCard },
  data: () => ({}),

  methods: {},
};
</script>
<style>
.container {
  padding: 20px;
}

.card {
  margin-bottom: 20px;
}

.card-header-title-input {
  font-size: inherit;
  font-weight: inherit;
  width: 50%;
  display: block;
}

.card-header-title--editable {
  outline: none;
}
</style>
