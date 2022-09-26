import {createContext, useReducer, useState} from 'react';
import axios from 'axios';
import {apiUrl, FIND_POST} from './constain'
import { POSTS_LOADED_SUCCESS, POSTS_LOADED_FAIL, ADD_POST, DELETE_POST, UPDATE_POST } from './constain';
import { postReducer } from '../reducers/postReducer';

export const PostContext = createContext();


const PostContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(postReducer, {
        post: null,
        posts: [],
        PostsLoading: true
    })

    // modal
    const [showAddPost, setShowAddPost] = useState(false);
    const [showUpdatePost, setShowUpdatePost] = useState(false);

    // toast
    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
        type: null
    })

    // Get posts 
    const getPosts = async () =>{
       try {
            const response = await axios.get(`${apiUrl}/post`);
            if(response.data.success) {
                dispatch({
                    type: POSTS_LOADED_SUCCESS,
                    payload: response.data.posts
                })
            }
       } catch (error) {
            dispatch({type: POSTS_LOADED_FAIL})
       }
    }

    // create posts
    const addPosts = async (newPost) => {
        try {
            const response = await axios.post(`${apiUrl}/post/create`, newPost)
            if(response.data.success){
                dispatch({
                    type: ADD_POST,
                    payload: response.data.post
                })
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : {success: false, message: 'Server error'};
        }
    }

    // delete posts
    const deletePost = async (postId) => {
        try {
            const response = await axios.delete(`${apiUrl}/post/${postId}`);
            if(response.data.success){
                dispatch({
                    type: DELETE_POST,
                    payload: postId
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    // update post
    const updatePost = async updatePost => {
        try {
            const response = await axios.put(`${apiUrl}/post/${updatePost._id}`, updatePost);
            if(response.data.success){
                dispatch({
                    type: UPDATE_POST,
                    payload: response.data.post
                })
                return response.data;
            }
        } catch (error) {
            return error.response.data ? error.response.data : {success: false, message: 'Server error'};
            
        }
    }

    // find post of update post
    const findPost = (postId) => {
        const post = state.posts.find((post) => post._id === postId)
        dispatch({
            type: FIND_POST,
            payload: post
        })
    }

    // Context data
    const postContextData = {
        state, 
        getPosts, 
        showAddPost, 
        setShowAddPost, 
        addPosts, 
        showToast, 
        setShowToast,
        deletePost,
        updatePost,
        findPost,
        showUpdatePost,
        setShowUpdatePost
    };

    return (
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider;