import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';

import { Loader, SongCard, Error } from '../components'
import { DataContext } from "../utils/DataProvider";
const Search = () => {
    const {isPlaying, handlePlay, handlePause, allCards, likeCard, activeCard, unLikeCard, isLoading, error } = useContext(DataContext)
    const { searchTerm } = useParams();
    if (isLoading) return <Loader title="Loading songs..." />;
    if (error) return <Error />;

    //join title and artist field and then filters all the songs by which cotain string
    let search = (arr, str) => {
      return arr.filter(function (x) {
        const titleArtist = [Object.values(x)[1], Object.values(x)[2]]
        return titleArtist
        .join(' ')
        .toLowerCase()
        .includes(str.toLowerCase()) 
      })
      
    }

    const res = search(allCards, searchTerm)
    
  return (
    <div className="flex flex-col">
      <h2 className="mt-4 mb-10 text-3xl font-bold text-left text-white">Showing results for <span className="font-black">{searchTerm}</span></h2>
      <div className="flex flex-wrap justify-center gap-8 text- sm:justify-start">
        {res?.map((card, i) => (
          <SongCard
          card={card}
          isPlaying={isPlaying}
          activeCard={activeCard}
          key={card.id}
          i={i}
          likeCard={likeCard}
          unLikeCard={unLikeCard}
          indexToggle={false}
          handlePlay={handlePlay}
          handlePause={handlePause}
          />
        ))}
      </div>
    </div>
  )
}

export default Search