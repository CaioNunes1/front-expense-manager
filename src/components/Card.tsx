import React from 'react';

interface CardProps {
  title: string;
  //description: string;
}

const Card: React.FC<CardProps> = ({ title }) => {
  return (
    <div className="flex justify-center w-80 h-14 mx-auto shadow-lg rounded-lg p-6" 
      style={{paddingTop:'16px',
      background:'rgba(255,255,255,0.5)'
      ,borderRadius:'2px'}}>
      <h2 className="text-1xl font-bold " style={{color:'black'}}>{title}</h2>
      {/*<p className="text-gray-700">{}</p>*/}
    </div>
  );
};

export default Card;
