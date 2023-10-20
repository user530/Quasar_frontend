import { storeToRefs } from 'pinia';
import { useAuthStore } from 'src/stores/auth'
import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

export async function authGuard(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): Promise<void> {
    const authStore = useAuthStore();
    const { getMe } = authStore;
    const { getUser } = storeToRefs(authStore);

    if (authStore.user) {
        next();
        return;
    }
    else {
        try {
            await getMe();

            if (!getUser.value)
                throw new Error();

            next();
        } catch (error) {
            next('/login');
        }
    }



}