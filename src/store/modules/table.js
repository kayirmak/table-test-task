import {GET_DATA} from '@/api/index.js'

const state = {
    data: []
}

const getters = {

}

const mutations = {
    getData_start() {

    },

    getData_success(state, payload) {
        state.data = payload
    },

    getData_failure() {

    }
}

const actions = {
    getData({commit}, url) {
        return new Promise(() => {
            GET_DATA(url).then(res => {
                console.log(res);
                commit('getData_success', res.data)
            })
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}