import Link from 'next/link';
import Image from 'next/image';
import { DiscordIcon, TwitterIcon, InstagramIcon, YoutubeIcon } from './SocialIcons';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__grid">
          {/* Brand Section */}
          <div className="footer__brand">
            <h2 className="footer__logo">FANCY BOOST</h2>
            <p className="footer__description">
              Professional gaming services for CS2, Dota 2, Valorant, and League of Legends.
              Fast, secure, and reliable boosting by top-tier players.
            </p>
            <div className="footer__social">
              <a
                href="https://discord.gg/yourserver"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="Discord"
              >
                <DiscordIcon />
              </a>
              <a
                href="https://twitter.com/yourhandle"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="Twitter"
              >
                <TwitterIcon />
              </a>
              <a
                href="https://instagram.com/yourhandle"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://youtube.com/@yourchannel"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="YouTube"
              >
                <YoutubeIcon />
              </a>
            </div>
          </div>

          {/* Games Section */}
          <div className="footer__section">
            <h3 className="footer__section-title">Games</h3>
            <nav className="footer__games">
              <Link href="/games/cs2" className="footer__game-link">
                <span className="footer__game-icon-wrapper">
                  <Image
                    src="/images/cs2icon.jpg"
                    alt="CS2"
                    width={20}
                    height={20}
                    className="footer__game-icon-img"
                  />
                </span>
                Counter-Strike 2
              </Link>
              <Link href="/games/dota2" className="footer__game-link">
                <span className="footer__game-icon-wrapper">
                  <Image
                    src="/images/dota2icon.png"
                    alt="Dota 2"
                    width={20}
                    height={20}
                    className="footer__game-icon-img"
                  />
                </span>
                Dota 2
              </Link>
              <Link href="/games/valorant" className="footer__game-link">
                <span className="footer__game-icon-wrapper">
                  <Image
                    src="/images/valoranticon.png"
                    alt="Valorant"
                    width={20}
                    height={20}
                    className="footer__game-icon-img"
                  />
                </span>
                Valorant
              </Link>
              <Link href="/games/lol" className="footer__game-link">
                <span className="footer__game-icon-wrapper">
                  <Image
                    src="/images/League_of_Legends_icon.png"
                    alt="League of Legends"
                    width={20}
                    height={20}
                    className="footer__game-icon-img"
                  />
                </span>
                League of Legends
              </Link>
            </nav>
          </div>

          {/* Quick Links Section */}
          <div className="footer__section">
            <h3 className="footer__section-title">Quick Links</h3>
            <nav className="footer__nav">
              <Link href="/games/cs2/accounts" className="footer__nav-link">
                CS2 Accounts
              </Link>
              <Link href="/games/dota2/accounts" className="footer__nav-link">
                Dota 2 Accounts
              </Link>
              <Link href="/games/cs2/boost/faceit" className="footer__nav-link">
                CS2 FACEIT Boost
              </Link>
              <Link href="/games/dota2/boost/rank" className="footer__nav-link">
                Dota 2 MMR Boost
              </Link>
              <Link href="/games/cs2/coaching" className="footer__nav-link">
                Coaching
              </Link>
            </nav>
          </div>

          {/* Company Section */}
          <div className="footer__section">
            <h3 className="footer__section-title">Company</h3>
            <nav className="footer__nav">
              <Link href="/about" className="footer__nav-link">
                About Us
              </Link>
              <Link href="/how-it-works" className="footer__nav-link">
                How It Works
              </Link>
              <Link href="/faq" className="footer__nav-link">
                FAQ
              </Link>
              <Link href="/contact" className="footer__nav-link">
                Contact
              </Link>
              <Link href="/reviews" className="footer__nav-link">
                Reviews
              </Link>
            </nav>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="footer__trust">
          <div className="footer__trust-badge">
            <span className="footer__trust-icon">🔒</span>
            <span>Secure Payment</span>
          </div>
          <div className="footer__trust-badge">
            <span className="footer__trust-icon">✓</span>
            <span>100% Safe</span>
          </div>
          <div className="footer__trust-badge">
            <span className="footer__trust-icon">⚡</span>
            <span>Fast Delivery</span>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; 2024 FANCY BOOST. All rights reserved.
          </p>
          <nav className="footer__bottom-links">
            <Link href="/privacy-policy" className="footer__bottom-link">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="footer__bottom-link">
              Terms of Service
            </Link>
            <Link href="/refund-policy" className="footer__bottom-link">
              Refund Policy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};
