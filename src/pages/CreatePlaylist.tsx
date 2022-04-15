import Lottie from 'components/lottie';
import { sadFace } from 'components/lottie/animations';
import TrackItem from 'components/TrackItem';
import useTrackSearch from 'core/hooks/useTrackSearch';
import { updateSelectedSongFromLocalStorage } from 'core/redux/spotify';
import DashboardLayout from 'layouts/Dashboard';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { ImSpinner8 } from 'react-icons/im';
import { useDispatch } from 'react-redux';

const CreatePlaylist = () => {
  const dispatch = useDispatch();
  const [Keyword, setKeyword] = useState<string | null>('');
  const [Offset, setOffset] = useState(0);
  const [Tracks, HasMore, LoadingTrack, Error] = useTrackSearch(
    Keyword,
    Offset
  );

  const Observer = useRef<any>(null);

  const LastTrackRef = useCallback(
    (node: any) => {
      if (LoadingTrack) return;
      if (Observer.current) Observer.current.disconnect();
      Observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && HasMore) {
          setOffset((prev) => prev + 20);
        }
      });
      if (node) Observer.current.observe(node);
    },
    [HasMore, LoadingTrack]
  );

  useEffect(() => {
    dispatch(updateSelectedSongFromLocalStorage());
  }, [dispatch]);

  const setKeywordWithDebounce = useRef(
    debounce((keyword: string | null) => {
      setKeyword(keyword);
      setOffset(0);
    }, 500)
  ).current;

  useEffect(() => setKeywordWithDebounce.cancel(), [setKeywordWithDebounce]);

  const handleChnageKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) setKeywordWithDebounce(e.target.value);
    else setKeywordWithDebounce(null);
  };

  return (
    <DashboardLayout>
      <>
        <div className="pt-2 relative mx-auto text-gray-600">
          <input
            className="border-2 border-gray-300 bg-white w-full px-5 pr-16 rounded-lg text-sm focus:outline-none"
            type="search"
            name="search"
            placeholder="Search"
            onChange={handleChnageKeyword}
          />
          <button type="button" className="absolute right-0 top-0 mt-5 mr-4">
            <BsSearch />
          </button>
        </div>
        <div>{Error && <div className="w-full">{Error}</div>}</div>
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-10">
          {Tracks.map((track, index, array) =>
            index === array.length - 1 ? (
              <div key={track.uri} ref={LastTrackRef}>
                <TrackItem track={track} />
              </div>
            ) : (
              <div key={track.uri}>
                <TrackItem track={track} />
              </div>
            )
          )}
        </div>
        <div>
          {LoadingTrack && Keyword && (
            <div className="flex-cc">
              <ImSpinner8 className="animate-spin w-10 h-10 text-white" />{' '}
            </div>
          )}
        </div>
        <div>
          {!LoadingTrack && Keyword && Tracks.length < 1 && (
            <div className="w-full flex-cc flex-col">
              <Lottie className="w-72" animation={sadFace} />
              <h3 className="text-white font-semibold  text-2xl">Not Found</h3>
            </div>
          )}
        </div>
      </>
    </DashboardLayout>
  );
};

export default CreatePlaylist;
