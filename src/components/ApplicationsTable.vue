<template>
  <div class="app-card">
    <div class="table-responsive">
      <table class="table table-hover mb-0">
        <thead>
          <tr>
            <th scope="col" class="ps-4 py-3">
              <div class="d-flex align-items-center cursor-pointer" @click="sortByName">
                Name
                <i class="bi bi-chevron-down ms-1"></i>
              </div>
            </th>
            <th scope="col" class="py-3">Status</th>
            <th scope="col" class="py-3 text-end pe-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="app in applicationsToShow" :key="app.id">
            <td class="ps-4 py-3">
              <div class="d-flex align-items-center">
                <div v-if="app.publisher === 'Microsoft Entra'" class="me-3">
                  <microsoft-logo />
                </div>
                <div v-else class="app-icon me-3">
                  <i class="bi bi-grid-3x3-gap-fill"></i>
                </div>
                <div>
                  <div class="app-name">{{ app.name }}</div>
                  <div class="app-publisher">{{ app.publisher }}</div>
                </div>
              </div>
            </td>
            <td class="py-3">
              <span class="app-status" :class="getStatusClass(app.status)">
                {{ app.status }}
              </span>
            </td>
            <td class="text-end pe-3 py-3">
              <div class="dropdown">
                <button class="actions-button" @click="toggleDropdown(app.id)">
                  <i class="bi bi-three-dots"></i>
                </button>
                <div class="dropdown-menu" :class="{ show: activeDropdown === app.id }">
                  <router-link :to="`/applications/${app.id}/details`" class="dropdown-item" @click="activeDropdown = null">
                    <i class="bi bi-pencil me-2"></i>
                    Edit
                  </router-link>
                  <button class="dropdown-item text-danger" @click="deleteApp(app)">
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
    <div class="d-flex justify-content-between align-items-center p-3 border-top">
      <div class="pagination-info">
        {{ paginationInfo }}
      </div>
      <div class="d-flex align-items-center">
        <button 
          class="pagination-arrow" 
          :disabled="currentPage === 1"
          @click="prevPage"
        >
          <i class="bi bi-chevron-left"></i>
        </button>
        <button 
          class="pagination-arrow" 
          :disabled="currentPage === totalPages"
          @click="nextPage"
        >
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import MicrosoftLogo from './MicrosoftLogo.vue';

interface Application {
  id: number;
  name: string;
  publisher: string;
  status: string;
}

const props = defineProps<{
  applications?: Application[];
}>();

const router = useRouter();
const applicationsToShow = computed(() => props.applications || defaultApplications);
const activeDropdown = ref<number | null>(null);

const itemsPerPage = 10;
const currentPage = ref(1);
const totalItems = computed(() => applicationsToShow.value.length);
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage));

const paginationInfo = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage + 1;
  const end = Math.min(start + itemsPerPage - 1, totalItems.value);
  return `${start}-${end} of ${totalItems.value}`;
});

const getStatusClass = (status: string) => {
  if (status === 'Active') return 'app-status-active';
  return '';
};

const sortByName = () => {
  applicationsToShow.value.sort((a, b) => a.name.localeCompare(b.name));
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const toggleDropdown = (appId: number) => {
  activeDropdown.value = activeDropdown.value === appId ? null : appId;
};

const deleteApp = (app: Application) => {
  console.log('Delete app:', app.name);
  activeDropdown.value = null;
};

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  if (activeDropdown.value !== null && !(event.target as Element).closest('.dropdown')) {
    activeDropdown.value = null;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const defaultApplications = [
  { id: 1, name: 'M365Auth', publisher: 'Microsoft Entra', status: 'Active' },
  { id: 2, name: 'ULifeAuth', publisher: 'Microsoft Entra', status: 'Active' },
  { id: 3, name: 'ULifeTarget', publisher: 'Microsoft Entra', status: 'Active' },
];
</script>

<style scoped>
.app-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--bs-primary);
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  z-index: 1000;
  display: none;
  min-width: 160px;
  padding: 0.5rem 0;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dropdown-menu.show {
  display: block;
}

.dropdown-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  text-align: left;
  font-size: 0.875rem;
  color: var(--bs-body-color);
  cursor: pointer;
  text-decoration: none;
}

.dropdown-item:hover {
  background-color: #f8f9fa;
}

.dropdown-item.text-danger {
  color: #dc3545;
}

.dropdown-item.text-danger:hover {
  background-color: #fff5f5;
}
</style>