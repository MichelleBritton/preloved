import React from 'react';
import styles from "../styles/NavBar.module.css";
import { Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Nav } from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar 
        className={styles.NavBar} 
        expand="lg"
        fixed="top"
    >
        <Container fluid>
            <Navbar.Brand>
                Preloved Canine Clobber
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto text-left">
                    <Nav.Link>
                        <i class="fa-solid fa-house"></i> Home
                    </Nav.Link>
                    <Nav.Link>
                        <i class="fa-solid fa-square-plus"></i> Sell
                    </Nav.Link>  
                    <Nav.Link>
                        <i className="fas fa-user-plus"></i> Sign Up
                    </Nav.Link>  
                    <Nav.Link>
                        <i className="fas fa-sign-in-alt"></i> Login
                    </Nav.Link>                  
                </Nav>                
            </Navbar.Collapse>
        </Container>        
    </Navbar>
  )
};

export default NavBar;
