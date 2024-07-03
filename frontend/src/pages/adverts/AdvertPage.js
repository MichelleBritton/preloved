import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Advert from "./Advert";

function AdvertPage() {
    // Fetch data about the advert with the id that is contained within the url 
    const { id } = useParams();
    // Set the initial value to an object containing an empty array of results so 
    // that logic is future compatible for single post object or an array of posts from API
    const [advert, setAdvert] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: fetchedAdvert }] = await Promise.all([
                    axiosReq.get(`/adverts/${id}`),
                ]);
                setAdvert({ results: [fetchedAdvert] });
            } catch(err) {
                console.log(err)
            }
        };

        handleMount();
    }, [id]);


    return (
        <>
            {/* SetAdverts for likes functionality */}
            <Advert {...advert.results[0]} setAdverts={setAdvert} postPage />
        </>            
    );
}

export default AdvertPage;