import React from "react";
import "../../styles/footer.css";

const Footer = () =>
{
    return (
        <footer className="footer">

            <div className="footer-container">

                {/* BRAND */ }
                <div className="footer-brand">
                    <h2>🍔 DOOMUMMY</h2>
                    <p>Kitchen</p>
                    <p className="tagline">
                        Fresh meals delivered fast & hot 🔥
                    </p>
                </div>

                {/* LINKS */ }
                <div className="footer-links">
                    <h4>Quick Links</h4>
                    <a href="/menu">Menu</a>
                    <a href="/cart">Cart</a>
                    <a href="/orders">Orders</a>
                </div>

                {/* CONTACT */ }
                <div className="footer-contact">
                    <h4>Contact</h4>
                    <p>📍 Lagos, Nigeria</p>
                    <p>📞 +234 XXX XXX XXXX</p>
                    <p>📧 support@doomummy.com</p>
                </div>

                {/* SOCIAL */ }
                <div className="footer-social">
                    <h4>Follow Us</h4>
                    <p>Instagram</p>
                    <p >WhatsApp</p>
                    <p>Facebook</p>
                </div>

            </div>

            {/* BOTTOM BAR */ }
            <div className="footer-bottom">
                <p>© { new Date().getFullYear() } DOOMUMMY Kitchen. All rights reserved.</p>
            </div>

        </footer>
    );
};

export default Footer;