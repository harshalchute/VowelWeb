import axios from "../helpers/axios";

export const registerService = async (data) => {
    // console.log(data);
    try {
        const res = await axios.post(`/auth/register`, {
            name: data.name,
            email: data.email,
            password: data.password
        })
        if (res.status === 200) {
            return {
                success: true,
                message: res.data.message
            }
        }
    } catch (error) {
        // console.log("error: ", error.response)
        // console.log("error: ", error.response.data)
        return {
            error: true,
            errorStatus: error.response.status,
            errorMessage: error.response.data.message
        }
    }
}


export const verifyMailService = async (token) => {
    try {
        const res = await axios.get(`/auth/verify-email?token=${token}`)
        if (res.status === 200) {
            return {
                success: true,
                message: res.data.message
            }
        }
    } catch (error) {
        return {
            error: true,
            errorStatus: error.response.status,
            errorMessage: error.response.data.message
        }
    }
}

export const loginService = async (data) => {
    try {
        const res = await axios.post(`/auth/login`, {
            email: data.email,
            password: data.password
        })
        if (res.status === 200) {
            // console.log(res);
            localStorage.setItem('user', JSON.stringify(res.data.user))
            return {
                success: true,
                message: res.data.message
            }
        }
    } catch (error) {
        return {
            error: true,
            errorStatus: error.response.status,
            errorMessage: error.response.data.message
        }
    }
}