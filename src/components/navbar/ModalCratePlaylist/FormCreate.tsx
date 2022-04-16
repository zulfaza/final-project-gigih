import React from 'react';
type Props = {
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDesccription: React.Dispatch<React.SetStateAction<string>>;
  Loading: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  btnLabel?: string;
  defaultValueTitle?: string;
  defaultValueDescription?: string;
};

const FormCreate = ({
  handleSubmit,
  setTitle,
  setDesccription,
  Loading,
  btnLabel = 'Create',
  defaultValueTitle = '',
  defaultValueDescription = '',
}: Props) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col mb-3">
        <label className="text-gray-300 mb-2" htmlFor="title">
          Title
        </label>
        <input
          defaultValue={defaultValueTitle}
          className=" bg-transparent text-white border focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent "
          type="text"
          name="title"
          id="title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col mb-3">
        <label className="text-gray-300 mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          defaultValue={defaultValueDescription}
          rows={7}
          className=" bg-transparent text-white border focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent "
          name="description"
          id="description"
          onChange={(e) => setDesccription(e.target.value)}
        />
      </div>
      <button
        disabled={Loading}
        className="bg-accent disabled:opacity-75 px-2 py-2 rounded-md font-semibold w-full"
      >
        {btnLabel}
      </button>
    </form>
  );
};

export default FormCreate;
