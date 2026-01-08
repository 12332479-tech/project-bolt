
const API_URL = 'http://localhost:5000/api';

export const fetchCars = async () => {
  try {
    const response = await fetch(`${API_URL}/cars`);
    if (!response.ok) {
      throw new Error('Failed to fetch cars');
    }
    const data = await response.json();
    // Ensure features is parsed correctly if it comes as a JSON string
    const cars = Array.isArray(data) ? data.map(car => {
        if (car.features && typeof car.features === 'string') {
            try {
                // Try JSON parse first
                car.features = JSON.parse(car.features);
            } catch (e) {
                // If not JSON, maybe comma separated? or just empty
                 console.warn('Failed to parse features for car', car.id);
                 car.features = [];
            }
        }
        if (!Array.isArray(car.features)) {
            car.features = [];
        }
        return car;
    }) : [];
    return cars;
  } catch (error) {
    console.error('Error fetching cars:', error);
    throw error;
  }
};

export const fetchCarById = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/cars/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch car');
    }
    const car = await response.json();
    if (car && car.features && typeof car.features === 'string') {
        try {
            car.features = JSON.parse(car.features);
        } catch (e) {
            car.features = [];
        }
    }
    if (car && !Array.isArray(car.features)) {
        car.features = [];
    }
    return car;
  } catch (error) {
    throw error;
  }
};

export const sendMessage = async (data: any) => {
  try {
    const response = await fetch(`${API_URL}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send message');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const login = async (data: any) => {
  try {
    const response = await fetch(`${API_URL}/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Login failed');
    }
    const result = await response.json();
    if (result.accessToken) {
        localStorage.setItem('user', JSON.stringify(result));
    }
    return result;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const register = async (data: any) => {
  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Registration failed');
    }
    return await response.json();
  } catch (error) {
    console.error('Error registering:', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user') || 'null');
};
