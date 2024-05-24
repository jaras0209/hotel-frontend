import { createStore } from 'vuex'

const store = createStore({
    state: {
        isAuthenticated: false,
        alertMessage: '',
        userRole: '' // 有Housekeeping, GeneralManger, 
    },
    mutations: {
        setAuthentication(state, status) {
            state.isAuthenticated = status;
        },
        setAlertMessage(state, message) {
            state.alertMessage = message;
        },
        setUserRole(state, role) {
            state.userRole = role;
        }
    },
    actions: {
        login({ commit }) {
            commit('setAuthentication', true);
        },
        logout({ commit }) {
            commit('setAuthentication', false);
            commit('setAlertMessage','請先登入');
            commit('setUserRole', '');
        }
    }
})

export default store
