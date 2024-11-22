import axiosInstance from "@/axios/axiosInstances";
import { createAsyncThunk,createSlice,PayloadAction } from "@reduxjs/toolkit";

interface User {
    _id: string;
    username: string;
    email: string;
    profilePic: string;
}

interface Post {
    _id: string;
    postById: User;
    text: string;
    image?: string;
    likes: string[];
    replies: any[];
    createdOn: string;
    reposts: string[];
}
interface PostsState {
    posts: Post[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}
const initialState: PostsState = {
    posts: [],
    status: "idle",
    error: null,
};


export const fetchPostsByUserId = createAsyncThunk(
    "posts/fetchPostByUserId",
    async(userId:string) => {
        const response = await axiosInstance.get(`/posts/${userId}`);
        return response.data.posts;
        
    }
);

export const fetchPosts = createAsyncThunk(
    "posts", 
        async () => {
            const response = await axiosInstance.get('/posts');
            return response.data.posts;
        });
            
            


 const postsSlice = createSlice({
     name:'posts',
     initialState,
     reducers:{},
     extraReducers:(builder) => {
        builder

                .addCase(fetchPostsByUserId.pending,(state) => {
                    state.status ="loading";
                    state.error = null;
                })
                .addCase(fetchPostsByUserId.fulfilled,(state,action : PayloadAction<Post[]>) => {
                    state.status = 'succeeded';
                    state.posts = action.payload;
                })
                .addCase(fetchPostsByUserId.rejected,(state ,action ) => {
                    state.status = "failed";
                    state.error = action.error.message || "error";
                })


                .addCase(fetchPosts.pending,(state) => {
                    state.status = 'loading';
                    state.error = null;
                })
                .addCase(fetchPosts.fulfilled,(state,action:PayloadAction<Post[]>) => {
                    state.status = "succeeded";
                    state.posts = action.payload;
                })
                .addCase(fetchPosts.rejected,(state,action) => {
                    state.status = 'failed';
                    state.error = action.error.message || "error";
                })
                

     }
 })


 export default postsSlice.reducer;










