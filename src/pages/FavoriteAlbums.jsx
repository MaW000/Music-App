import React, { useContext } from 'react'

import { Loader, SongCard, Error } from '../components'
import { DataContext } from "../utils/DataProvider";
const FavoriteAlbums = () => {
    const {isPlaying, handlePlay, setGenre, genre, allCards, likedCards, activeCard, handlePause, isLoading, error, likeCard, unLikeCard } = useContext(DataContext)
    if (isLoading) return <Loader title="Loading songs..." />;
    if (error) return <Error />;
    //filters out all unique genres from the albums
    const unique = [...new Set(allCards.map(song => song.genre))]
    
  return (
    <>
        <div className="flex flex-col">
            <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
                <h2 className="font-bold text-3xl text-white text-left">Favorite Albums</h2>
                <select
                    onChange={(e) => setGenre(e.target.value)}
                    value={genre}
                    className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
                >
                    <option key="all" value="all">All</option>
                    {unique.map((genre) => <option key={genre} value={genre}>{genre}</option>)}
                </select>
            </div>
            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {likedCards?.map((card) => (
                    <SongCard
                    card={card}
                    isPlaying={isPlaying}
                    activeCard={activeCard}
                    key={card.id}
                    i={card.i}
                    likeCard={likeCard}
                    unLikeCard={unLikeCard}
                    indexToggle={false}
                    handlePlay={handlePlay}
                    handlePause={handlePause}
                    />
                ))}
            </div>
        </div>
    </>
  )
}

export default FavoriteAlbums