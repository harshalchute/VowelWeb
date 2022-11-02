import axios from "../helpers/axios"

export const test = async () => {
    try {
        const res = await axios.get(`/auth/test`)
        if (res.status === 200) {
            console.log(res);
        }
    } catch (error) {
        console.log(error)
    }
}
