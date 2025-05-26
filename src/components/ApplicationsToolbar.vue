<template>
  <div class="row g-3 mb-4">
    <div class="col-12 col-md-auto">
      <div class="d-flex gap-2">
        <button class="btn btn-primary d-flex align-items-center">
          <i class="bi bi-grid me-2"></i>
          Browse App Catalog
        </button>
        <button class="btn btn-outline-primary d-flex align-items-center">
          <i class="bi bi-plus me-2"></i>
          Custom Application
        </button>
      </div>
    </div>
    <div class="col-12 col-md ms-auto">
      <div class="position-relative">
        <i class="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3" style="z-index: 3;"></i>
        <input 
          type="text" 
          class="form-control ps-5" 
          placeholder="Search" 
          v-model="searchQuery"
          @input="onSearch"
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const searchQuery = ref('');
const emit = defineEmits(['search']);

const onSearch = () => {
  emit('search', searchQuery.value);
};
</script>