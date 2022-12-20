import React from 'react';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';
//JSX element that displays play/pause icons
const PlayPause = ({ card, activeCard, handlePlay, isPlaying, handlePause }) => {
  return (isPlaying && activeCard.name === card.name ? (
  <FaPauseCircle
    size={35}
    className="text-gray-300"
    onClick={() => handlePause()}
  />
) : (
  <FaPlayCircle
    size={35}
    className="text-gray-300"
    onClick={() => handlePlay(card)}
  />
))};

export default PlayPause;
