import { Route } from "react-router-dom";
// import Song from "../Songs/Song";
// import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";
import logo from "../../assets/mushroom2.png";
// import splash2 from "../assets/images/splash2.jpg";
import "./SplashPage.css";

function SplashPage({ user }) {
  return (
    <>
      {!user && (
        <div className="splash-container">
          <div className="splash-content">
            <div className="splash-picture-container">
              <div className="top-left">
                <img id="logo" alt="logo" src={logo} />
              </div>

              <div className="top-right">
                {/* <Route exact path="/">
                  <LoginFormModal />
                  <SignupFormModal />
                </Route> */}
              </div>

              <div className="center">
                <h1>Welcome to Cloud 9</h1>
                <h3>Join the community and start sharing your music today.</h3>
                <h5>For Artists, by Artists</h5>
              </div>
            </div>{" "}
            <br />
          </div>
        </div>
      )}
    </>
  );
}

export default SplashPage;