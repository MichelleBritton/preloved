import React, { useState } from 'react';
import { Link } from "react-router-dom";

import appStyles from "../../App.module.css";
import styles from "../../styles/Advert.module.css";

import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { axiosRes } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

const Advert = (props) => {
    // Destructure the props from advert results, passed from parent component
    const {
        id,
        owner,
        title,
        location,
        price,
        description,
        image_1,
        image_2,
        image_3,
        image_4,
        updated_at,
        like_id,
        setAdverts,
        advertPage,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    // Handle Like functionality
    const handleLike = async () => {
        try {
            const { data } = await axiosRes.post('/likes/', {advert:id});
            setAdverts((prevAdverts) => ({
                ...prevAdverts,
                results: prevAdverts.results.map((advert) => {
                    return advert.id === id
                    ? {...advert, like_id: data.id}
                    : advert;
                }),
            }));
        } catch(err) {
            console.log(err.response?.data || err.message);
        }
    };

    // Handle Unlike functionality
    const handleUnlike = async () => {
        try {
            await axiosRes.delete(`/likes/${like_id}/`);
            setAdverts((prevAdverts) => ({
                ...prevAdverts,
                results: prevAdverts.results.map((advert) => {
                    return advert.id === id
                    ? {...advert, like_id: null}
                    : advert;
                }),
            }));
        } catch(err) {
            console.log(err.response?.data || err.message);
        }
    };

    // Handle main image change
    const [mainImage, setMainImage] = useState(image_1);

    const changeMainImg = (newImage) => {
        setMainImage(newImage);
    };

    return (
        <Card className={styles.Advert}>
            {!advertPage && 
                <Card.Body className={styles.CardBody}>
                    <Link to={`/adverts/${id}`}>
                        <Card.Img src={image_1} alt={title} className={styles.Img} />                
                    </Link>                
                </Card.Body>
            }
            
            <Card.Body>
                {advertPage && 
                    <>
                        <Card.Img src={mainImage} alt={title} className={`${styles.MainImg} ${styles.Img}`} />
                        <div className={`${appStyles.Content} ${styles.Thumbnails} d-flex justify-content-between mb-5`}>
                            <Card.Img src={image_1} alt={title} className={styles.Thumbnail} onClick={() => changeMainImg(image_1)} />
                            <Card.Img src={image_2} alt={title} className={styles.Thumbnail} onClick={() => changeMainImg(image_2)} />
                            <Card.Img src={image_3} alt={title} className={styles.Thumbnail} onClick={() => changeMainImg(image_3)} />
                            <Card.Img src={image_4} alt={title} className={styles.Thumbnail} onClick={() => changeMainImg(image_4)} />
                        </div>
                    </>
                }
                {/* Check if these props have been passed before rendering the components */}
                {title && <Card.Title className={styles.CardTitle}>{title}</Card.Title>}
                {price && <Card.Text className="mb-0">£{price}</Card.Text>}
                {advertPage && description && <Card.Text className='mb-0'>{description}</Card.Text>}
                {location && <Card.Text className="mb-0">{location}</Card.Text>}
                Posted {updated_at}
                
                <div className={styles.PostBar}>
                    {/* Check if current user owns the advert */}
                    {is_owner ? (
                        <OverlayTrigger placement="top" overlay={<Tooltip>You can't like your own advert</Tooltip>}>
                            <i className='far fa-heart mr-auto' />
                        </OverlayTrigger>
                    // Check if a like ID exists, if so the user has already liked a post 
                    ) : like_id ? (
                        <span onClick={handleUnlike}>
                            <i className={`fas fa-heart ${styles.Heart}`} />
                        </span>
                    // Check if user is logged in, if so they can like the advert
                    ) : currentUser ? (
                        <span onClick={handleLike}>
                            <i className='far fa-heart' />
                        </span>
                    // Display the icon for users not logged in
                    ) : (
                        <OverlayTrigger placement="top" overlay={<Tooltip>Login to like adverts</Tooltip>}>
                            <i className='far fa-heart' />
                        </OverlayTrigger>
                    )}
                </div>
            </Card.Body>
        </Card>
    )
};

export default Advert;
