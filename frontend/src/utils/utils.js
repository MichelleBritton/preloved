
import { jwtDecode } from "jwt-decode";
import { axiosReq } from "../api/axiosDefaults";

// fetchMoreData function for the next prop for infinite scrolling
export const fetchMoreData = async (resource, setResource) => {
    try {
        let url=new URL(resource.next)
        let correctUrl = resource.next.split(`${url.origin}/api`)[1]
        const { data } = await axiosReq.get(correctUrl);
        setResource(prevResource => ({
            ...prevResource,
            next:data.next, 
            results: data.results.reduce((acc, cur) => {                
                return acc.some(accResult => accResult.id === cur.id) 
                    ? acc 
                    : [...acc, cur];
            }, prevResource.results)
        }));
    } catch(err) {
        //console.log(err);
    }
};

// Token refresh fix
export const setTokenTimestamp = (data) => {
    const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
    localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

export const shouldRefreshToken = () => {
    return !!localStorage.getItem("refreshTokenTimestamp");
};

export const removeTokenTimestamp = () => {
    localStorage.removeItem("refreshTokenTimestamp");
};
