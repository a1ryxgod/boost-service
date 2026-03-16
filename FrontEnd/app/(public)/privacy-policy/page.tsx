import type { Metadata } from 'next';
import '../legal/LegalPage.css';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read our privacy policy to understand how we collect, use, and protect your data.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="legal-page">
      <article className="legal-article">
        <div className="legal-badge">Legal</div>
        <h1>Privacy Policy</h1>
        <p className="legal-lead">
          This Privacy Policy describes how your personal information is collected, used, and shared
          when you visit or make a purchase from our website (the &quot;Site&quot;).
        </p>

        <h2>Personal Information We Collect</h2>
        <p>
          When you visit the Site, we automatically collect certain information about your device,
          including information about your web browser, IP address, time zone, and some of the
          cookies that are installed on your device.
        </p>
        <p>
          Additionally, when you make a purchase or attempt to make a purchase through the Site, we
          collect certain information from you, including your name, billing address, email address,
          and payment information. We refer to this information as &quot;Order Information.&quot;
        </p>

        <h2>How Do We Use Your Personal Information?</h2>
        <p>
          We use the Order Information that we collect generally to fulfill any orders placed through
          the Site (including processing your payment information, providing you with invoices and/or
          order confirmations, communicating with you, and screening our orders for potential risk or
          fraud).
        </p>
        <p>
          We also use the Device Information we collect to help us screen for potential risk and
          fraud, and more generally to improve and optimize our Site (for example, by generating
          analytics about how our customers browse and interact with the Site).
        </p>

        <h2>Sharing Your Personal Information</h2>
        <p>
          We share your Personal Information with third parties to help us use your Personal
          Information, as described above. For example, we use a payment processor to handle
          transactions and an analytics provider to understand user behavior. We also may share your
          Personal Information to comply with applicable laws and regulations, to respond to a
          subpoena, search warrant or other lawful request for information we receive, or to
          otherwise protect our rights.
        </p>

        <h2>Your Rights</h2>
        <p>
          If you are a European resident, you have the right to access personal information we hold
          about you and to ask that your personal information be corrected, updated, or deleted. If
          you would like to exercise this right, please contact us through the contact information
          below.
        </p>
        <p>
          Additionally, if you are a European resident we note that we are processing your
          information in order to fulfill contracts we might have with you (for example if you make
          an order through the Site), or otherwise to pursue our legitimate business interests listed
          above.
        </p>

        <h2>Data Retention</h2>
        <p>
          When you place an order through the Site, we will maintain your Order Information for our
          records unless and until you ask us to delete this information.
        </p>

        <h2>Changes</h2>
        <p>
          We may update this privacy policy from time to time in order to reflect, for example,
          changes to our practices or for other operational, legal or regulatory reasons. We
          encourage you to review this Privacy Policy periodically for any changes.
        </p>

        <h2>Contact Us</h2>
        <p>
          For more information about our privacy practices, if you have questions, or if you would
          like to make a complaint, please contact us by e-mail or through our{' '}
          <a href="/contact">contact page</a>.
        </p>
      </article>
    </div>
  );
}
