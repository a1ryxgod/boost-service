import type { Metadata } from 'next';
import '../legal/LegalPage.css';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Please read our terms of service carefully before using our website and services.',
};

export default function TermsOfServicePage() {
  return (
    <div className="legal-page">
      <article className="legal-article">
        <div className="legal-badge">Legal</div>
        <h1>Terms of Service</h1>
        <p className="legal-lead">
          By accessing and using FANCY BOOST, you agree to be bound by these Terms of Service.
          Please read them carefully before using our platform.
        </p>

        <h2>
          <span className="legal-section-num">1.</span>Overview
        </h2>
        <p>
          This website is operated by FANCY BOOST. Throughout the site, the terms &quot;we&quot;,
          &quot;us&quot; and &quot;our&quot; refer to FANCY BOOST. We offer this website, including
          all information, tools, and services available from this site to you, the user,
          conditioned upon your acceptance of all terms, conditions, policies, and notices stated
          here.
        </p>
        <p>
          By visiting our site and/or purchasing something from us, you engage in our
          &quot;Service&quot; and agree to be bound by the following terms and conditions, including
          those additional terms and conditions and policies referenced herein.
        </p>

        <h2>
          <span className="legal-section-num">2.</span>General Conditions
        </h2>
        <p>
          We reserve the right to refuse service to anyone for any reason at any time. You
          understand that your content (not including credit card information) may be transferred
          unencrypted and involve transmissions over various networks and changes to conform and
          adapt to technical requirements of connecting networks or devices.
        </p>
        <p>
          You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the
          Service, use of the Service, or access to the Service without express written permission
          by us.
        </p>

        <h2>
          <span className="legal-section-num">3.</span>Modifications to the Service and Prices
        </h2>
        <p>
          Prices for our services are subject to change without notice. We reserve the right at any
          time to modify or discontinue the Service (or any part or content thereof) without notice.
        </p>
        <p>
          We shall not be liable to you or to any third-party for any modification, price change,
          suspension or discontinuance of the Service.
        </p>

        <h2>
          <span className="legal-section-num">4.</span>User Account
        </h2>
        <p>
          You are responsible for maintaining the confidentiality of your account and password and
          for restricting access to your computer. You agree to accept responsibility for all
          activities that occur under your account or password.
        </p>
        <p>
          We reserve the right to refuse service, terminate accounts, or remove or edit content in
          our sole discretion. You must be at least 18 years old or the legal age of majority in
          your jurisdiction to use our services.
        </p>

        <h2>
          <span className="legal-section-num">5.</span>Refund Policy
        </h2>
        <p>
          All sales are final. Refunds are only issued in specific circumstances at our sole
          discretion. If an order has not been started, you may be eligible for a full refund. Once
          a booster has been assigned and work has begun, no refunds will be issued.
        </p>
        <p>
          In cases where a service cannot be completed due to technical issues on our end, we will
          offer a full or partial refund as appropriate.
        </p>

        <h2>
          <span className="legal-section-num">6.</span>Prohibited Uses
        </h2>
        <p>
          You are prohibited from using the site or its content for any unlawful purpose; to
          solicit others to perform or participate in any unlawful acts; to violate any
          international, federal, provincial or state regulations, rules, laws, or local ordinances;
          to infringe upon or violate our intellectual property rights or the intellectual property
          rights of others; to harass, abuse, insult, harm, defame, slander, disparage, intimidate,
          or discriminate.
        </p>

        <h2>Contact Us</h2>
        <p>
          Questions about the Terms of Service should be sent to us through our{' '}
          <a href="/contact">contact page</a>.
        </p>
      </article>
    </div>
  );
}
