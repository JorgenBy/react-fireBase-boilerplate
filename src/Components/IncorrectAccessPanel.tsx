import React from 'react';

interface Props {
  message: string;
}

const IncorrectAccessPanel: React.FC<Props> = ({ message }) => {
  return <div>{message}</div>;
};

export default IncorrectAccessPanel;
