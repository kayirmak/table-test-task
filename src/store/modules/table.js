import {GET_DATA} from '@/api/index.js'

const state = {
    data: []
}

const getters = {
    data: state => state.data,
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
                commit('getData_success', res.data)
            })
        })
    },

    // sortTableBy(data, name) {
    //     switch(name) {
    //         case 'byName': data.sort()
    //     }
    // }
}

export default {
    state,
    getters,
    mutations,
    actions
}