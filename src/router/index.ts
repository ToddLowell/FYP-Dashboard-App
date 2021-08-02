import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/Dashboard/Home.vue'),
      },
      {
        path: 'user',
        name: 'User Profile',
        component: () => import('../views/Dashboard/User.vue'),
      },
      {
        path: 'employees',
        name: 'Employees',
        component: () => import('../views/Dashboard/Employees.vue'),
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: () => import('../views/Dashboard/Notifications.vue'),
      },
      {
        path: 'maps',
        name: 'Maps',
        component: () => import('../views/Dashboard/Maps.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
