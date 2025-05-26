import { ref } from 'vue';
import type { Property, SchemaDetails, SchemaType, Tab, AccountType, AccountCorrelation } from '../types';

export function useSchema() {
  const schemaTypes: SchemaType[] = ['Account', 'Group', 'Permission'];
  const selectedSchemaType = ref<SchemaType>('Account');
  
  const tabs: Tab[] = [
    { id: 'details', label: 'Details' },
    { id: 'properties', label: 'Properties' },
    { id: 'rules', label: 'Rules' }
  ];
  
  const activeTab = ref('details');

  const schemaDetails = ref<SchemaDetails>({
    name: 'User',
    id: '_ACCOUNT_',
    nativeType: '_ACCOUNT_',
    displayNameAttribute: 'mail'
  });

  const properties = ref<Property[]>([
    { order: 1, name: 'userPrincipalName', type: 'string', required: true },
    { order: 2, name: '_PASSWORD_', type: 'string', required: true },
    { order: 3, name: 'givenName', type: 'string', required: false },
    { order: 4, name: 'surname', type: 'string', required: false },
    { order: 5, name: 'mail', type: 'string', required: true },
    { order: 6, name: 'displayName', type: 'string', required: true },
    { order: 7, name: 'accountEnabled', type: 'boolean', required: true },
    { order: 8, name: 'mailNickname', type: 'string', required: true }
  ]);

  const accountTypes = ref<AccountType[]>([
    { id: 'default', name: 'Default' }
  ]);

  const accountCorrelation = ref<AccountCorrelation>({
    identityAttribute: 'userName',
    accountAttribute: 'userPrincipalName'
  });

  const identityAttributes = [
    { value: 'userName', label: 'User Name' },
    { value: 'firstName', label: 'First Name' },
    { value: 'lastName', label: 'Last Name' }
  ];

  const accountAttributes = properties.value.map(prop => ({
    value: prop.name,
    label: prop.name
  }));

  return {
    schemaTypes,
    selectedSchemaType,
    tabs,
    activeTab,
    schemaDetails,
    properties,
    accountTypes,
    accountCorrelation,
    identityAttributes,
    accountAttributes
  };
}