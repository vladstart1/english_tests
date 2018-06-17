import axios from 'axios';

export function getQuestions(
    limit = 5,
    start = 0,
    order = 'asc',
    skip = [],
    list = ''
) {
    const request = axios.get(`/api/questions?limit=${limit}&skip=${start}&order=${order}&nin=${skip}`)
        .then(res => {
            if (list) {
                const newList = [...list, ...res.data];
                return newList;
            } else {
                return res.data
            }
        })

    return {
        type: 'GET_QUESTIONS',
        payload: request
    }
}

export function getUserQuestions(userId) {
    const request = axios.get(`/api/user_posts?user=${userId}`)
        .then(res => res.data);

    return {
        type: 'GET_USER_QUESTIONS',
        payload: request
    }
}

export function getQuestion(id){
     const request =  axios.get(`/api/getQuestion?id=${id}`)
     .then(res=>res.data)

     return {
         type: 'GET_QUESTION',
         payload: request
     }
}

export function updateQuestion(data){
    const request = axios.post(`/api/question_update`, data)
    .then(res=>res.data);

    return{
        type: 'UPDATE_QUESTION',
        payload: request
    }
}

export function deleteQuestion(id){
    const request = axios.delete(`/api/delete_question?id=${id}`)
    .then(res=>res.data)

    return {
        type: 'DELETE_QUESTION',
        payload: request
    }
}

export function clearQuestion(){
    return {
        type: 'CLEAR_QUESTION',
        payload: {
            question: {},
            updateQuestion: false,
            postDeleted: false
        }
    }
}

/*========== USER ============*/

export function loginUser({ email, password }) {
    const request = axios.post(`/api/login`, { email, password })
        .then(res => res.data);
    return {
        type: 'USER_LOGIN',
        payload: request
    }
}

export function auth() {
    const request = axios.get('/api/auth')
        .then(res => res.data);

    return {
        type: 'USER_AUTH',
        payload: request
    }
};

export function addQuestion(question) {
    const request = axios.post('/api/question', question)
        .then(res => res.data)

    return {
        type: 'ADD_QUESTION',
        payload: request
    }
};

export function clearAddQuestion() {

    return {
        type: 'CLEAR_ADD_QUESTION',
        payload: {
            newQuestion: ''
        }
    }
};

export function getUsers(){
    const request = axios.get('/api/users')
        .then(res=>res.data)

        return{
            type: 'GET_USERS',
            payload: request
        }
};

export function userRegister(user){
    const request = axios.post(`/api/register`, user)
    .then(res=>res.data.success)

    return{
        type: 'USER_REGISTER',
        payload: request
    }
}

export function clearRegister(){
    return {
        type: 'CLEAR_REGISTER',
        payload: {
            register: false
        }
    }
}
