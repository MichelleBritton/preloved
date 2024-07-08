import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";

import appStyles from "../../App.module.css";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { axiosReq } from "../../api/axiosDefaults";
import { axiosRes } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Advert from "./Advert";
import Avatar from "../../components/Avatar";
import Asset from "../../components/Asset";
import { MoreDropdown } from '../../components/MoreDropdown';

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

    const advertData = advert.results[0];

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === advertData?.owner;
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

    if (!advertData) {
        return (
            <Container className={appStyles.Content}>
                <Asset spinner />
            </Container>
        );
    }

    return (
        <Container fluid className={`${appStyles.Content} custom-container`}>
            <Row>
                <Col>
                    {/* SetAdverts for likes functionality */}
                    <Advert {...advert.results[0]} setAdverts={setAdvert} advertPage />
                </Col>
                <Col>
                    <Link to={`/profiles/${advertData.profile_id}`}>
                        <Avatar src={advertData.profile_image} height={55} />
                        {advertData.owner}
                    </Link>
                    <div className='d-flex align-items-center'>
                        {/* Check if the logged in user is the owner and show the dropdown menu */}
                        {is_owner && (
                            <MoreDropdown
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                            />
                        )}
                    </div>
                </Col>
            </Row>
        </Container>        
    );
}

export default AdvertPage;