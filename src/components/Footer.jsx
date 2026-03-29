import React from "react";
import { FaInstagramSquare } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";

/** Replace with the client's real Instagram profile URL. */
const INSTAGRAM_URL = "https://www.instagram.com/";

/** Dummy number — replace with the client's real number. */
const CONTACT_DISPLAY = "(555) 123-4567";
const CONTACT_TEL = "+15551234567";

const Footer = () => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-inner">
        <p className="footer-copy">&copy; {new Date().getFullYear()} BMB. All rights reserved.</p>

        <div className="footer-actions">
          <a
            className="footer-icon-link"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit our Instagram"
          >
            <FaInstagramSquare className="footer-icon" aria-hidden />
          </a>

          <a
            className="footer-phone-link"
            href={`tel:${CONTACT_TEL}`}
            aria-label={`Call us at ${CONTACT_DISPLAY}`}
          >
            <BsFillTelephoneFill className="footer-icon" aria-hidden />
            <span className="footer-phone-number">{CONTACT_DISPLAY}</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
