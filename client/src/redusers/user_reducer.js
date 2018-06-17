export default (state={},action) =>  {
    switch(action.type){
        case 'USER_LOGIN':
            return {...state,login: action.payload}
        case 'USER_AUTH':
            return {...state, login: action.payload}
        case 'GET_USER_QUESTIONS':
            return {...state, userQuestions: action.payload}
        case 'GET_USERS':
            return {...state, users: action.payload}
        case 'USER_REGISTER':
            return {
                ...state,
                register: action.payload
            }
        case 'CLEAR_REGISTER':
            return {
                ...state,
                register: action.payload.register
            }
        default:
            return state;
    }
};
