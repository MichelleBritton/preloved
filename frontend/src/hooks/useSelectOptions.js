import { useEffect, useState } from 'react';
import { axiosReq } from "../api/axiosDefaults";

const useSelectOptions = () => {
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [deliverOptions, setDeliverOptions] = useState([]);
    const [locationOptions, setLocationOptions] = useState([]);
    
    // GET request for category choices endpoint to populate select field
    useEffect(() => {
        let isMounted = true; 
        const fetchCategoryOptions = async () => {
            try {
                const response = await axiosReq.get('adverts/category_choices'); 
                if (isMounted) setCategoryOptions(response.data);
            } catch (err) {
                //console.log(err);
            }
        };
        
        fetchCategoryOptions();
        return () => { isMounted = false };
    }, []);

    // GET request for deliver choices endpoint to populate select field
    useEffect(() => {
        let isMounted = true; 
        const fetchDeliverOptions = async () => {
            try {
                const response = await axiosReq.get('adverts/deliver_choices'); 
                if (isMounted) setDeliverOptions(response.data);
            } catch (err) {
                //console.log(err);
            }
        };
        
        fetchDeliverOptions();
        return () => { isMounted = false };
    }, []);

    // GET request for location choices endpoint to populate select field
    useEffect(() => {
        let isMounted = true; 
        const fetchLocationOptions = async () => {
            try {
                const response = await axiosReq.get('adverts/location_choices'); 
                if (isMounted) setLocationOptions(response.data);
            } catch (err) {
                //console.log(err);
            }
        };
        
        fetchLocationOptions();
        return () => { isMounted = false };
    }, []);

    return { categoryOptions, deliverOptions, locationOptions };
};

export default useSelectOptions;
