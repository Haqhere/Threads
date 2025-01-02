import axiosInstance from "@/axios/axiosInstances";
import { createAsyncThunk,createSlice,} from "@reduxjs/toolkit";



interface User {
    _id:string;
    name:string;
    users:string[];
    followers:string[];
    following:string[]
    username:string;
    email:string;
    profilepic:string;
    bio:string;
}

interface CurrentUser {
    _id:string;
    name:string;
    users:string[];
    followers:string[];
    following:string[]
    username:string;
    email:string;
    profilePic:string;
    bio:string;
}

interface UserState{
    users: User[];
    user : User | null;
    currentUser:CurrentUser|null;
    userData:User[];
    posts:any[]
    status:"idle"|"loading"|"succeeded"|"failed";
    error: string | null;
}

const initialState : UserState = {
    users:[],
    user:null,
    currentUser:null,
    userData :[],
    posts:[],
    status:"idle",
    error:null
}


export const fetchUsers = createAsyncThunk('Users/fetchUsers', async () => {
    const response = await axiosInstance.get('/users');
    return response.data.users;
})

export const fetchUserData = createAsyncThunk("userData/fetchUserData", async (userId:string) => {
    const response = await axiosInstance.get(`/users/${userId}`);
    return response.data;
})


export const  loginUser = createAsyncThunk<User,{ username:string , password:string },{rejectValue:string}>(
    'login/loginUser',
        async(userData, {rejectWithValue}) =>{
            try{
                const response = await axiosInstance.post('/users/login',userData);
                console.log(response)
                return response.data;
            }catch (error:any){
                return rejectWithValue(error.response?.data?.message || "error")
            }
        }
) 

export const fetchCurrentUser = createAsyncThunk('fetchCurrentUser/usersdata', async (  ) => {
    const Id = localStorage.getItem('userId');
    try{
    const response = await axiosInstance.get(`/users/${Id}`);
    return response.data?.user;
    }catch(error:any){
        console.error(error)
        return error
    }
})

export const UpdateUser = createAsyncThunk<CurrentUser,{rejectValue:string}>(
    "updateUser/updateUserData",
    async (updateData,{rejectWithValue}) => {
        const Id = localStorage.getItem('userId');
        try{
            const response = await axiosInstance.patch(`/users/${Id}`,updateData);
            return response.data;
        }catch(error :any){
            console.log(error)
            return rejectWithValue(error.response.data.message || "error updating userdata...")
        }
    }
)



const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
                .addCase(loginUser.pending,(state) => {
                    state.status = "loading";
                })
                .addCase(loginUser.fulfilled,(state , action) => {
                    state.status = "succeeded";
                    state.user = action.payload;
                }).addCase(loginUser.rejected,(state,action) => {
                     state.status = "failed";
                     state.error = action.payload || "Login failed!";
                });

        builder
                .addCase(fetchUsers.pending,(state) => {
                    state.status = "loading";
                })
                .addCase(fetchUsers.fulfilled,(state,action) => {
                    state.status = "succeeded";
                    state.users = action.payload;
                })
                .addCase(fetchUsers.rejected,(state,action) => {
                    state.status = "failed";
                    state.error = action.error?.message || null;
                });
        builder
                .addCase(fetchUserData.pending,(state) => {
                    state.status = "loading";
                })
                .addCase(fetchUserData.fulfilled, (state,action) => {
                    state.status = "succeeded";
                    state.userData = action.payload;
                })
                .addCase(fetchUserData.rejected,(state,action) => {
                    state.status = 'failed';
                    state.error = action.error?.message || null
                })
        builder
                .addCase(fetchCurrentUser.pending,(state) =>{
                    state.status = "loading";
                })
                .addCase(fetchCurrentUser.fulfilled,(state,action) => {
                    state.status = "succeeded";
                    state.currentUser = action.payload;
                })
                .addCase(fetchCurrentUser.rejected,(state,action) => {
                    state.status = 'failed';
                    state.error = action.error?.message || "error fetching";
                })
    }
   
})



export default userSlice.reducer; 
