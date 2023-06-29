import axios from '@/app/axios';

interface VehiclesResponse {
    results: Vehicle[];
}

export const getVehicles = async (): Promise<VehiclesResponse> => {
    const response = await axios.get<VehiclesResponse>('/vehicles/');

    return response.data;
};

export const getVehicleById = async (id: string | number): Promise<Vehicle> => {
    const response = await axios.get<Vehicle>(`/vehicles/${id}`);

    return response.data;
};
