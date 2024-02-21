import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {User} from "./models/User";
import {Token} from "./models/Token";


export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({
        baseUrl:"http://127.0.0.1:8000",
        timeout: 2000
    }),
    tagTypes: ['Post'],
    endpoints: (build) => ({
        loginApi: build.mutation<User, User>({
            query: ({ username, password }) => ({
                url:`/users/api-token/`,
                method: 'POST',
                body: {
                    'username': username,
                    'password': password
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }),
            invalidatesTags: ['Post']
        }),
        getData: build.query<Token, Token>({
            query:({source,number_car})=>({
                url: `service/api/${source}/?factory_number=${number_car}` ,
                headers: {
                    authorization: `Token ${localStorage.getItem('token')}`
                }

        }),
            providesTags: result => ["Post"]
        }),
})
})