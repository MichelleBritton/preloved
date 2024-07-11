import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Asset from "../../components/Asset";
import { axiosReq } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";

function ProfilePage(props) {
    const {imageSize=80} = props;
    const [hasLoaded, setHasLoaded] = useState(false);
    const currentUser = useCurrentUser();
    // To know which profile to fetch, extract the id from the URL
    const {id} = useParams();
    const [profile, setProfile] = useState(null);
    
  
    // GET request to retrieve profile by id
    useEffect(() => {
        const fetchData = async () => {
            try {                
                const [{data: pageProfile}] = await Promise.all([
                    axiosReq.get(`/profiles/${id}/`)
                ]);
                setProfile(pageProfile);             
                setHasLoaded(true);
                console.log(pageProfile);
            } catch(err) {
                // console.log(err);
            }
        };
        fetchData();
    }, [id]);
  
    const mainProfile = (
        <>
            <Row>
                <Col>
                    <Avatar src={profile?.image} height={imageSize} />
                    <h2>{profile?.owner}'s Profile</h2> 
                    
                    <p>first name: {currentUser.first_name}</p>   
                    <p>last name: {currentUser.last_name}</p>   

                    <p>Username: {currentUser.username}</p>   
                    <p>Password: <sub>********</sub></p>             
                </Col>                
            </Row>
            <Row>
                <Col className="p-3">
                    Profile content
                </Col>
            </Row>
        </>
    );
  
    const mainProfilePosts = (
        <>
            <hr />
            <p className="text-center">Profile owner's posts</p>
            <hr />
        </>
    );
  
    return (
        <Row>
            <Col className="py-2 p-0 p-lg-2">
                <Container className={appStyles.Content}>
                    {hasLoaded ? (
                    <>
                        {mainProfile}
                        {mainProfilePosts}
                    </>
                    ) : (
                        <Asset spinner />
                    )}
                </Container>
            </Col>
        </Row>
    );
  }
  
  export default ProfilePage;