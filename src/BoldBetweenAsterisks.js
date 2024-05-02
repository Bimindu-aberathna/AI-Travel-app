import React from 'react';
import { Text } from 'react-native';

const BoldBetweenAsterisks = ({ text }) => {
  const parts = text.split(/\*\*(.*?)\*\*/g); // Split text by ** and capture the content between them
  
  return (
    <>
      {parts.map((part, index) => {
        if (index % 2 === 0) {
          // Regular text
          return <Text key={index}>{part}</Text>;
        } else {
          // Bold text
          return <Text key={index} style={{ fontWeight: 'bold' }}>{part}</Text>;
        }
      })}
    </>
  );
};

export default BoldBetweenAsterisks;
