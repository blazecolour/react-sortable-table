import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Table } from 'reactstrap';
import uniqId from '../../utils/uniqId';

export default function TableSortable(props) {
  const {
    datasets,
    sortedDatasets,
    activeRowId,
    handleRowClick,
    handleSort
  } = props;

  const setThead = type => {
    const types = {
      up: `${type} ▲`,
      down: `${type} ▼`
    };
    const sortedType = sortedDatasets[type];
    return sortedType ? types[sortedType] : type;
  };

  return (
    <Table className="w-75 mx-auto" striped bordered>
      <thead>
        <tr>
          <th onClick={handleSort('id')}>{setThead('id')}</th>
          <th onClick={handleSort('firstName')}>{setThead('firstName')}</th>
          <th onClick={handleSort('lastName')}>{setThead('lastName')}</th>
          <th onClick={handleSort('email')}>{setThead('email')}</th>
          <th onClick={handleSort('phone')}>{setThead('phone')}</th>
        </tr>
      </thead>
      <tbody>
        {datasets.map(({ id, firstName, lastName, email, phone }) => {
          const trClass = cn({ 'table-active': activeRowId === id });
          return (
            <tr key={uniqId()} className={trClass} onClick={handleRowClick(id)}>
              <td>{id}</td>
              <td>{firstName}</td>
              <td>{lastName}</td>
              <td>{email}</td>
              <td>{phone}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

TableSortable.propTypes = {
  handleRowClick: PropTypes.func.isRequired,
  handleSort: PropTypes.func.isRequired,
  datasets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
      phone: PropTypes.string
    })
  ),
  sortedDatasets: PropTypes.shape({
    id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string
  }),
  activeRowId: PropTypes.number
};
