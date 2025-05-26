<template>
  <div class="container py-4">
    <page-header
      title="Applications"
      subtitle="Set up your applications to use authentication."
    />
    <ul class="nav nav-tabs mb-4">
      <li class="nav-item">
        <a 
          class="nav-link" 
          :class="{ active: activeTab === 'managed' }"
          @click.prevent="activeTab = 'managed'"
          href="#"
        >
          Managed Apps
        </a>
      </li>
      <li class="nav-item">
        <a 
          class="nav-link" 
          :class="{ active: activeTab === 'unmanaged' }"
          @click.prevent="activeTab = 'unmanaged'"
          href="#"
        >
          Unmanaged Apps
        </a>
      </li>
    </ul>
    <div v-if="activeTab === 'managed'">
      <applications-toolbar @search="handleSearch" />
      <applications-table :applications="managedApplications" />
    </div>
    <div v-else>
      <div class="d-flex justify-content-between align-items-center mb-4">
        <router-link to="/applications/new" class="btn btn-primary d-flex align-items-center">
          <i class="bi bi-plus me-2"></i>
          New Application
        </router-link>
        <div class="col-4">
          <div class="position-relative">
            <i class="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3" style="z-index: 3;"></i>
            <input 
              type="text" 
              class="form-control ps-5" 
              placeholder="Search" 
              v-model="unmanagedSearchQuery"
              @input="handleUnmanagedSearch"
            >
          </div>
        </div>
      </div>
      <applications-table :applications="unmanagedApplications" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PageHeader from './PageHeader.vue';
import ApplicationsToolbar from './ApplicationsToolbar.vue';
import ApplicationsTable from './ApplicationsTable.vue';

const activeTab = ref('managed');
const unmanagedSearchQuery = ref('');

const managedApplications = ref([
  { id: 1, name: 'M365Auth', publisher: 'Microsoft Entra', status: 'Active' },
  { id: 2, name: 'ULifeAuth', publisher: 'Microsoft Entra', status: 'Active' },
  { id: 3, name: 'ULifeTarget', publisher: 'Microsoft Entra', status: 'Active' },
]);

const unmanagedApplications = ref([
  { id: 4, name: 'Custom App 1', publisher: 'Internal', status: 'Active' },
  { id: 5, name: 'Custom App 2', publisher: 'Internal', status: 'Active' },
  { id: 6, name: 'Legacy App', publisher: 'Internal', status: 'Active' },
]);

const handleSearch = (query: string) => {
  console.log('Search query:', query);
};

const handleUnmanagedSearch = () => {
  console.log('Unmanaged search query:', unmanagedSearchQuery.value);
};
</script>