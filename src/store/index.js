import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    tasks: [
        {
            id: '1',
            title: 'Visit Kyiv',
            tags: ['capital', 'city'],
            dueDate: '2022-10-10',
            completed: false
        }, {
            id: '2',
            title: 'Visit Odessa',
            tags: ['sea', 'city'],
            dueDate: '2021-10-10',
            completed: true
        }, {
            id: '3',
            title: 'Visit Lviv',
            tags: ['history', 'city'],
            dueDate: '2021-10-14',
            completed: false
        }
    ],
};

const getters = {
    getTasks: (state) => (showCompleted, searchTags) => {
        return state.tasks.filter((task) => {
            return ((showCompleted || !task.completed) && (task.tags.some(item => item.includes(searchTags)) || !searchTags));
        });
    },
    getTaskById: (state) => (id) => {
        return state.tasks.find(task => task.id === id );
    }
};

const actions = {
    save(context, task) {
        const index = context.state.tasks.findIndex(item => item.id === task.id);
        if (index > -1) {
            context.commit('UPDATE_TASK', {index, task});
        } else {
            const newTask = Object.assign({}, task);
            newTask.id = Date.now().toString(16);
            context.commit('ADD_TASK', newTask);
        }
    },
    delete(context, data) {
        const index = context.state.tasks.findIndex(item => item.id === data.id);
        if (index > -1) {
            context.commit('DELETE_TASK', index)
        }
    },
    update(context, task) {
        const index = state.tasks.findIndex(item => item.id === task.id);
        if (index > -1) {
            context.commit('UPDATE_TASK', {index, task})
        }
    }
};

const mutations = {
    ADD_TASK(state, task) {
        state.tasks.push(task);
    },
    UPDATE_TASK(state, {index, task}) {
        for (let key in task) {
            state.tasks[index][key] = task[key];
        }
    },
    DELETE_TASK(state, index) {
        state.tasks.splice(index, 1);
    }
};


export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});