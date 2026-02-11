interface PriceSummaryProps {
  price?: number;
  serviceName?: string;
  options?: Array<{ label: string; value: string }>;
}

const PriceSummary = ({
  price = 99.99,
  serviceName = 'Boost Service',
  options = []
}: PriceSummaryProps) => {
  return (
    <div className="service__summary-card">
      <h3 className="service__summary-title">Order Summary</h3>

      <div className="service__summary-items">
        <div className="service__summary-item">
          <span className="service__summary-item-label">Service</span>
          <span className="service__summary-item-value">{serviceName}</span>
        </div>
        {options.map((option, index) => (
          <div key={index} className="service__summary-item">
            <span className="service__summary-item-label">{option.label}</span>
            <span className="service__summary-item-value">{option.value}</span>
          </div>
        ))}
      </div>

      <div className="service__summary-total">
        <span className="service__summary-total-label">Total</span>
        <span className="service__summary-total-value">${price.toFixed(2)}</span>
      </div>

      <button className="service__summary-button">
        Proceed to Checkout
      </button>
    </div>
  );
};

export default PriceSummary;
