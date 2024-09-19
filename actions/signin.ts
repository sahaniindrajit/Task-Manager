import axios from 'axios';

type SigninResponse = {
    success: boolean;
    error?: string;
};

export default async function Signin(email: string, password: string): Promise<SigninResponse> {
    try {
        const response = await axios.post('http://localhost:3000/api/user/signin', {
            email,
            password
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });

        if (response.status === 200) {
            return { success: true };
        } else if (response.status === 401) {
            return { success: false, error: 'Invalid credentials' };
        } else if (response.status === 500) {
            return { success: false, error: 'Server error' };
        }

        // Handle other status codes as needed
        return { success: false, error: `Unexpected status code: ${response.status}` };

    } catch (err) {
        console.error('Error:', err);
        return { success: false, error: 'An unexpected error occurred' };
    }
}
