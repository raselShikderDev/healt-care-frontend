import { getCookie } from "./tokenHandler"


const serverFetchHelper = async (endPoint:string, options:RequestInit ):Promise<Response>=>{
    const {headers, ...restOpions} = options
    // const accessToken = await getCookie("accessToken")
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL as string}${endPoint}`, {
     headers: {
            ...headers,
            // ...(accessToken ? { "Authorization": `Bearer ${accessToken}` } : {}),
            // ...(accessToken ? { "Authorization": accessToken } : {}),
            // Cookie: accessToken ? `accessToken=${accessToken}` : "",
        },
        ...restOpions,
    });

    return res
}


export const serverFetch = {
    get: async(endPoint:string, options:RequestInit = {}):Promise<Response>=> (serverFetchHelper(endPoint,{ ...options, method:"GET"})),

    post: async(endPoint:string, options:RequestInit = {}):Promise<Response>=> (serverFetchHelper(endPoint,{ ...options, method:"POST"})),

    patch: async(endPoint:string, options:RequestInit = {}):Promise<Response>=> (serverFetchHelper(endPoint,{ ...options, method:"PATCH"})),

    put: async(endPoint:string, options:RequestInit = {}):Promise<Response>=> (serverFetchHelper(endPoint,{ ...options, method:"PUT"})),
    
    delete: async(endPoint:string, options:RequestInit = {}):Promise<Response>=> (serverFetchHelper(endPoint,{ ...options, method:"DELETE"})),
}



// method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(validatedFeild.data),
//       credentials: "include",