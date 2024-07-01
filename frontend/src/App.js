import styles from "./App.module.css";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import NavBar from "./components/NavBar";
import Logo from "./components/Logo";
import SignUpForm from "./pages/auth/SignUpForm";
import LoginForm from "./pages/auth/LoginForm";

function App() {  
  return (
    <div className={styles.App}>
      <NavBar />
      <Container fluid className={`${styles.LogoContainer} mb-4`}>  
        <Logo />
      </Container>
      <Container fluid className={styles.Main}>        
        <Switch>
          <Route exact path="/" render={() => <h1>Home</h1>} />
          <Route exact path="/sell" render={() => <h1>Sell</h1>} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/login" render={() => <LoginForm />} />
          <Route render={()=> <p>Page not found</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
