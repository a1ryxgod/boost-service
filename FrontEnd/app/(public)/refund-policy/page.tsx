import type { Metadata } from 'next';
import '../legal/LegalPage.css';

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'Learn about our refund policy for boosting and gaming services.',
};

export default function RefundPolicyPage() {
  return (
    <div className="legal-page">
      <article className="legal-article">
        <div className="legal-badge">Legal</div>
        <h1>Refund Policy</h1>
        <p className="legal-lead">
          We want you to be completely satisfied with our services. Please read our refund policy
          carefully before placing an order.
        </p>

        <h2>
          <span className="legal-section-num">1.</span>Eligibility for Refunds
        </h2>
        <p>
          You may be eligible for a full refund if your order has not yet been assigned to a booster
          and no work has been started. Once a booster has been assigned to your order, refunds are
          issued at our sole discretion.
        </p>
        <p>
          Orders that are in progress (status: In Progress) are not eligible for a refund unless the
          service cannot be completed due to technical issues on our end.
        </p>

        <h2>
          <span className="legal-section-num">2.</span>How to Request a Refund
        </h2>
        <p>
          To request a refund, please cancel your order directly from the Orders page in your
          account dashboard if the order has not been started. For orders already in progress,
          contact our support team through the <a href="/contact">contact page</a> or via the live
          chat, and we will review your case as quickly as possible.
        </p>

        <h2>
          <span className="legal-section-num">3.</span>Processing Time
        </h2>
        <p>
          Approved refunds are processed within 3–7 business days and will be returned to the
          original payment method used at checkout. Processing times may vary depending on your
          bank or payment provider.
        </p>

        <h2>
          <span className="legal-section-num">4.</span>Completed Orders
        </h2>
        <p>
          Completed orders are not eligible for a refund. If you believe there was an error or the
          service was not delivered as described, please contact us within 24 hours of the order
          being marked as completed and we will investigate the issue.
        </p>

        <h2>
          <span className="legal-section-num">5.</span>Chargebacks
        </h2>
        <p>
          Initiating a chargeback without first contacting us will result in your account being
          permanently banned. We encourage you to reach out to our support team before contacting
          your bank, as we are happy to resolve any issues directly.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about our refund policy, please reach out through our{' '}
          <a href="/contact">contact page</a> or live chat. We typically respond within a few hours.
        </p>
      </article>
    </div>
  );
}
