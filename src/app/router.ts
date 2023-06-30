import { createRouter, createWebHistory } from 'vue-router'
import { routeNames, routes } from '@/app/routes';
import { useLoginStore } from '@/features/login/model';

const router = createRouter({
    history: createWebHistory(),
    routes: Object.values(routes),
});

router.beforeEach((to, _, next) => {
    const loginStore = useLoginStore();

    if (to.meta?.auth && !loginStore.isLogin) {
        next({
            name: routeNames.home,
        });
    }

    next();
});

export default router;
