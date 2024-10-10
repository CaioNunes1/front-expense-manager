import React from 'react';
import ThreePoints from './ThreePoints';
interface CardProps {
  title: string;
  onClick?: ()=>void;
  //description: string;
  onClickThreePoints?: ()=>void;

}

const Card: React.FC<CardProps> = ({ title, onClick, onClickThreePoints }) => {


  return (
    <div className='flex'>
      <div className="flex justify-between relative left-5 w-80 h-14 mx-auto shadow-lg rounded-lg p-6" 
        style={{paddingTop:'16px',
        background:'rgba(255,255,255,0.5)'
        ,borderRadius:'2px'}}
        onClick={onClick}
        >
            <h2 className="text-1xl font-bold " style={{color:'black'}}>{title}</h2>
        

      </div>
      <ThreePoints onClick={onClickThreePoints} />
    </div>
  );
};

export default Card;
