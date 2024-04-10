import { createContext, useReducer } from "react";

export const PostList = createContext({
    postList: [],
    addPost: () => { },
    addInitialPosts: () => { },
    deletePost: () => { }
});

const postListReducer = (currPostList, action) => {

    let newPostList = currPostList;
    if (action.type === 'DELETE_POST') {
        newPostList = currPostList.filter(
            (post) => post.id !== action.payload.postID
        );
    }
    else if (action.type === 'ADD_INITAL_POSTS') {
        newPostList = action.payload.posts;
    }
    else if (action.type === 'ADD_POST') {
        newPostList = [action.payload, ...currPostList]
    }
    return newPostList;
}

const PostListProvider = ({ children }) => {

    const [postList, dispachPostList] = useReducer(postListReducer, []);

    const addPost = (userID, postTitle, postBody, reactions, tags) => {
        dispachPostList({
            type: 'ADD_POST',
            payload: {
                id: Date.now(),
                title: postTitle,
                body: postBody,
                reactions: reactions,
                userId: userID,
                tags: tags
            }
        })
    }

    const addInitialPosts = (posts) => {
        dispachPostList({
            type: 'ADD_INITAL_POSTS',
            payload: {
                posts
            }
        })
    }

    const deletePost = (postID) => {
        dispachPostList(
            {
                type: 'DELETE_POST',
                payload: {
                    postID,
                },
            }
        )
    }

    return (
        <PostList.Provider value={{ postList: postList, addPost: addPost, addInitialPosts, deletePost: deletePost}}>
            {children}
        </PostList.Provider>
    )
};

export default PostListProvider;