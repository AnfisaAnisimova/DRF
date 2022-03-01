import React from "react";

const Footer = () => {
    return (
        <footer class="footer mt-auto py-3 bg-light">
            <div class="container">
                <div>
                    <h4>Training project for Django REST course</h4>
                    <hr/>
                </div>
                <div>
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