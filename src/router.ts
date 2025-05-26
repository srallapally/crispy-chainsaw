import { createRouter, createWebHistory } from 'vue-router';
import ApplicationsList from './components/ApplicationsList.vue';
import ApplicationDetails from './components/ApplicationDetails.vue';
import SchemaView from './components/SchemaView.vue';
import DetailsView from './components/DetailsView.vue';
import AccountsView from './components/AccountsView.vue';
import EntitlementsView from './components/EntitlementsView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: ApplicationsList
    },
    {
      path: '/applications/new',
      component: ApplicationDetails
    },
    {
      path: '/applications/:id',
      component: ApplicationDetails,
      children: [
        { path: '', redirect: 'details' },
        { path: 'details', component: DetailsView },
        { path: 'schema', component: SchemaView },
        { path: 'accounts', component: AccountsView },
        { path: 'entitlements', component: EntitlementsView }
      ]
    }
  ]
});

export default router;