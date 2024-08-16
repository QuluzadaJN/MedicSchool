// // import { apiSlice } from "../store/apiSlice";

// // export const authApiSlice = apiSlice.injectEndpoints({
// //     endpoints: builder => ({
// //         login: builder.mutation({
// //             query: credentials => ({
// //                 url: '/login',
// //                 method: 'POST',
// //                 headers: {
// //                     'Content-Type': 'application/json',
// //                 },
// //                 body: JSON.stringify({...credentials})
// //             })
// //         }),
// //     })
// // })

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const baseURL = 'http://167.86.101.78:8080/api/v1/auth';

// export const authApiSlice = createApi({
//     // reducerPath: 'authApiSlice',
//     baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
//     endpoints: (builder) => ({
//         login: builder.mutation({
//             query: ({ email, password }) => ({
//                 url: '/login',
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email, password }),
//             })
//         })
//     })
// })

// // export const authApiSlice = apiSlice.injectEndpoints({
// //     endpoints: (builder) => ({
// //         login: builder.mutation({
// //             query: ({ email, password }) => ({
// //                 url: '/login',
// //                 method: "POST",
// //                 body: JSON.stringify({ email, password }),
// //             })
// //         })
// //     })
// // })

// export const {
//     useLoginMutation
// } = authApiSlice;


import { apiSlice } from "../store/apiSlice";

const USERS_URL = 'https://api.medicschool.az/api/v1';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth/login`,
                method: 'POST',
                body: data,
            }),
        }),
        loginWithGoogle: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth/google/login?email=` + data,
                method: 'POST',
            }),
        }),
        loginWithFacebook: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth/facebook/login?email=` + data,
                method: 'POST',
                credentials: "omit",
            }),
        }),
        logout: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/sessionTransaction/updateSessionToDeactive?email=` + data,
                method: 'PUT'
            })
        })
    }),
});

export const { useLoginMutation, useLoginWithGoogleMutation, useLoginWithFacebookMutation, useLogoutMutation} = usersApiSlice;
