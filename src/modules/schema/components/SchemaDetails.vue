<template>
  <div class="app-card p-4">
    <div class="mb-4">
      <label class="form-label">Name</label>
      <input type="text" class="form-control" v-model="details.name">
    </div>

    <div class="mb-4">
      <label class="form-label">ID</label>
      <input type="text" class="form-control" v-model="details.id" readonly>
    </div>

    <div class="mb-4">
      <label class="form-label">Native Type</label>
      <input type="text" class="form-control" v-model="details.nativeType" readonly>
    </div>

    <div class="mb-4">
      <label class="form-label">Display Name Attribute</label>
      <select class="form-select" v-model="details.displayNameAttribute">
        <option value="mail">mail</option>
        <option value="displayName">displayName</option>
        <option value="userPrincipalName">userPrincipalName</option>
      </select>
      <div class="form-text">
        Attribute on the target system to use to populate a human-readable name for this object type and any associated entitlements.
      </div>
    </div>

    <div class="mb-4">
      <div class="form-check form-check-inline mb-3">
        <input class="form-check-input" type="radio" v-model="uploadType" value="local" id="localUpload">
        <label class="form-check-label" for="localUpload">Local Upload</label>
      </div>
      <div class="form-check form-check-inline mb-3">
        <input class="form-check-input" type="radio" v-model="uploadType" value="cloud" id="cloudStorage">
        <label class="form-check-label" for="cloudStorage">Cloud Storage</label>
      </div>

      <!-- Local Upload Section -->
      <div v-if="uploadType === 'local'" 
           class="upload-container" 
           @dragover.prevent="dragover = true"
           @dragleave.prevent="dragover = false"
           @drop.prevent="handleDrop"
           :class="{ 'dragover': dragover }">
        <input 
          type="file" 
          ref="fileInput" 
          accept=".csv" 
          class="file-input" 
          @change="handleFileSelect"
        >
        <div class="upload-content">
          <i class="bi bi-file-earmark-text upload-icon"></i>
          <p class="upload-text">Drag and drop the .csv file here, or upload the file from your computer.</p>
        </div>
      </div>

      <!-- Cloud Storage Section -->
      <div v-else class="cloud-storage-section">
        <div class="mb-3">
          <label class="form-label">Cloud Provider</label>
          <select class="form-select" v-model="cloudProvider">
            <option value="azure">Azure Blob Storage</option>
            <option value="aws">AWS S3</option>
            <option value="gcp">Google Cloud Storage</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label">Storage Location</label>
          <input 
            type="text" 
            class="form-control" 
            v-model="storageUrl"
            :placeholder="getStorageUrlPlaceholder"
          >
          <div class="form-text">
            {{ getStorageHelperText }}
          </div>
        </div>
      </div>
      <div class="supported-files">Supported file types: .csv</div>
    </div>

    <div class="text-end">
      <button class="btn btn-primary" @click="$emit('save', details)">Save</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import type { SchemaDetails } from '../types';

const props = defineProps<{
  initialDetails: SchemaDetails;
}>();

const emit = defineEmits<{
  (e: 'save', details: SchemaDetails): void;
}>();

const details = reactive<SchemaDetails>({ ...props.initialDetails });
const uploadType = ref('local');
const cloudProvider = ref('azure');
const storageUrl = ref('');
const dragover = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);

const getStorageUrlPlaceholder = computed(() => {
  switch (cloudProvider.value) {
    case 'azure':
      return 'https://myaccount.blob.core.windows.net/mycontainer/path/to/file.csv';
    case 'aws':
      return 's3://my-bucket/path/to/file.csv';
    case 'gcp':
      return 'gs://my-bucket/path/to/file.csv';
    default:
      return '';
  }
});

const getStorageHelperText = computed(() => {
  switch (cloudProvider.value) {
    case 'azure':
      return 'Enter the complete Azure Blob Storage URL including the container and file path';
    case 'aws':
      return 'Enter the S3 URI including bucket name and file path';
    case 'gcp':
      return 'Enter the Google Cloud Storage URI including bucket name and file path';
    default:
      return '';
  }
});

const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files?.length) {
    handleFile(input.files[0]);
  }
};

const handleDrop = (event: DragEvent) => {
  dragover.value = false;
  const files = event.dataTransfer?.files;
  if (files?.length) {
    handleFile(files[0]);
  }
};

const handleFile = (file: File) => {
  if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
    console.log('Processing CSV file:', file.name);
  } else {
    console.error('Invalid file type. Please upload a CSV file.');
  }
};
</script>

<style scoped>
.upload-container {
  border: 2px dashed #e5e7eb;
  border-radius: 0.5rem;
  padding: 2rem;
  text-align: center;
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease;
}

.upload-container.dragover {
  border-color: var(--bs-primary);
  background-color: #f8fafc;
}

.upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.upload-icon {
  font-size: 2rem;
  color: #6b7280;
}

.upload-text {
  margin: 0;
  color: #6b7280;
}

.file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.supported-files {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.cloud-storage-section {
  background-color: #f9fafb;
  border-radius: 0.5rem;
  padding: 1.5rem;
}
</style>