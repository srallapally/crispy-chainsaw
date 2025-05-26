<template>
  <div class="schema-container d-flex">
    <!-- Left sidebar with vertical tabs -->
    <div class="schema-sidebar">
      <div class="schema-type-selector mb-4">
        <div class="d-flex align-items-center">
          <div class="schema-icon">
            <i class="bi bi-grid-3x3"></i>
          </div>
          <div class="dropdown">
            <button 
              class="btn dropdown-toggle schema-type-button" 
              type="button" 
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span>{{ selectedSchemaType }}</span>
              <i class="bi bi-chevron-down ms-2"></i>
            </button>
            <ul class="dropdown-menu">
              <li v-for="type in schemaTypes" :key="type">
                <a 
                  class="dropdown-item" 
                  :class="{ active: type === selectedSchemaType }"
                  href="#"
                  @click.prevent="selectedSchemaType = type"
                >
                  {{ type }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="nav flex-column nav-pills">
        <a 
          v-for="tab in tabs" 
          :key="tab.id"
          class="nav-link" 
          :class="{ active: activeTab === tab.id }" 
          @click.prevent="activeTab = tab.id" 
          href="#"
        >
          {{ tab.label }}
        </a>
      </div>
    </div>

    <!-- Main content area -->
    <div class="schema-content flex-grow-1">
      <SchemaDetails
        v-if="activeTab === 'details'"
        :initial-details="schemaDetails"
        @save="saveSchemaDetails"
      />

      <template v-if="activeTab === 'properties'">
        <PropertyList
          :properties="properties"
          @add="showPropertyForm = true"
          @edit="editProperty"
          @delete="deleteProperty"
          @refresh="refreshSchema"
        />
        
        <PropertyForm
          v-if="showPropertyForm"
          :property="editingProperty"
          @save="saveProperty"
          @close="closePropertyForm"
        />
      </template>

      <RulesView v-if="activeTab === 'rules'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useSchema } from '../modules/schema';
import { SchemaDetails, PropertyList, PropertyForm } from '../modules/schema';
import RulesView from '../modules/schema/components/RulesView.vue';
import type { Property, SchemaDetails as SchemaDetailsType } from '../modules/schema';

const {
  schemaTypes,
  selectedSchemaType,
  tabs,
  activeTab,
  schemaDetails,
  properties
} = useSchema();

const showPropertyForm = ref(false);
const editingProperty = ref<Property | undefined>();

const editProperty = (property: Property) => {
  editingProperty.value = property;
  showPropertyForm.value = true;
};

const deleteProperty = (property: Property) => {
  properties.value = properties.value.filter(p => p.order !== property.order);
};

const closePropertyForm = () => {
  showPropertyForm.value = false;
  editingProperty.value = undefined;
};

const saveProperty = (property: Property) => {
  if (editingProperty.value) {
    const index = properties.value.findIndex(p => p.order === editingProperty.value?.order);
    if (index !== -1) {
      properties.value[index] = property;
    }
  } else {
    property.order = properties.value.length + 1;
    properties.value.push(property);
  }
  closePropertyForm();
};

const saveSchemaDetails = (details: SchemaDetailsType) => {
  Object.assign(schemaDetails.value, details);
};

const refreshSchema = () => {
  console.log('Refreshing schema...');
};
</script>

<style scoped>
.schema-container {
  gap: 2rem;
}

.schema-sidebar {
  width: 240px;
  flex-shrink: 0;
}

.schema-content {
  flex-grow: 1;
}

.schema-type-selector {
  padding: 1rem;
  background: white;
  border-radius: 0.375rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.schema-icon {
  width: 32px;
  height: 32px;
  background: #6366f1;
  color: white;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.75rem;
}

.schema-type-button {
  background: none;
  border: none;
  color: #111827;
  font-weight: 500;
  padding: 0;
}

.schema-type-button:hover,
.schema-type-button:focus {
  background: none;
  border: none;
  color: #111827;
}

.nav-pills .nav-link {
  color: #4b5563;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  margin-bottom: 0.25rem;
}

.nav-pills .nav-link:hover {
  background-color: #f3f4f6;
}

.nav-pills .nav-link.active {
  background-color: #eef2ff;
  color: #4f46e5;
}
</style>