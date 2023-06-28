import { RouteLocationRaw, useRouter } from 'vue-router';

export const useGoTo = () => {
    const router = useRouter();

    return (options: RouteLocationRaw) => {
        return router.push(options);
    };
};