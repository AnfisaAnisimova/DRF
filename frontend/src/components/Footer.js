import React from "react";

const Footer = () => {
    return (
        <footer>
            <div className="footer">
                <div className="container">
                    <h3 className="heading footer__heading">Training project for Django REST course</h3>
                    <hr/>
                </div>
                <div className="container">
                    <div className="footer__bottom">
                        <ul className="footer__info">
                            <li className="footer__list">+79533521634</li>
                            <li className="footer__list">anfisochka900@gmail.com</li>
                        </ul>
                        <div className="footer__copy">
                            <p className="text footer__copy-text">2021 © All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;