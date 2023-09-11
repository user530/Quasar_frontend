import { useAuthStore } from 'src/stores/auth'
import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

export function authGuard(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
    const authStore = useAuthStore();

    if (authStore.user)
        next();
    else
        next('/login');
}