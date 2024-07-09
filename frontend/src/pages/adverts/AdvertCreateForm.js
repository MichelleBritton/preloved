import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/AdvertCreateEditForm.module.css";
import Upload from "../../assets/upload.png";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import Asset from "../../components/Asset";
import { axiosReq } from "../../api/axiosDefaults";
import useSelectOptions from '../../hooks/useSelectOptions';

function AdvertCreateForm() {
    const [errors, setErrors] = useState({});

    const { categoryOptions, deliverOptions, locationOptions } = useSelectOptions();

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
            setAdvertData({
                ...advertData,
                [`image_${index}`]: file
            });
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

        if (image_1) formData.append('image_1', image_1);
        if (image_2) formData.append('image_2', image_2);
        if (image_3) formData.append('image_3', image_3);
        if (image_4) formData.append('image_4', image_4);

        try {
            // POST request to create new advert
            const {data} = await axiosReq.post('/adverts/', formData);
            history.push(`/adverts/${data.id}`);
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
                    <option>Please select</option>
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
                    <option>Please select</option>
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
                    <option>Please select</option>
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
                Create Advert
            </Button>
        </div>
    );
    return (
        <Form onSubmit={handleSubmit}>            
            <Container
                className={`${appStyles.Content} ${styles.Container} mb-5`}
            >      
                <h1 className="text-center mb-4">Create your advert</h1>  
                <h2>Photos (You can add up to 4 photos)</h2>        
                <Form.Group className={`${styles.FormGroup} p-3 d-flex flex-row flex-wrap justify-content-between align-items-center text-center`}>
                    <div className={styles.ImgGroup}>                        
                        {image_1 ? (
                            <>
                                <figure>
                                    <Image className={styles.Image} src={URL.createObjectURL(image_1)} rounded />
                                </figure>
                                <div>
                                    <Form.Label
                                        className={`${btnStyles.Button} ${btnStyles.Blue}`}
                                        htmlFor="image-upload-1"
                                    >
                                        Change the image
                                    </Form.Label>
                                </div>
                            </>
                        ) : (
                            <Form.Label
                                className="d-flex justify-content-center"
                                htmlFor="image-upload-1"
                            >
                                <Asset
                                    src={Upload}
                                    message="Click or tap to upload an image"
                                />
                            </Form.Label>
                        )}
                        <Form.File
                            id="image-upload-1"
                            accept="image/*"
                            onChange={handleChangeImage(1)}
                            ref={imageRefs[0]}
                        />
                        {errors.image_1?.map((message, idx) => (
                            <Alert key={idx} variant="warning">
                                {message}
                            </Alert>
                        ))}
                    </div>
                    
                    <div className={styles.ImgGroup}>
                        {image_2 ? (
                            <>
                                <figure>
                                    <Image className={styles.Image} src={URL.createObjectURL(image_2)} rounded />
                                </figure>
                                <div>
                                    <Form.Label
                                        className={`${btnStyles.Button} ${btnStyles.Blue}`}
                                        htmlFor="image-upload-2"
                                    >
                                        Change the image
                                    </Form.Label>
                                </div>
                            </>
                        ) : (
                            <Form.Label
                                className="d-flex justify-content-center"
                                htmlFor="image-upload-2"
                            >
                                <Asset
                                    src={Upload}
                                    message="Click or tap to upload an image"
                                />
                            </Form.Label>
                        )}
                        <Form.File
                            id="image-upload-2"
                            accept="image/*"
                            onChange={handleChangeImage(2)}
                            ref={imageRefs[1]}
                        />
                        {errors.image_2?.map((message, idx) => (
                            <Alert key={idx} variant="warning">
                                {message}
                            </Alert>
                        ))}
                    </div>
                    
                    <div className={styles.ImgGroup}>
                        {image_3 ? (
                            <>
                                <figure>
                                    <Image className={styles.Image} src={URL.createObjectURL(image_3)} rounded />
                                </figure>
                                <div>
                                    <Form.Label
                                        className={`${btnStyles.Button} ${btnStyles.Blue}`}
                                        htmlFor="image-upload-3"
                                    >
                                        Change the image
                                    </Form.Label>
                                </div>
                            </>
                        ) : (
                            <Form.Label
                                className="d-flex justify-content-center"
                                htmlFor="image-upload-3"
                            >
                                <Asset
                                    src={Upload}
                                    message="Click or tap to upload an image"
                                />
                            </Form.Label>
                        )}
                        <Form.File
                            id="image-upload-3"
                            accept="image/*"
                            onChange={handleChangeImage(3)}
                            ref={imageRefs[2]}
                        />
                        {errors.image_3?.map((message, idx) => (
                            <Alert key={idx} variant="warning">
                                {message}
                            </Alert>
                        ))}
                    </div>
                    
                    <div className={styles.ImgGroup}>
                        {image_4 ? (
                            <>
                                <figure>
                                    <Image className={styles.Image} src={URL.createObjectURL(image_4)} rounded />
                                </figure>
                                <div>
                                    <Form.Label
                                        className={`${btnStyles.Button} ${btnStyles.Blue}`}
                                        htmlFor="image-upload-4"
                                    >
                                        Change the image
                                    </Form.Label>
                                </div>
                            </>
                        ) : (
                            <Form.Label
                                className="d-flex justify-content-center"
                                htmlFor="image-upload-4"
                            >
                                <Asset
                                    src={Upload}
                                    message="Click or tap to upload an image"
                                />
                            </Form.Label>
                        )}
                        <Form.File
                            id="image-upload-4"
                            accept="image/*"
                            onChange={handleChangeImage(4)}
                            ref={imageRefs[3]}
                        />
                        {errors.image_4?.map((message, idx) => (
                            <Alert key={idx} variant="warning">
                                {message}
                            </Alert>
                        ))}
                    </div>                        
                </Form.Group>
                <div>{textFields}</div>
            </Container>
        </Form>
    );
}

export default AdvertCreateForm;
