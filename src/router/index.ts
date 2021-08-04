import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import PathNotFound from '../views/PathNotFound.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Log In',
    component: Home,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresAuth: true },
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
        meta: { isAdmin: true },
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
        meta: { isAdmin: true },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: PathNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem('email')) {
      next();
      return;
    }
    next('/');
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.isAdmin)) {
    if (JSON.parse(localStorage.getItem('isAdmin') as string)) {
      next();
      return;
    }
    next('/');
  } else {
    next();
  }
});

export default router;
