import React, { useContext, useEffect, useState } from 'react'

import { Loader, SongCard, Error } from '../components'
import { DataContext } from "../utils/DataProvider";
const TopHundred = () => {
    const {
        isPlaying, allCards, likedSongs, activeCard, setGenre, genre,
        likeCard, isLoading,error, unLikeCard, handlePlay, handlePause
    } = useContext(DataContext)
    const [filter, setFilter] = useState([])
    useEffect(() => {
        if(allCards) {
            const filterd = allCards.filter(((card) => card.genre === genre))
            
            setFilter(filterd)
        }
    }, [allCards, genre])
    if (isLoading) return <Loader title="Loading songs..." />;
    if (error) return <Error />;
    
    const unique = [...new Set(allCards.map(song => song.genre))]
    console.log(allCards, allCards.map(song=> song.genre))
    return (
    <>
        {
        <div className="flex flex-col">
            <div className="flex flex-col items-center justify-between w-full mt-4 mb-10 sm:flex-row">
                <h2 className="text-3xl font-bold text-left text-white">Top 100 </h2>
                <select
                    onChange={(e) => setGenre(e.target.value)}
                    value={genre}
                    className="p-3 mt-5 text-sm text-gray-300 bg-black rounded-lg outline-none sm:mt-0"
                >
                    <option key="all" value="all">All</option>
                    {unique.map((genre) => <option key={genre} value={genre}>{genre}</option>)}
                </select>
            </div>
            <div className="flex flex-wrap justify-center gap-8 sm:justify-start">
                {genre !== 'all' && filter.length > 0 ?
                filter?.map((card, i) => (
                    <SongCard
                        card={card}
                        isPlaying={isPlaying}
                        activeCard={activeCard}
                        key={card.id}
                        likedSongs={likedSongs}
                        i={card.id}
                        likeCard={likeCard}
                        unLikeCard={unLikeCard}
                        indexToggle={false}
                        handlePlay={handlePlay}
                        handlePause={handlePause}
                    />
                ))
                
                : allCards?.map((card, i) => (
                    <SongCard
                        card={card}
                        isPlaying={isPlaying}
                        activeCard={activeCard}
                        key={card.id}
                        likedSongs={likedSongs}
                        i={i}
                        likeCard={likeCard}
                        unLikeCard={unLikeCard}
                        indexToggle={true}
                        handlePlay={handlePlay}
                        handlePause={handlePause}
                    />
                ))}
            </div>
        </div>
        }
    </>
  )
}

export default TopHundred