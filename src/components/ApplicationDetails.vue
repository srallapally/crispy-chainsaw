<template>
  <div class="container py-4">
    <div class="d-flex align-items-center mb-4">
      <div class="d-flex align-items-center">
        <router-link to="/" class="btn btn-link text-secondary p-0 me-3">
          <i class="bi bi-arrow-left fs-4"></i>
        </router-link>
        <div class="app-icon me-3">
          <i class="bi bi-grid-3x3-gap-fill"></i>
        </div>
        <div>
          <h1 class="page-title mb-1">{{ appName }}</h1>
          <div class="text-muted">v3.3</div>
        </div>
      </div>
    </div>

    <ul class="nav nav-tabs mb-4">
      <li class="nav-item">
        <router-link 
          class="nav-link" 
          :to="isNew ? '' : `/applications/${id}/details`"
          active-class="active"
        >
          Details
        </router-link>
      </li>
      <li class="nav-item" v-if="!isNew">
        <router-link 
          class="nav-link" 
          :to="`/applications/${id}/schema`"
          active-class="active"
        >
          Schema
        </router-link>
      </li>
      <li class="nav-item" v-if="!isNew">
        <router-link 
          class="nav-link" 
          :to="`/applications/${id}/accounts`"
          active-class="active"
        >
          Accounts
        </router-link>
      </li>
      <li class="nav-item" v-if="!isNew">
        <router-link 
          class="nav-link" 
          :to="`/applications/${id}/entitlements`"
          active-class="active"
        >
          Entitlements
        </router-link>
      </li>
    </ul>

    <router-view></router-view>
    
    <div v-if="isNew" class="app-card p-4">
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = computed(() => route.params.id as string);
const isNew = computed(() => !id.value);

const name = ref('');
const description = ref('');
const logoUri = ref('');
const privileged = ref('');
const requestable = ref(false);
const riskLevel = ref('');

// Mock data for existing applications
const applications = {
  '1': { name: 'M365Auth' },
  '2': { name: 'ULifeAuth' },
  '3': { name: 'ULifeTarget' },
  '4': { name: 'Custom App 1' },
  '5': { name: 'Custom App 2' },
  '6': { name: 'Legacy App' }
};

const appName = computed(() => {
  if (isNew.value) {
    return 'New Application';
  }
  return applications[id.value as keyof typeof applications]?.name || 'Unknown Application';
});

const removeOwner = (id: string) => {
  console.log('Remove owner:', id);
};
</script>

<style scoped>
.app-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--bs-primary);
  font-size: 24px;
  background: #f0f0f0;
  border-radius: 4px;
}

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