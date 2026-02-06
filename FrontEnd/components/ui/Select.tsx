import React from 'react';

export const Select = ({ children, ...props }) => {
  return (
    <select {...props}>
      {children}
    </select>
  );
};
