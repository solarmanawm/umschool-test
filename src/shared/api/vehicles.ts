import axios from '@/app/axios';

export const getVehicleById = async (id: string | number): Promise<Vehicle> => {
    const response = await axios.get<Vehicle>(`/vehicles/${id}`);

    return response.data;
};
