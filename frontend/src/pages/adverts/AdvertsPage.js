import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import appStyles from "../../App.module.css";
import styles from "../../styles/AdvertsPage.module.css";
import NoResults from "../../assets/no-results.png";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Advert from "./Advert";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";

function AdvertsPage({ message }) {
    const [adverts, setAdverts] = useState({ results: []});
    const [hasLoaded, setHasLoaded] = useState(false);
    // Detect any url change
    const { pathname } = useLocation();
    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchAdverts = async () => {
            try {
                const { data } = await axiosReq.get(`/adverts/?search=${query}`);
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

    }, [query, pathname]);
  
  return (
    <Container>
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form 
            className={styles.SearchBar} 
            onSubmit={(event) => event.preventDefault()}
        >
            <Form.Control 
                value={query} 
                onChange={(event) => setQuery(event.target.value)} 
                type="text" 
                className="mr-sm-2" 
                placeholder="Search Adverts"
                aria-label="Search" 
            />
        </Form>    

        {hasLoaded ? (
            <>
                {adverts.results.length ? (
                    <InfiniteScroll 
                        children={
                            adverts.results.map((advert) => (                                  
                                <Advert {...advert} setAdverts={setAdverts} />                                                   
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
  );
}

export default AdvertsPage;