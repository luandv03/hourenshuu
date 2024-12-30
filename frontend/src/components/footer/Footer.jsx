import React from "react";
import "./footer.css";
import {
    AiFillFacebook,
    AiFillTwitterSquare,
    AiFillInstagram,
} from "react-icons/ai";

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <p className="font-bold text-md">HouRenShuu プラットフォーム</p>
                <div className="social-links"></div>
            </div>
        </footer>
    );
};

export default Footer;
