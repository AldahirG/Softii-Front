import axios from 'axios';

const API_URL = 'http://localhost:3000/api/tips';

export const addTip = async (tip: { amount: number; method: string; employees: Array<{ name: string; amount: number }> }) => {
  try {
    const response = await axios.post(API_URL, tip);
    return response.data;
  } catch (error) {
    console.error('Error al agregar propina', error);
    throw error;
  }
};
