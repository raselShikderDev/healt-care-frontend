import { getCookie } from "./tokenHandler";

const serverFetchHelper = async (
  endpoint: string,
  options: RequestInit
): Promise<Response> => {
  const { headers, ...restOptions } = options;
  const accessToken = await getCookie("accessToken");

  console.log({
    "api url hitted": `${
      process.env.NEXT_PUBLIC_BASE_URL as string
    }${endpoint}`,
  });
  console.log({ restOptions: { ...restOptions } });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL as string}${endpoint}`,
    {
      credentials: "include",
      headers: {
        // ...(accessToken ? { "Authorization": `Bearer ${accessToken}` } : {}),
        // ...(accessToken ? { "Authorization": accessToken } : {}),
        Cookie: accessToken ? `accessToken=${accessToken}` : "",
        ...headers,
      },
      ...restOptions,
    }
  );

  // console.log({ response: await response.json() });

  return response;
};

export const serverFetch = {
  get: async (endPoint: string, options: RequestInit = {}): Promise<Response> =>
    serverFetchHelper(endPoint, { ...options, method: "GET" }),

  post: async (
    endPoint: string,
    options: RequestInit = {}
  ): Promise<Response> =>
    serverFetchHelper(endPoint, { ...options, method: "POST" }),

  patch: async (
    endPoint: string,
    options: RequestInit = {}
  ): Promise<Response> =>
    serverFetchHelper(endPoint, { ...options, method: "PATCH" }),

  put: async (endPoint: string, options: RequestInit = {}): Promise<Response> =>
    serverFetchHelper(endPoint, { ...options, method: "PUT" }),

  delete: async (
    endPoint: string,
    options: RequestInit = {}
  ): Promise<Response> =>
    serverFetchHelper(endPoint, { ...options, method: "DELETE" }),
};

// method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(validatedFeild.data),
//       credentials: "include",
