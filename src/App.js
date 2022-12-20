import { Route, Routes } from 'react-router-dom';
import { Sidebar, Searchbar, TopPlay } from './components';
import { TopHundred, FavoriteAlbums,Search } from './pages';

const App = () => {
  return (
    <div className="relative flex">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#301008]">
        <Searchbar />
        <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll no-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 pb-40 h-fit">
            <Routes>
              <Route path="/" element={<TopHundred />} />
              <Route path="/Favorite-albums" element={<FavoriteAlbums />} />
              <Route path="/top-charts" element={<TopHundred />} />
              <Route path="/albums" element={<TopHundred />} />
              <Route path="/artists/:id" element={<TopHundred />} />
              <Route path="/songs/:songid" element={<TopHundred />} />
              <Route path="/search/:searchTerm" element={<Search />} />
            </Routes>
          </div>
          <div className="relative top-0 xl:sticky h-fit">
            <TopPlay />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

