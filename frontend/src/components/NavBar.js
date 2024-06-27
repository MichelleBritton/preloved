import React from 'react';
import styles from "../styles/NavBar.module.css";
import { Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Avatar from "./Avatar";
import { 
    useCurrentUser, useSetCurrentUser 
} from "../contexts/CurrentUserContext";
import axios from "axios";
import { removeTokenTimestamp } from "../utils/utils";
import useClickOutsideToggle from '../hooks/useClickOutsideToggle';

const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const {expanded, setExpanded, ref} = useClickOutsideToggle();

    // Handle log out funcionality
    const handleSignOut = async () => {
        try {
          await axios.post("dj-rest-auth/logout/");
          setCurrentUser(null);
          removeTokenTimestamp();          
        } catch (err) {
          // console.log(err);
        }
    };

    // Sell icon variable to display when users are logged in
    const sellIcon = (
        <NavLink 
            className={styles.NavLink}
            activeClassName={styles.Active}
            to="/sell"
        >
            <i className="fa-solid fa-square-plus"></i> Sell
        </NavLink>  
    )

    // Logged in icons variable to display when users are logged in
    const loggedInIcons = (
        <>
            <NavLink 
                exact
                className={styles.NavLink}
                activeClassName={styles.Active}
                to={`/profiles/${currentUser?.profile_id}`}
            >
                <Avatar 
                    src={currentUser?.profile_image} 
                    text="Profile" 
                    height={40} 
                />
            </NavLink>

            <NavLink      
                className={styles.NavLink}
                to="/" 
                onClick={handleSignOut}
            >
                <i className="fas fa-sign-in-alt"></i>Logout
            </NavLink>
        </>
    );

    // Logged out icons variable to display when users are logged out
    const loggedOutIcons = (
        <>
            <NavLink 
                exact
                className={styles.NavLink}
                activeClassName={styles.Active}
                to="/signup"
            >
                <i className="fas fa-user-plus"></i> Sign Up
            </NavLink>  
            <NavLink 
                exact
                className={styles.NavLink}
                activeClassName={styles.Active}
                to="/login"
            >
                <i className="fas fa-sign-in-alt"></i> Login
            </NavLink>    
        </>
    );


  return (
    <Navbar 
        expanded={expanded}
        className={styles.NavBar} 
        expand="lg"
        fixed="top"
    >
        <Container fluid>
            <NavLink to="/">
                <Navbar.Brand>
                    Preloved Canine Clobber
                </Navbar.Brand>
            </NavLink>
            
            <Navbar.Toggle
                ref={ref}
                onClick={() => setExpanded(!expanded)} 
                aria-controls="basic-navbar-nav" 
            />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto text-left">
                    <NavLink 
                        exact
                        className={styles.NavLink}
                        activeClassName={styles.Active}
                        to="/"
                    >
                        <i className="fa-solid fa-house"></i> Home
                    </NavLink>
                    {currentUser && sellIcon}
                    {currentUser ? loggedInIcons : loggedOutIcons} 
                </Nav>                
            </Navbar.Collapse>
        </Container>        
    </Navbar>
  )
};

export default NavBar;
