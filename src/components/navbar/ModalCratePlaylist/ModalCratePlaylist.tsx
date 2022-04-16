import { Dialog, Transition } from '@headlessui/react';
import { resetSelectedSongs } from 'core/redux/spotify';
import { selectorProps } from 'core/redux/store';
import { addToPlaylist, createPlaylist } from 'core/spotify/request';
import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormCreate from './FormCreate';
import SuccessMessage from './SuccessMessage';

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalCratePlaylist = ({ setIsOpen, isOpen }: Props) => {
  const closeModal = () => setIsOpen(false);
  const dispatch = useDispatch();
  const [Title, setTitle] = useState('');
  const [Desccription, setDesccription] = useState('');
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState('');
  const [Success, setSuccess] = useState(false);
  const tracks = useSelector(
    (state: selectorProps) => state.spotify.selectedSongs
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (Title.length < 10) {
      setLoading(false);
      setError('title length of at least 10 characters');
      return;
    }
    return createPlaylist({
      body: {
        name: Title,
        description: Desccription,
      },
    })
      .then((res) =>
        addToPlaylist({
          body: {
            uris: tracks.map((data) => data.uri),
          },
          playlistId: res.data.id,
        })
      )
      .then(() => {
        dispatch(resetSelectedSongs());
        setTitle('');
        setDesccription('');
        setSuccess(true);
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response);
        } else {
          setError(err.message);
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-100 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-dark shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg mb-4 font-medium leading-6 text-gray-300"
              >
                Create Playlist
              </Dialog.Title>
              {Error && (
                <div className="my-3 bg-danger text-gray-200 w-full px-4 py-2 rounded-md">
                  {Error}
                </div>
              )}
              {Success ? (
                <SuccessMessage setIsOpen={setIsOpen} setSuccess={setSuccess} />
              ) : (
                <FormCreate
                  handleSubmit={handleSubmit}
                  setTitle={setTitle}
                  setDesccription={setDesccription}
                  Loading={Loading}
                />
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalCratePlaylist;
