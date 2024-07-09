import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import appStyles from "../../App.module.css";
import styles from "../../styles/AdvertsPage.module.css";
import NoResults from "../../assets/no-results.png";

import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { axiosReq } from "../../api/axiosDefaults";
import { fetchMoreData } from "../../utils/utils";
import Advert from "./Advert";
import Asset from "../../components/Asset";
import useSelectOptions from '../../hooks/useSelectOptions';

function AdvertsPage({ message }) {
    const [adverts, setAdverts] = useState({ results: []});
    const [hasLoaded, setHasLoaded] = useState(false);
    // Detect any url change
    const { pathname } = useLocation();
    const [queryKey, setQueryKey] = useState("");
    const [queryCat, setQueryCat] = useState("");
    const [queryLoc, setQueryLoc] = useState("");
    const { categoryOptions, locationOptions } = useSelectOptions();

    useEffect(() => {
        const fetchAdverts = async () => {
            try {
                const { data } = await axiosReq.get(`/adverts/?search=${queryCat}`);
                setAdverts(data);
                setHasLoaded(true);
            } catch(err) {
                //console.log(err);
            }
        }
        setHasLoaded(false);
        
        const timer = setTimeout(() => {
            fetchAdverts();
        }, 1000);
        return () => {
            clearTimeout(timer);
        };

    }, [queryCat, pathname]);
  
    return (
        <>
            <Container fluid className="custom-container d-flex justify-content-between">
                <Row>
                    <Col className={appStyles.ContentDark}>
                        <h2>Search by keyword</h2>
                        <i className={`fas fa-search ${styles.SearchIcon}`} />
                        <Form 
                            className={styles.SearchBar} 
                            onSubmit={(event) => event.preventDefault()}
                        >
                            <Form.Control 
                                value={queryKey} 
                                onChange={(event) => setQueryKey(event.target.value)} 
                                type="text" 
                                className="mr-sm-2" 
                                placeholder="What are you looking for?"
                                aria-label="Search" 
                            />
                        </Form>    
                    </Col>

                    <Col className={appStyles.ContentDark}>
                        <h2>Search by category</h2>
                        <Form 
                            className={styles.SearchBar} 
                            onSubmit={(event) => event.preventDefault()}
                        >
                            <Form.Control
                                as="select"
                                value={queryCat}
                                onChange={(event) => setQueryCat(event.target.value)}
                                name="category"
                                className="mr-sm-2"
                                aria-label="Search category"
                            >
                                <option>Please select</option>
                                {categoryOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form>    
                    </Col>

                    <Col className={appStyles.ContentDark}>
                        <h2>Search by location</h2>
                        <Form 
                            className={styles.SearchBar} 
                            onSubmit={(event) => event.preventDefault()}
                        >
                            <Form.Control
                                as="select"
                                value={queryLoc}
                                onChange={(event) => setQueryLoc(event.target.value)}
                                name="location"
                                className="mr-sm-2" 
                                aria-label="Search location" 
                            >
                                <option>Please select</option>
                                {locationOptions.map(option => (
                                    <option key={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form>    

                    </Col>
                </Row>                
            </Container>

            <Container fluid className={`${appStyles.Content} custom-container`}>
                {hasLoaded ? (
                    <>
                        {adverts.results.length ? (
                            <InfiniteScroll 
                                children={
                                    adverts.results.map((advert) => (   
                                        <Col 
                                            key={advert.id} 
                                            className={styles.Card} 
                                            xs={12} 
                                            md={6} 
                                            xl={4}
                                        >
                                            <Advert {...advert} setAdverts={setAdverts} />
                                        </Col>                                          
                                    ))
                                }
                                dataLength={adverts.results.length}
                                loader={<Asset spinner />}
                                hasMore={!!adverts.next}
                                next={() => {fetchMoreData(adverts, setAdverts)}}    
                                className={"d-flex flex-row flex-wrap justify-content-between"}                            
                            />
                        ) : (
                            <Container className={appStyles.Content}>
                                <Asset src={NoResults} message={message} />
                            </Container>
                        )}
                    </>
                ) : (
                    <Container className={appStyles.Content}>
                        <Asset spinner />
                    </Container>
                )}
            </Container>
        </>
    );
}

export default AdvertsPage;