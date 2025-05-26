<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <button class="btn btn-primary d-flex align-items-center">
        <i class="bi bi-plus me-2"></i>
        New Entitlement
      </button>
      <div class="col-4">
        <div class="position-relative">
          <i class="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3" style="z-index: 3;"></i>
          <input 
            type="text" 
            class="form-control ps-5" 
            placeholder="Search" 
            v-model="searchQuery"
          >
        </div>
      </div>
    </div>

    <div class="app-card">
      <div class="table-responsive">
        <table class="table table-hover mb-0">
          <thead>
            <tr>
              <th scope="col">Application</th>
              <th scope="col">Display Name</th>
              <th scope="col">Object Type</th>
              <th scope="col">Account Attribute</th>
              <th scope="col">Owner</th>
              <th scope="col" style="width: 40px"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="entitlement in entitlements" :key="entitlement.id">
              <td>
                <div class="d-flex align-items-center">
                  <div class="microsoft-logo-container me-2">
                    <microsoft-logo />
                  </div>
                  <div>
                    <div>{{ entitlement.name }}</div>
                    <div class="text-muted small">{{ entitlement.provider }}</div>
                  </div>
                </div>
              </td>
              <td>{{ entitlement.displayName }}</td>
              <td>{{ entitlement.objectType }}</td>
              <td>{{ entitlement.accountAttribute }}</td>
              <td>
                <div v-if="entitlement.owner">
                  <div>{{ entitlement.owner.name }}</div>
                  <div class="text-muted small">{{ entitlement.owner.email }}</div>
                </div>
                <div v-else>--</div>
              </td>
              <td>
                <div class="dropdown">
                  <button class="btn btn-link btn-sm p-0" @click="toggleMenu(entitlement.id)">
                    <i class="bi bi-three-dots"></i>
                  </button>
                  <div class="dropdown-menu dropdown-menu-end" :class="{ show: activeMenu === entitlement.id }">
                    <button class="dropdown-item">
                      <i class="bi bi-pencil me-2"></i>
                      Edit
                    </button>
                    <button class="dropdown-item text-danger">
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MicrosoftLogo from './MicrosoftLogo.vue';

interface Owner {
  name: string;
  email: string;
}

interface Entitlement {
  id: string;
  name: string;
  provider: string;
  displayName: string;
  objectType: string;
  accountAttribute: string;
  owner: Owner | null;
}

const searchQuery = ref('');
const activeMenu = ref<string | null>(null);

const entitlements = ref<Entitlement[]>([
  {
    id: '1',
    name: 'ULifeTarget',
    provider: 'Microsoft Entra',
    displayName: 'MyAccess Service Account Checkout',
    objectType: '_GROUP_',
    accountAttribute: 'memberOf',
    owner: {
      name: 'Hazel Carter',
      email: 'hazel.carter@ulifereports.onmicrosoft.com'
    }
  },
  {
    id: '2',
    name: 'ULifeTarget',
    provider: 'Microsoft Entra',
    displayName: 'MyAccess Bitbucket Admin',
    objectType: '_GROUP_',
    accountAttribute: 'memberOf',
    owner: {
      name: 'Carlos Vibanco',
      email: 'cvibanco@ulifereports.onmicrosoft.com'
    }
  },
  {
    id: '3',
    name: 'ULifeTarget',
    provider: 'Microsoft Entra',
    displayName: 'MyAccess Jenkins - Dev',
    objectType: '_GROUP_',
    accountAttribute: 'memberOf',
    owner: {
      name: 'Sanjay Rallapally',
      email: 'srallapa'
    }
  },
  {
    id: '4',
    name: 'ULifeTarget',
    provider: 'Microsoft Entra',
    displayName: 'MyAccess API Management',
    objectType: '_GROUP_',
    accountAttribute: 'memberOf',
    owner: null
  },
  {
    id: '5',
    name: 'ULifeTarget',
    provider: 'Microsoft Entra',
    displayName: 'MyAccess Jenkins - Cont',
    objectType: '_GROUP_',
    accountAttribute: 'memberOf',
    owner: null
  }
]);

const toggleMenu = (id: string) => {
  activeMenu.value = activeMenu.value === id ? null : id;
};
</script>

<style scoped>
.microsoft-logo-container {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dropdown-menu {
  min-width: 160px;
  padding: 0.5rem 0;
  margin: 0;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.375rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dropdown-item {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
}

.dropdown-item:hover {
  background-color: #f8f9fa;
}

.dropdown-item.text-danger:hover {
  background-color: #fff5f5;
}
</style>