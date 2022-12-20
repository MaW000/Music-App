import React from 'react';
import PlayPause from './PlayPause';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
const SongCard = ({ card, unLikeCard, likeCard, i, isPlaying, handlePlay, activeCard, indexToggle, handlePause }) => {
  
  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex hover:flex hover:bg-black hover:bg-opacity-70 hidden`}>
          <PlayPause
            card={card}
            activeCard={activeCard}
            handlePlay={handlePlay}
            isPlaying={isPlaying}
            handlePause={handlePause}
          />
        </div>
        <img alt="song_img" src={card.img} height={250} width={250} className="w-full h-full rounded-lg" />
        {
        indexToggle &&
        <div className='absolute bottom-2 left-3 bg-gray-500 w-7 h-7 rounded-full'>
          <h1 className=' font-bold text-lg text-center'>{i+1}</h1>
        </div>
        }
        <div className='absolute bottom-2 right-3 bg-gray-500 w-7 h-7 rounded-full'>
          <div className='flex justify-center my-[2px]'>
            {card.liked === undefined || card.liked === false ? 
            <AiOutlineHeart className="w-6 h-6" color='white' onClick={() => likeCard(card, card.i)}/> :
            <AiFillHeart className="w-6 h-6" color='red' onClick={() => unLikeCard(card, card.i)}/> }
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          {card.name}
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          {card.artist}
        </p>
      </div>
    </div>
  );
};

export default SongCard;