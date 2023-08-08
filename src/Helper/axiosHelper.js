import axios from "axios"

const apiEp = "http://localhost:8000/api/v1/task/";

export const fetchTask = async () => {
    try {
        const { data } = await axios.get(apiEp)
        return data;
    } catch (error) {
        return {
            status: 'error',
            message: error.message
        }
    }
}

export const postTask = async (obj) => {
    try {
        const { data } = await axios.post(apiEp, obj);
        return data;
    } catch (error) {
        return {
            status: 'error',
            message: error.message
        }
    }
}

export const switchServerTask = async (obj) => {
    try {
        const { data } = await axios.patch(apiEp, obj);
        return data
    } catch (error) {
        return {
            status: 'error',
            message: error.message
        }
    }
}

export const deleteTask = async (ids) => {
    try {
        // const { data } = await axios.delete(apiEp, { data: ids });
        const { data } = await axios.delete(apiEp, { data: { _id: ids } });
        return data;
    } catch (error) {
        return {
            status: "error",
            message: error.message,
        };
    }
};