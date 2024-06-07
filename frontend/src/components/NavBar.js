import React from 'react';
import styles from "../styles/NavBar.module.css";
import { Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar 
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
            
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
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

                    <NavLink 
                        className={styles.NavLink}
                        activeClassName={styles.Active}
                        to="/sell"
                    >
                        <i className="fa-solid fa-square-plus"></i> Sell
                    </NavLink>  

                    <NavLink 
                        className={styles.NavLink}
                        activeClassName={styles.Active}
                        to="/signup"
                    >
                        <i className="fas fa-user-plus"></i> Sign Up
                    </NavLink>  

                    <NavLink 
                        className={styles.NavLink}
                        activeClassName={styles.Active}
                        to="/login"
                    >
                        <i className="fas fa-sign-in-alt"></i> Login
                    </NavLink>                  
                </Nav>                
            </Navbar.Collapse>
        </Container>        
    </Navbar>
  )
};

export default NavBar;
