<template>
  <div class="app-card p-4 mb-4">
    <h5 class="mb-4">Account Correlation</h5>
    <div class="d-flex align-items-center gap-3">
      <div class="flex-grow-1">
        <select class="form-select" v-model="accountCorrelation.identityAttribute">
          <option v-for="attr in identityAttributes" :key="attr.value" :value="attr.value">
            {{ attr.label }}
          </option>
        </select>
      </div>
      <div class="text-center">Equals</div>
      <div class="flex-grow-1">
        <select class="form-select" v-model="accountCorrelation.accountAttribute">
          <option v-for="attr in accountAttributes" :key="attr.value" :value="attr.value">
            {{ attr.label }}
          </option>
        </select>
      </div>
    </div>
  </div>

  <div class="app-card p-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h5 class="mb-0">Account Types</h5>
      <button class="btn btn-outline-primary btn-sm" @click="addAccountType">
        <i class="bi bi-plus me-2"></i>
        Add Type
      </button>
    </div>
    
    <div class="list-group">
      <div v-for="type in accountTypes" :key="type.id" class="list-group-item d-flex align-items-center">
        <input 
          type="text" 
          class="form-control" 
          v-model="type.name"
          :readonly="type.id === 'default'"
        >
        <button 
          v-if="type.id !== 'default'" 
          class="btn btn-link text-danger ms-3"
          @click="removeAccountType(type)"
        >
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSchema } from '../composables/useSchema';
import type { AccountType } from '../types';

const {
  accountTypes,
  accountCorrelation,
  identityAttributes,
  accountAttributes
} = useSchema();

const addAccountType = () => {
  accountTypes.value.push({
    id: crypto.randomUUID(),
    name: `Type ${accountTypes.value.length}`
  });
};

const removeAccountType = (type: AccountType) => {
  const index = accountTypes.value.findIndex(t => t.id === type.id);
  if (index !== -1) {
    accountTypes.value.splice(index, 1);
  }
};
</script>