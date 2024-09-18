import axios from 'axios'

export default async function Signin(email: string, password: string) {

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


    } catch (err) {
        console.error('Error:', err);
    }
}