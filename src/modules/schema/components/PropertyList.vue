<template>
  <div class="app-card">
    <div class="d-flex justify-content-between align-items-center p-3 border-bottom">
      <div class="d-flex gap-2">
        <button class="btn btn-primary d-flex align-items-center" @click="$emit('add')">
          <i class="bi bi-plus me-2"></i>
          Add Property
        </button>
        <button class="btn btn-outline-primary d-flex align-items-center" @click="$emit('refresh')">
          <i class="bi bi-arrow-clockwise me-2"></i>
          Refresh Schema
        </button>
      </div>
    </div>

    <div class="table-responsive position-relative">
      <table class="table mb-0">
        <thead>
          <tr>
            <th style="width: 80px">Order</th>
            <th>Name</th>
            <th>Type</th>
            <th>Required</th>
            <th>Multi-valued</th>
            <th style="width: 40px"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="property in properties" :key="property.order">
            <td class="text-muted">{{ property.order }}</td>
            <td>{{ property.name }}</td>
            <td>{{ property.type }}</td>
            <td>
              <span v-if="property.required" class="badge bg-success-subtle text-success">Required</span>
            </td>
            <td>
              <span v-if="property.multiValued" class="badge bg-info-subtle text-info">Multi-valued</span>
            </td>
            <td>
              <div class="dropdown position-static">
                <button class="btn btn-link btn-sm p-0" @click="openMenu(property)">
                  <i class="bi bi-three-dots-vertical"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-end" :class="{ show: activeMenu === property }">
                  <button class="dropdown-item" @click="$emit('edit', property)">
                    <i class="bi bi-pencil me-2"></i>
                    Edit
                  </button>
                  <button class="dropdown-item text-danger" @click="$emit('delete', property)">
                    <i class="bi bi-trash me-2"></i>
                    Delete
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Property } from '../types';

defineProps<{
  properties: Property[];
}>();

defineEmits<{
  (e: 'add'): void;
  (e: 'edit', property: Property): void;
  (e: 'delete', property: Property): void;
  (e: 'refresh'): void;
}>();

const activeMenu = ref<Property | null>(null);

const openMenu = (property: Property) => {
  activeMenu.value = activeMenu.value === property ? null : property;
};
</script>

<style scoped>
.dropdown {
  position: relative;
}

.dropdown-menu {
  position: fixed;
  transform: none;
  top: auto;
  left: auto;
  margin-top: 0;
}
</style>