import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/AdvertCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function AdvertEditForm() {
    const [errors, setErrors] = useState({});
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [deliverOptions, setDeliverOptions] = useState([]);
    const [locationOptions, setLocationOptions] = useState([]);

    const [advertData, setAdvertData] = useState({
        title: "",
        description: "",
        price: "",
        location: "",
        category: "",
        deliver: "",
        image_1: null,
        image_2: null,
        image_3: null,
        image_4: null,
    });

    const { 
        title, description, price, location, category, deliver, image_1, image_2, 
        image_3, image_4 
    } = advertData;

    // Use an array to create refs for each image input
    const imageRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

    const history = useHistory();
    const { id } = useParams();

    // GET request to retrieve adverts by id
    useEffect(() => {
        const handleMount = async () => {
            try {
                const {data} = await axiosReq.get(`/adverts/${id}/`);
                const {
                    title, description, price, location, category, deliver, image_1, image_2, 
                    image_3, image_4, is_owner
                } = data;

                // Check if user is owner and set advert data otherwise redirect to home page
                is_owner ? setAdvertData({
                    title, description, price, location, category, deliver, image_1, image_2, 
                    image_3, image_4
                }) : history.push('/');
            } catch(err) {
                // console.log(err);
            }
        };

        handleMount();
    }, [history, id]);

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

    // Handle form changes
    const handleChange = (event) => {
        setAdvertData({
            ...advertData,
            [event.target.name]: event.target.value,
        });
    };

    // Handle image upload
    const handleChangeImage = (index) => (event) => {
        if (event.target.files.length) {
            const file = event.target.files[0];
            setAdvertData((prevData) => ({
                ...prevData,
                [`image_${index}`]: file,
            }));
        }
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('location', location);
        formData.append('category', category);
        formData.append('deliver', deliver);

        // Check to see if the image is a file object and if so, that means
        // that a new image has been uploaded. If not then the image remains
        // unchanged as it will be a URL not a file
        if (image_1 instanceof File) {
            formData.append('image_1', image_1);
        }
        if (image_2 instanceof File) {
            formData.append('image_2', image_2);
        }
        if (image_3 instanceof File) {
            formData.append('image_3', image_3);
        }
        if (image_4 instanceof File) {
            formData.append('image_4', image_4);
        }

        try {
            // PUT request to edit advert
            await axiosReq.put(`/adverts/${id}/`, formData);
            history.push(`/adverts/${id}`);
        } catch (err) {
            if (err.response?.status !== 401){
                setErrors(err.response?.data);
            }
        }
    };

    const textFields = (
        <div>
            <Form.Group controlId="title">
                <Form.Label>Title *</Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors.title?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                    {message}
                </Alert>
            ))}

            <Form.Group controlId="description">
                <Form.Label>Description *</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={6}
                    name="description"
                    value={description}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors.description?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                    {message}
                </Alert>
            ))}

            <Form.Group controlId="price">
                <Form.Label>Price *</Form.Label>
                <Form.Control
                    type="text"
                    name="price"
                    value={price}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors.price?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                    {message}
                </Alert>
            ))}

           <Form.Group controlId="location">
                <Form.Label>Location *</Form.Label>
                <Form.Control
                    as="select"
                    value={location}
                    onChange={handleChange}
                    name="location"
                >
                    {locationOptions.map(option => (
                        <option key={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>
            {errors.location?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                    {message}
                </Alert>
            ))}

            <Form.Group controlId="category">
                <Form.Label>Category *</Form.Label>
                <Form.Control
                    as="select"
                    value={category}
                    onChange={handleChange}
                    name="category"
                >
                    {categoryOptions.map(option => (
                        <option key={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Form.Control>
            </Form.Group>
            {errors.category?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                    {message}
                </Alert>
            ))}

            <Form.Group controlId="deliver">
                <Form.Label>Deliver *</Form.Label>
                <Form.Control
                    as="select"
                    value={deliver}
                    onChange={handleChange}
                    name="deliver"
                >
                    {deliverOptions.map(option => (
                        <option key={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Form.Control>               
            </Form.Group>
            {errors.deliver?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                    {message}
                </Alert>
            ))}

            <Button
                className={`${btnStyles.Button} ${btnStyles.Blue}`}
                onClick={() => history.goBack()}
            >
                Cancel
            </Button>
            <Button
                className={`${btnStyles.Button} ${btnStyles.Blue}`}
                type="submit"
            >
                Save Advert
            </Button>
        </div>
    );
    return (
        <Form onSubmit={handleSubmit}>
            <Container className={`${appStyles.Content} ${styles.Container} mb-5`}>
                <h1 className="text-center mb-4">Edit your advert</h1>
                <h2>Photos (You can add up to 4 photos)</h2>
                <Form.Group className={`${styles.FormGroup} p-3 d-flex flex-row flex-wrap justify-content-between align-items-center text-center`}>
                    {[image_1, image_2, image_3, image_4].map((image, index) => {
                        const imageUrl = image instanceof File ? URL.createObjectURL(image) : image;
                        return (
                            <div key={index} className={styles.ImgGroup}>
                                <figure>
                                    <Image className={styles.Image} src={imageUrl} rounded />
                                </figure>
                                <div>
                                    <Form.Label
                                        className={`${btnStyles.Button} ${btnStyles.Blue}`}
                                        htmlFor={`image-upload-${index + 1}`}
                                    >
                                        Change the image
                                    </Form.Label>
                                </div>
                                   
                                <Form.File
                                    id={`image-upload-${index + 1}`}
                                    accept="image/*"
                                    onChange={handleChangeImage(index + 1)}
                                    ref={imageRefs[index]}
                                />
                                {errors[`image_${index + 1}`]?.map((message, idx) => (
                                    <Alert key={idx} variant="warning">
                                        {message}
                                    </Alert>
                                ))}
                            </div>
                        );
                    })}
                </Form.Group>
                <div>{textFields}</div>
            </Container>
        </Form>
    );
}    

export default AdvertEditForm;