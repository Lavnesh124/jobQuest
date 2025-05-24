
export const BASE_API_URL = "http://localhost:8021/api/v1";

//API END POINTS
export const USER_API_END_POINT = `${BASE_API_URL}/user`;
export const JOB_API_END_POINT = `${BASE_API_URL}/job`;
export const ADMIN_API_END_POINT = `${BASE_API_URL}/admin`;


export const GET_ALL_COMPANIES = `${BASE_API_URL}/company/get`;
export const GET_JOB_DETAILS_BY_ID=(id)=> `${BASE_API_URL}/job/get/${id}`;


