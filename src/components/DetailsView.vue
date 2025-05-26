<template>
  <div class="app-card p-4">
    <div class="mb-4">
      <label class="form-label">Name</label>
      <input type="text" class="form-control" v-model="name">
      <div class="form-text">Human-readable name for your application. You can change the name later in the application settings.</div>
    </div>

    <div class="mb-4">
      <label class="form-label">Description</label>
      <input type="text" class="form-control" v-model="description">
    </div>

    <div class="mb-4">
      <label class="form-label">Owners</label>
      <div class="form-control owners-input">
        <div class="owner-tag">
          Sanjay Rallapally
          <span class="owner-id">srallapa</span>
          <button class="remove-owner" @click="removeOwner('srallapa')">×</button>
        </div>
        <div class="owner-tag">
          Anh Kobayashi
          <span class="owner-id">anh.kobayashi@ulifereports.onmicrosoft.com</span>
          <button class="remove-owner" @click="removeOwner('anh.kobayashi@ulifereports.onmicrosoft.com')">×</button>
        </div>
        <div class="dropdown-arrow">
          <i class="bi bi-chevron-down"></i>
        </div>
      </div>
      <div class="form-text">Application Owners</div>
    </div>

    <div class="mb-4">
      <label class="form-label">App Logo URI</label>
      <input type="text" class="form-control" v-model="logoUri">
      <div class="form-text">Application logo URI for use in user-facing UIs such as consent pages and application pages.</div>
    </div>

    <div class="mb-4">
      <label class="form-label">Privileged</label>
      <input type="text" class="form-control" v-model="privileged">
    </div>

    <div class="mb-4">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" v-model="requestable">
        <label class="form-check-label">Requestable</label>
      </div>
    </div>

    <div class="mb-4">
      <label class="form-label">Risk Level</label>
      <input type="text" class="form-control" v-model="riskLevel">
    </div>

    <div class="text-end">
      <button class="btn btn-primary">Save</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const name = ref('');
const description = ref('');
const logoUri = ref('');
const privileged = ref('');
const requestable = ref(false);
const riskLevel = ref('');

const removeOwner = (id: string) => {
  console.log('Remove owner:', id);
};
</script>

<style scoped>
.owners-input {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  min-height: 38px;
  padding: 4px 8px;
  position: relative;
}

.owner-tag {
  display: inline-flex;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 2px;
  padding: 2px 8px;
  font-size: 14px;
  white-space: nowrap;
}

.owner-id {
  color: #666;
  margin-left: 8px;
  font-size: 13px;
}

.remove-owner {
  border: none;
  background: none;
  color: #666;
  padding: 0 0 0 8px;
  font-size: 16px;
  cursor: pointer;
  line-height: 1;
}

.remove-owner:hover {
  color: #333;
}

.dropdown-arrow {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}
</style>