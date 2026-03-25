import axios from 'axios'

const customFunction = async (endpoint, method, data,token=null ) => {
    try {
        const config = {
            method,
            url: "http://localhost:8080/" + endpoint,
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${token}`
            },
            data,
        };
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.error('Error in customFunction:', error);
        throw error;
    }   
}


export default customFunction;
