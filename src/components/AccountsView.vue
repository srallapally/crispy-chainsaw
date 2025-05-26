<template>
  <div class="app-card">
    <div class="table-responsive">
      <table class="table table-hover mb-0">
        <thead>
          <tr>
            <th scope="col" class="ps-4" style="width: 40px">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" v-model="selectAll" @change="toggleSelectAll">
              </div>
            </th>
            <th scope="col">
              <div class="d-flex align-items-center cursor-pointer" @click="sortByUser">
                User
                <i class="bi bi-chevron-down ms-1"></i>
              </div>
            </th>
            <th scope="col">Account</th>
            <th scope="col">Account Type</th>
            <th scope="col" style="width: 40px"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="account in accounts" :key="account.id">
            <td class="ps-4">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" v-model="account.selected">
              </div>
            </td>
            <td>
              <div>{{ account.userName }}</div>
              <div class="text-muted small">{{ account.userId }}</div>
            </td>
            <td>
              <div>{{ account.account }}</div>
              <div class="text-muted small">{{ account.accountId }}</div>
            </td>
            <td>{{ account.accountType }}</td>
            <td>
              <div class="dropdown">
                <button class="btn btn-link btn-sm p-0" @click="toggleMenu(account.id)">
                  <i class="bi bi-three-dots"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-end" :class="{ show: activeMenu === account.id }">
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
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Account {
  id: string;
  userName: string | null;
  userId: string | null;
  account: string;
  accountId: string;
  accountType: string;
  selected?: boolean;
}

const accounts = ref<Account[]>([
  {
    id: '1',
    userName: 'Carl Smith',
    userId: 'carl.smith',
    account: 'carl.smith',
    accountId: '2c0ce2fd-201e-4175-98d8-cec267c54113',
    accountType: 'Employee'
  },
  {
    id: '2',
    userName: 'Carl Smith',
    userId: 'carl.smith',
    account: 'carlsmith45',
    accountId: '0d382ef7-3325-49c9-a2b5-2ff0f21f4e2a',
    accountType: 'Customer'
  },
  {
    id: '3',
    userName: 'Eloise Ballard',
    userId: 'eloise.ballard',
    account: 'eloise.ballard',
    accountId: '3bf46f02-71e5-427c-8264-8ed767cf3294',
    accountType: 'Employee'
  },
  {
    id: '4',
    userName: null,
    userId: null,
    account: 'unassigned1',
    accountId: '4bf46f02-71e5-427c-8264-8ed767cf3295',
    accountType: 'Employee'
  },
  {
    id: '5',
    userName: null,
    userId: null,
    account: 'unassigned2',
    accountId: '5bf46f02-71e5-427c-8264-8ed767cf3296',
    accountType: 'Customer'
  },
  {
    id: '6',
    userName: null,
    userId: null,
    account: 'unassigned3',
    accountId: '6bf46f02-71e5-427c-8264-8ed767cf3297',
    accountType: 'Employee'
  }
]);

const selectAll = ref(false);
const activeMenu = ref<string | null>(null);

const toggleSelectAll = () => {
  accounts.value.forEach(account => {
    account.selected = selectAll.value;
  });
};

const sortByUser = () => {
  accounts.value.sort((a, b) => {
    if (!a.userName && !b.userName) return 0;
    if (!a.userName) return 1;
    if (!b.userName) return -1;
    return a.userName.localeCompare(b.userName);
  });
};

const toggleMenu = (id: string) => {
  activeMenu.value = activeMenu.value === id ? null : id;
};
</script>

<style scoped>
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