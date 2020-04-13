import React from 'react';

export const Icon = ({ icon, customClass }) => (
  // eslint-disable-next-line react/no-danger
  <span className={`icon ${customClass || ''}`} dangerouslySetInnerHTML={{ __html: icon }} />
);

export default Icon;
