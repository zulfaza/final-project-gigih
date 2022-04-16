import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import classNames from 'utils/classNames';

type Props = {
  href: string;
  label: string;
  icon: JSX.Element;
};

const SideLink = ({ href, label, icon }: Props) => {
  const resolved = useResolvedPath(href);
  const match = useMatch({ path: resolved.pathname, end: true });
  return (
    <li className="mb-2">
      <Link
        to={href}
        className="relative group flex py-3 px-2 flex-row items-center focus:outline-none hover:bg-dark-600 text-gray-400 hover:text-gray-300 border-l-4 border-transparent hover:border-accent pr-6"
      >
        <span
          className={classNames(
            match ? ' bg-accent text-dark-800' : 'bg-dark-600',
            'inline-flex justify-center p-2 group-hover:bg-accent group-hover:text-dark-800 transition-colors rounded-md items-center ml-1 mr-2'
          )}
        >
          {icon}
        </span>
        <span
          className={classNames(match ? '' : '', 'ml-2 tracking-wide truncate')}
        >
          {label}
        </span>
      </Link>
    </li>
  );
};

export default SideLink;
