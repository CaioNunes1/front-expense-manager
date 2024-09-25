import React from 'react';

interface CardProps {
  title: string;
  //description: string;
}

const Card: React.FC<CardProps> = ({ title }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-1xl font-bold " style={{color:'black'}}>{title}</h2>
      {/*<p className="text-gray-700">{}</p>*/}
    </div>
  );
};

export default Card;
