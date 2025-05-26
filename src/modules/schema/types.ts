export interface SubAttribute {
  name: string;
  displayName: string;
  type: string;
}

export interface Property {
  order: number;
  name: string;
  type: string;
  required: boolean;
  multiValued: boolean;
  subAttributes?: SubAttribute[];
  constrainValues?: boolean;
  valueConstraintType?: 'enumerated' | 'applicationObject';
  objectType?: string;
  isEntitlement?: boolean;
}

export interface SchemaDetails {
  name: string;
  id: string;
  nativeType: string;
  displayNameAttribute: string;
}

export type SchemaType = 'Account' | 'Group' | 'Permission';

export interface Tab {
  id: string;
  label: string;
}

export interface AccountType {
  id: string;
  name: string;
}

export interface AccountCorrelation {
  identityAttribute: string;
  accountAttribute: string;
}