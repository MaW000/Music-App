import React, { useEffect, useState} from 'react'
export const DataContext = React.createContext()

export default function DataProvider(props){
    const [activeCard, setActiveCard] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [url, setUrl] = useState('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
    const [allCards, setAllCards] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [likedCards, setLikedCards] = useState([]);
    const [genre, setGenre] = useState('all')
    //sets error, loading, and fetches data
    useEffect(() => {
        const callFetch = async () => {
            setIsLoading(true);
            try {
              const response = await fetch(url);
              const newResponseJSON = await response.json();
              const albums = newResponseJSON.feed.entry
              const filteredAlbums = albums.map((album, i) => {
                return {
                  id: album.id.attributes['im:id'],
                  i: i,
                  name: album['im:name'].label,
                  artist: album['im:artist'].label,
                  img: album['im:image'][2].label,
                  liked: false,
                  genre: album.category.attributes.term
                }
              })
              setAllCards(filteredAlbums)
              setError(null);
            } catch (newError) {
              setError(newError);
              setAllCards(null);
            }
            setIsLoading(false);
          };
          callFetch();
    }, [url])

    //spreads in all/liked songs into temp arrays 
    //&& push songs liked array 
    //&& set liked field to true on allSongs array
    const likeCard = (card, i) => {
      let temp = [...allCards]
      let temp1 = [...likedCards]
      card.i = i
      temp1.push(card)
      temp[i].liked = true
      setLikedCards(temp1)
      setAllCards(temp) 
    }
   
    //filters temp array by song id
    //sets liked to false
    const unLikeCard = (card, i) => {
      let temp = [...allCards]
      let temp1 = [...likedCards]
      let filter = temp1.filter((cards) => cards.id !== card.id)
      temp[i].liked = false;
      setLikedCards(filter)
      setAllCards(temp)
    }

    //sets the current song && plays it
    const handlePlay = (song) => {
    setIsPlaying(true)
    setActiveCard(song)
    }

    //pauses current song 
    const handlePause = () => {
    setIsPlaying(false)
    }
    
    return(
        <DataContext.Provider
            value={{
                activeCard,
                isPlaying,
                likedCards,
                allCards,
                isLoading,
                error,
                genre,
                likeCard,
                unLikeCard,
                handlePlay,
                handlePause,
                setUrl,
                setGenre,
            }}
        >
        { props.children}
        </DataContext.Provider>
    )
}