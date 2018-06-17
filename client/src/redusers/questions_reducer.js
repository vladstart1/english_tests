export default (state={},action) =>  {
    switch(action.type){
        case 'GET_QUESTIONS':
            return {...state,list: action.payload}
        case 'ADD_QUESTION': 
            return {...state, newQuestion: action.payload}
        case 'GET_QUESTION':
            return {...state, question: action.payload}
        case 'UPDATE_QUESTION':
            return {
                ...state,
                updateQuestion: action.payload.success,
                question: action.payload.doc
            
            }
        case 'DELETE_QUESTION':
            return {
                ...state,
                postDeleted: action.payload
            }
        case 'CLEAR_QUESTION':
            return {
                ...state,
                updateQuestion: action.payload.updateQuestion,
                question: action.payload.question,
                postDeleted: action.payload.postDeleted
            }
        default:
            return state;
    }
};
