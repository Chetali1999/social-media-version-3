import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostList as PostListData } from "../Store/Post-list-store";
import WelcomeMessage from "./WelCome-mesage";
import LoadingSpinner from "./LoadingSpinner";

const PostList = () => {

    const { postList, addInitialPosts } = useContext(PostListData);
    const [fetching, setfetching] = useState(false);

    useEffect(() => {

        const contoller = new AbortController();
        const signal = contoller.signal;

        setfetching(true)
        fetch('https://dummyjson.com/posts')
            .then(res => res.json())
            .then(data => {
                addInitialPosts(data.posts)
                setfetching(false)
            });
        return () => {
            contoller.abort();
        }
    },
        []);

    return (

        <>
            {fetching && <LoadingSpinner />}
            {!fetching && postList.length === 0 && <WelcomeMessage />}
            {!fetching && postList.map((post) => <Post key={post.id} post={post} />)}
        </>
    )
}

export default PostList;