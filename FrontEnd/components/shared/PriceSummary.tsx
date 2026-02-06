import React from 'react';
import { Button } from '@/components/ui/Button';

const PriceSummary = ({ price }) => {
  return (
    <div>
      <h3>Price Summary</h3>
      <p>Total: ${price}</p>
      <Button>Proceed to Payment</Button>
    </div>
  );
};

export default PriceSummary;
