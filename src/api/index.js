import axiosApi from './axios'

const GET_DATA = url => {
    return axiosApi.get(url)
}

export {
    GET_DATA
}