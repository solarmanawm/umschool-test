import { createRouter, createWebHistory } from 'vue-router'
import { routeNames, routes } from '@/app/routes';
import { useLoginStore } from '@/features/login/model';
import { useSorting } from '@/features/sorting/model';
import { useFiltering } from '@/features/filtering/model';

const router = createRouter({
    history: createWebHistory(),
    routes: Object.values(routes),
});

router.beforeEach((to, _, next) => {
    const loginStore = useLoginStore();
    const sorting = useSorting();
    const filtering = useFiltering();

    if (to.meta?.sorting) {
        sorting.updateOptions(to.meta.sorting as Option[]);
        sorting.enable();
    } else {
        sorting.disable();
    }

    if (to.meta?.filtering) {
        filtering.updateOptions(to.meta.filtering as FilteringOptions);
        filtering.enable();
    } else {
        filtering.disable();
    }

    if (to.meta?.auth && !loginStore.isLogin) {
        next({
            name: routeNames.home,
        });
    }

    next();
});

export default router;
