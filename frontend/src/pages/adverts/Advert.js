import React from 'react';
import { Link, useHistory } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Media from 'react-bootstrap/Media';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Avatar from '../../components/Avatar';
import styles from "../../styles/Advert.module.css";
import { Tooltip } from 'react-bootstrap';
import { axiosRes } from '../../api/axiosDefaults';
import { MoreDropdown } from '../../components/MoreDropdown';

const Advert = (props) => {
    // Destructure the props from advert results, passed from parent component
    const {
        id,
        owner,
        title,
        description,
        category,
        location,
        price,
        deliver,
        image_1,
        image_2,
        image_3,
        image_4,
        profile_id,
        profile_image,
        updated_at,
        created_at,
        like_id,
        postPage,
        setAdverts,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();

    // Direct to edit advert page
    const handleEdit = () => {
        history.push(`/adverts/${id}/edit`);
    };

    // Handle advert deletion
    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/adverts/${id}/`);
            history.push('/');
        } catch (err) {
            // console.log(err);
        }
    };

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

    return (
        <Card className={styles.Advert}>
            <Card.Body>
                <Media className='align-items-center justify-content-between'>
                    <Link to={`/profiles/${profile_id}`}>
                        <Avatar src={profile_image} height={55} />
                        {owner}
                    </Link>
                    <div className='d-flex align-items-center'>
                        <span>{created_at}</span>
                        {/* Check if the logged in user is the owner and if the PostPage prop exists and show the dropdown menu */}
                        {is_owner && postPage && (
                            <MoreDropdown
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                            />
                        )}
                    </div>
                </Media>
            </Card.Body>
            <Link to={`/adverts/${id}`}>
                <Card.Img src={image_1} alt={title} />                
            </Link>
            <Card.Body>
                <Card.Img src={image_2} alt={title} />
                <Card.Img src={image_3} alt={title} />
                <Card.Img src={image_4} alt={title} />
            </Card.Body>
            <Card.Body>
                {/* Check if these props have been passed before rendering the components */}
                {title && <Card.Title>{title}</Card.Title>}
                {location && <Card.Text>{location}</Card.Text>}
                {price && <Card.Text>{price}</Card.Text>}
                {description && <Card.Text>Description{description}</Card.Text>}
                {deliver && <Card.Text>{deliver}</Card.Text>}
                <div className={styles.PostBar}>
                    {/* Check if current user owns the advert */}
                    {is_owner ? (
                        <OverlayTrigger placement="top" overlay={<Tooltip>You can't like your own advert</Tooltip>}>
                            <i className='far fa-heart' />
                        </OverlayTrigger>
                    // Check if a like ID exists, if so the user has already liked a post 
                    ) : like_id ? (
                        <span onClick={handleUnlike}>
                            <i className={`fas fa-heart ${styles.Heart}`} />
                        </span>
                    // Check if user is logged in, if so they can like the advert
                    ) : currentUser ? (
                        <span onClick={handleLike}>
                            <i className={`far fa-heart ${styles.HeartOutline}`} />
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
