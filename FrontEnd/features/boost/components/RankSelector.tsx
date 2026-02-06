import React from 'react';
import { Select } from '@/components/ui/Select';

export const RankSelector = () => {
  return (
    <div>
      <label>Select Your Rank</label>
      <Select>
        <option>Bronze</option>
        <option>Silver</option>
        <option>Gold</option>
      </Select>
    </div>
  );
};
