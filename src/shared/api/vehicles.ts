import axios from '@/app/axios';
import { getId } from '@/app/helpers';

export const getVehicleById = async (id: string | number): Promise<Vehicle> => {
    try {
        const response = await axios.get(`/vehicles/${id}`);

        return response.data;
    } catch (error: any) {
        const dummyResponse = await import('@/dummy/vehicles');
        const { results } = dummyResponse.default;
        const vehicle = results.find((vehicle: Vehicle) => {
            const currentId = getId(vehicle.url);

            return currentId === id.toString();
        });

        return vehicle;
    }
};