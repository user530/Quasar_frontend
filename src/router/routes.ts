import { RouteRecordRaw } from 'vue-router';
import { MainLayout } from 'src/layouts';
import { MainPage, AboutUsPage, NotFoundPage, RegisterPage, LoginPage, UserPage } from 'src/pages';
import { authGuard } from 'src/guards/authGuard';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component: MainPage },
      { path: 'aboutus', component: AboutUsPage },
      { path: 'register', component: RegisterPage },
      { path: 'login', component: LoginPage },
      {
        path: 'user', component: UserPage,
        beforeEnter: authGuard
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: NotFoundPage,
  },
];

export default routes;
