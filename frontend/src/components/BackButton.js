
import React from 'react';
import btnStyles from "../styles/Button.module.css";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

// Back button component to go back to previous page
const BackButton = () => {
    const history = useHistory()
  
    return (
        <Button
            className={`${btnStyles.Button} ${btnStyles.Blue} mb-3`}
            onClick={() => history.goBack()}
        >
            <i className="fa-solid fa-angles-left"></i> <strong>back</strong>
        </Button>
    );
}

export default BackButton;
