import React, { useContext } from "react";
import DarkContext from "./../../context/darkMode";

const Footer = () => {
  const darkContext = useContext(DarkContext);
  return (
    <footer
      className={
        darkContext.darkMode
          ? "text-center text-lg-start bg-dark text-muted dark-page-shadow footer-dark"
          : "text-center text-lg-start bg-light text-muted"
      }
    >
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>
        <div>
          
          <a target='_blank' href="https://twitter.com/beefykenny" className="me-4 text-reset">
            <i className="fab fa-twitter"></i>
          </a>
          <a target='_blank' href="https://www.instagram.com/beefykenny/" className="me-4 text-reset">
            <i className="fab fa-instagram"></i>
          </a>
          <a target='_blank' href="https://www.linkedin.com/in/beefy-kenny-1404051a9/" className="me-4 text-reset">
            <i className="fab fa-linkedin"></i>
          </a>
          <a target='_blank' href="https://github.com/Beefy-py" className="me-4 text-reset">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </section>

      <section className="">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="fas fa-gem me-3"></i>Company name
              </h6>
              <p>
              This website was created by Kenny Hoft.
              Meant to sharpen his skills in React+Django 
              Enjoy! kinda 🤣
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Recources</h6>

              <p>
                <a target='_blank' href="https://reactjs.org/" className="text-reset">
                  React
                </a>
              </p>
              <p>
                <a target='_blank' href="https://jwt.io/" className="text-reset">
                  JWT
                </a>
              </p>
              <p>
                <a target='_blank' href="https://www.djangoproject.com/" className="text-reset">
                  Django
                </a>
              </p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
              <p>
                <a target='_blank' href="#" className="text-reset">
                  Pricing
                </a>
              </p>
              <p>
                <a target='_blank' href="#" className="text-reset">
                  Settings
                </a>
              </p>
              <p>
                <a target='_blank' href="#" className="text-reset">
                  Orders
                </a>
              </p>
              <p>
                <a target='_blank' href="#" className="text-reset">
                  Help
                </a>
              </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <i className="fas fa-envelope me-3"></i>
                hoftkenny@gmail.com
              </p>
              <p>
                <i className="fas fa-phone me-3"></i> +597 853-4188
              </p>
              {/* <p>
                <i className="fas fa-print me-3"></i> + 01 234 567 89
              </p> */}
            </div>
          </div>
        </div>
      </section>

      <div className="text-center p-4">
        © 2021 - {new Date().getFullYear()} Copyright:{' '}
        <a target='_blank' className="text-reset fw-bold" href="#">
          beefykenny/KennyHoft
        </a>
      </div>
    </footer>
  );
};

export default Footer;
