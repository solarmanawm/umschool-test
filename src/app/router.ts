import { createRouter, createWebHistory } from 'vue-router'
import { routeNames, routes } from '@/app/routes';
import { useLoginStore } from '@/features/login/model';
import { useSorting } from '@/features/sorting/model';

const router = createRouter({
    history: createWebHistory(),
    routes: Object.values(routes),
});

router.beforeEach((to, _, next) => {
    const loginStore = useLoginStore();
    const sorting = useSorting();

    if (to.meta?.sorting) {
        sorting.updateOptions(to.meta.sorting as Option[]);
    }

    if (to.meta?.auth && !loginStore.isLogin) {
        next({
            name: routeNames.home,
        });
    }

    next();
});

export default router;
