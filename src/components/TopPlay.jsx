/* eslint-disable import/no-unresolved */
import React, { useContext, useEffect, useState,} from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from "../utils/DataProvider";
import { Loader, Error, PlayPause } from '../components'
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiFillHeart } from "react-icons/ai";
//div that shows top 5 cards
const TopChartCard = ({ card, i, activeCard, handlePlay, isPlaying, handlePause }) => (
  <div className={`w-full flex flex-row items-center hover:bg-[#4c426e]  py-2 p-4 rounded-lg cursor-pointer mb-2`}>
    <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <div className='relative group'>
        <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex hover:flex hover:bg-black hover:bg-opacity-70 hidden`}>
        <PlayPause
            card={card}
            activeCard={activeCard}
            handlePlay={handlePlay}
            isPlaying={isPlaying}
            handlePause={handlePause}
          />
        </div>
        <img className="w-20 h-20 rounded-lg" src={card.img} alt={card.name} />
      </div>
      <div className="flex-1 flex flex-col justify-center mx-3">
        <Link to={`/songs/${card.name}`}>
          <p className="text-xl font-bold text-white">
            {card.name.slice(0, 22)}
          </p>
        </Link>
        <Link to={`/artists/${card.artist}`}>
          <p className="text-base text-gray-300 mt-1">
            {card.artist}
          </p>
        </Link>
      </div>
    </div>
  </div>
);
const TopPlay = () => {
  const {
    allCards, isLoading,error, likedCards, unLikeCard, activeCard,
    handlePlay, isPlaying, handlePause
  } = useContext(DataContext)
  const [scrollbar, setScrollbar] = useState(null)
  const [clientWidth, setClientWidth] = useState(null)
  const [divWidth, setDivWidth] = useState(null)
  //everytime a song is liked check if a scroll bar has been added to div
  useEffect(() => {
    const checkScroll = () => {
      const div = document.getElementById('albums')
      var hasHorizontalScrollbar = div.scrollWidth > div.clientWidth;
      if(hasHorizontalScrollbar) {
        setClientWidth(div.clientWidth)
        setDivWidth(div.scrollWidth)
        setScrollbar(0)
      } else {
        setScrollbar(null)
        setClientWidth(div.clientWidth)
        setDivWidth(div.scrollWidth)
      } 
    }
    
    if(likedCards.length > 2) {
      checkScroll()
    } else {
      setScrollbar(null)
    }  
  }, [likedCards])
  //handleClick for left/right buttons
  const scrollButtonMinus = () => {
    document.getElementById('albums').scrollLeft -= 100;
    setScrollbar(document.getElementById('albums').scrollLeft)
  }
  const scrollButtonPlus = () => {
    document.getElementById('albums').scrollLeft += 100;
    setScrollbar(document.getElementById('albums').scrollLeft)
  }
  
  if (isLoading) return <Loader title="Loading songs..." />;
  if (error) return <Error />;
  //top 5 albums right now
  const topPlays = allCards?.slice(0, 5);
  
  return (
    <div className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[400px] max-w-full flex flex-col mt-5">
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((card, i) => (
            <TopChartCard
              i={i}
              card={card}
              key={card.id}
              activeCard={activeCard}
              isPlaying={isPlaying}
              handlePause={handlePause}
              handlePlay={handlePlay}
            />
          ))}
        </div>
      </div>
      <div className="w-full flex relative flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Favorite Albums</h2>
          <Link to="/Favorite-albums">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
         {/* mapped favorite albums */}
        <div id='albums' className='flex relative overflow-x-scroll gap-4 no-scrollbar align-middle'>
          {likedCards && likedCards.map((card) => {
            return (
              <div key={card.id} className='flex group shrink-0 flex flex-col justify-center align-middle mt-2'>
                <div className='relative'>
                  {/* circle /heart icon */}
                  <div className='absolute bg-gray-500 z-10 w-7 h-7 rounded-full top-1 right-1 hidden group-hover:block'>
                    <div className='flex justify-center my-[2px] hover:cursor-pointer'>
                      <AiFillHeart className="w-6 h-6" color='red' onClick={() => unLikeCard(card, card.i)}/>
                    </div>
                  </div>
                  <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex hover:flex hover:bg-black hover:bg-opacity-70 hidden`}>
                      <PlayPause
                        card={card}
                        activeCard={activeCard}
                        handlePlay={handlePlay}
                        isPlaying={isPlaying}
                        handlePause={handlePause}
                      />
                  </div>
                  <img src={card.img} className='w-25 h-25' alt='albumcover' height={100} width={100}/>
                </div>
                <div className='w-25 text-center bg-[#191624] rounded-full mt-2 p-1'>
                  <h1 className='whitespace-normal text-white'>{card.name.slice(0, 12)}</h1>
                </div>
              </div>
            )
          })}
        </div>
        {/* left/right arrow to navigate fav album slider */}
        {scrollbar >= 0 && scrollbar != null && divWidth - clientWidth > scrollbar &&
          <div className='absolute right-2 top-[72px] bg-gray-600 opacity-80 rounded-full hover:opacity-100 hover:cursor-pointer'>
            <AiOutlineArrowRight className='w-10 h-10' color='white'  onClick={scrollButtonPlus}/>
          </div>
        }
        {scrollbar >= 20 &&
          <div className='absolute left-2 top-[72px] bg-gray-600 opacity-80 rounded-full hover:opacity-100 hover:cursor-pointer'>
            <AiOutlineArrowLeft className='w-10 h-10' color='white'  onClick={scrollButtonMinus}/>
          </div>
        }
      </div>
    </div>
  );
};

export default TopPlay;
