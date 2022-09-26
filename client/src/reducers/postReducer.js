import { POSTS_LOADED_SUCCESS, POSTS_LOADED_FAIL, ADD_POST, DELETE_POST, UPDATE_POST, FIND_POST } from '../contexts/constain';
export const postReducer = (state, action) => {
    const {type, payload} = action;
    switch (type) {
        case POSTS_LOADED_SUCCESS:
            return{
                ...state,
                postLoading: false,
                posts: payload
            }

        case POSTS_LOADED_FAIL:
            return{
                ...state,
                postLoading: false,
                posts: []
            }    

        case ADD_POST:
            return {
                ...state,
                postLoading: false,
                posts: [...state.posts, payload]
            }

        case DELETE_POST:
            return {
                ...state,
                postLoading: false,
                posts: state.posts.filter(post => post._id !== payload)
            }

        case UPDATE_POST:
            const newPost = state.posts.map(post => post._id === payload._id ? payload : post)
            return { 
                ...state,
                posts: newPost
            }

        case FIND_POST:
            return {
                ...state,
                post: payload
            }
        default:
            return state;
    }
}