
import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import Upload from "../../assets/upload.png";
import Asset from "../../components/Asset";
import { axiosReq } from "../../api/axiosDefaults";

import styles from "../../styles/AdvertCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

function AdvertCreateForm() {

    const [errors, setErrors] = useState({});

    const [advertData, setAdvertData] = useState({
        title: "",
        description: "",
        price: "",
        location: "",
        image_1: "",
        image_2: "",
        image_3: "",
        image_4: "",
    });
    
    const {
        title, description, price, location, image_1, image_2, 
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
            const newImageURL = URL.createObjectURL(event.target.files[0]);
    
            // Revoke the old URL if it exists
            if (advertData[`image_${index}`]) {
                URL.revokeObjectURL(advertData[`image_${index}`]);
            }
    
            // Update the state with the new image URL
            setAdvertData({
                ...advertData,
                [`image_${index}`]: newImageURL
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
        formData.append('image_1', imageRefs[0].current.files[0]);
        formData.append('image_2', imageRefs[1].current.files[0]);
        formData.append('image_3', imageRefs[2].current.files[0]);
        formData.append('image_4', imageRefs[3].current.files[0]);
            
        try {
            console.log('Submitting form data:', formData);
            // POST request to create new advert
            const {data} = await axiosReq.post('/adverts/', formData);
            history.push(`/adverts/${data.id}`);
        } catch(err){
            console.error('Error submitting form:', err);
            if (err.response?.status !== 401){
                setErrors(err.response?.data);
            }
        }
    };

    const textFields = (
        <div className="text-center">
            <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
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
                <Form.Label>Description</Form.Label>
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
                <Form.Label>Price</Form.Label>
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
                <Form.Label>Location</Form.Label>
                <Form.Control
                    type="text"
                    name="location"
                    value={location}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors.location?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                    {message}
                </Alert>
            ))} 

        
        
            <Button
                className={`${btnStyles.Button} ${btnStyles.Blue}`}
                onClick={() => history.goBack()}
            >
                cancel
            </Button>
            <Button 
                className={`${btnStyles.Button} ${btnStyles.Blue}`} 
                type="submit"
            >
                create
            </Button>
        </div>
    );

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
                    <Container
                        className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
                    >
                        <Form.Group className="text-center">
                            {image_1 ? (
                                <>
                                    <figure>
                                        <Image className={appStyles.Image} src={image_1} rounded />
                                    </figure>
                                    <div>
                                        <Form.Label
                                            className={`${btnStyles.Button} ${btnStyles.Blue} btn`} 
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

                            {image_2 ? (
                                <>
                                    <figure>
                                        <Image className={appStyles.Image} src={image_2} rounded />
                                    </figure>
                                    <div>
                                        <Form.Label
                                            className={`${btnStyles.Button} ${btnStyles.Blue} btn`} 
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

                            {image_3 ? (
                                <>
                                    <figure>
                                        <Image className={appStyles.Image} src={image_3} rounded />
                                    </figure>
                                    <div>
                                        <Form.Label
                                            className={`${btnStyles.Button} ${btnStyles.Blue} btn`} 
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

                            {image_4 ? (
                                <>
                                    <figure>
                                        <Image className={appStyles.Image} src={image_4} rounded />
                                    </figure>
                                    <div>
                                        <Form.Label
                                            className={`${btnStyles.Button} ${btnStyles.Blue} btn`} 
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

                            
                        </Form.Group>
                        <div className="d-md-none">{textFields}</div>
                    </Container>
                </Col>
                <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
                    <Container className={appStyles.Content}>{textFields}</Container>
                </Col>
         </Row>
        </Form>
     );
}

export default AdvertCreateForm;
