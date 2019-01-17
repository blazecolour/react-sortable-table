import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import uniqId from '../../utils/uniqId';

export default function Pagination(props) {
  const { pages, activePage, handlePageClick } = props;

  const items = [...Array(pages).keys()].map(item => {
    const numPage = (item += 1);

    const liClass = cn({
      'page-item': true,
      active: numPage === activePage
    });

    return (
      <li className={liClass} key={uniqId()}>
        <button className="page-link" onClick={handlePageClick(numPage)}>
          {numPage}
        </button>
      </li>
    );
  });

  return <ul className="pagination mx-auto">{items}</ul>;
}

Pagination.propTypes = {
  handlePageClick: PropTypes.func.isRequired,
  pages: PropTypes.number,
  activePage: PropTypes.number
};
