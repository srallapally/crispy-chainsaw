<template>
  <div class="modal d-block" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ isEditing ? 'Edit Property' : 'Add Property' }}</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">Name</label>
            <input type="text" class="form-control" v-model="form.name">
          </div>
          <div class="mb-3">
            <label class="form-label">Type</label>
            <select class="form-select" v-model="form.type">
              <option value="string">String</option>
              <option value="number">Number</option>
              <option value="boolean">Boolean</option>
              <option value="date">Date</option>
              <option value="object">Object</option>
            </select>
          </div>
          
          <!-- Object Type Sub-attributes -->
          <div v-if="form.type === 'object'" class="mt-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h6 class="mb-0">Sub-attributes</h6>
              <button class="btn btn-outline-primary btn-sm" @click="addSubAttribute">
                <i class="bi bi-plus me-1"></i>
                Add Sub-attribute
              </button>
            </div>
            
            <div v-for="(subAttr, index) in form.subAttributes" :key="index" class="card mb-3">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-3">
                  <h6 class="card-subtitle text-muted">Sub-attribute {{ index + 1 }}</h6>
                  <button class="btn btn-link text-danger p-0" @click="removeSubAttribute(index)">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
                
                <div class="row g-3">
                  <div class="col-md-4">
                    <label class="form-label">Name</label>
                    <input type="text" class="form-control" v-model="subAttr.name">
                  </div>
                  <div class="col-md-4">
                    <label class="form-label">Display Name</label>
                    <input type="text" class="form-control" v-model="subAttr.displayName">
                  </div>
                  <div class="col-md-4">
                    <label class="form-label">Type</label>
                    <select class="form-select" v-model="subAttr.type">
                      <option value="string">String</option>
                      <option value="number">Number</option>
                      <option value="boolean">Boolean</option>
                      <option value="date">Date</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mb-3">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" v-model="form.required" id="requiredCheck">
              <label class="form-check-label" for="requiredCheck">Required</label>
            </div>
          </div>

          <div class="mb-3">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" v-model="form.multiValued" id="multiValuedCheck">
              <label class="form-check-label" for="multiValuedCheck">Multi-valued</label>
            </div>
          </div>

          <div class="mb-3">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" v-model="form.constrainValues" id="constrainValuesCheck">
              <label class="form-check-label" for="constrainValuesCheck">Constrain values for this property</label>
            </div>
          </div>

          <div v-if="form.constrainValues" class="ms-4 mt-3">
            <div class="mb-3">
              <div class="form-check">
                <input class="form-check-input" type="radio" v-model="form.valueConstraintType" value="enumerated" id="enumeratedValues">
                <label class="form-check-label" for="enumeratedValues">Enumerated Values</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" v-model="form.valueConstraintType" value="applicationObject" id="applicationObjectType">
                <label class="form-check-label" for="applicationObjectType">Application Object Type</label>
              </div>
            </div>

            <div v-if="form.valueConstraintType === 'applicationObject'" class="mb-3">
              <label class="form-label">Object Type</label>
              <select class="form-select" v-model="form.objectType">
                <option v-for="type in schemaTypes.filter(t => t !== 'Account')" :key="type" :value="type">
                  {{ type }}
                </option>
              </select>
              <div class="form-text">Object type from which to populate enumerated values for this property</div>

              <div class="form-check mt-3">
                <input class="form-check-input" type="checkbox" v-model="form.isEntitlement" id="entitlementCheck">
                <label class="form-check-label" for="entitlementCheck">Entitlement</label>
              </div>
              <div class="form-text">Specify this property as containing entitlements.</div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="$emit('close')">Cancel</button>
          <button type="button" class="btn btn-primary" @click="save">Save</button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-backdrop fade show"></div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import type { Property, SubAttribute, SchemaType } from '../types';

const props = defineProps<{
  property?: Property;
}>();

const emit = defineEmits<{
  (e: 'save', property: Property): void;
  (e: 'close'): void;
}>();

const isEditing = computed(() => !!props.property);

const schemaTypes: SchemaType[] = ['Account', 'Group', 'Permission'];

const form = reactive<Property>({
  name: props.property?.name ?? '',
  type: props.property?.type ?? 'string',
  required: props.property?.required ?? false,
  multiValued: props.property?.multiValued ?? false,
  order: props.property?.order ?? 0,
  subAttributes: props.property?.subAttributes ?? [],
  constrainValues: props.property?.constrainValues ?? false,
  valueConstraintType: props.property?.valueConstraintType ?? 'enumerated',
  objectType: props.property?.objectType ?? 'Group',
  isEntitlement: props.property?.isEntitlement ?? false
});

const addSubAttribute = () => {
  form.subAttributes = form.subAttributes || [];
  form.subAttributes.push({
    name: '',
    displayName: '',
    type: 'string'
  });
};

const removeSubAttribute = (index: number) => {
  if (form.subAttributes) {
    form.subAttributes.splice(index, 1);
  }
};

const save = () => {
  emit('save', { ...form });
};
</script>