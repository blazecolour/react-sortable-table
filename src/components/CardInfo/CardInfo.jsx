import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'reactstrap';

export default function CardInfo({ selectedRow }) {
  const {
    address: { city, state, streetAddress, zip },
    firstName,
    lastName,
    description
  } = selectedRow;

  return (
    <ListGroup className="w-25 mx-auto">
      <ListGroupItem>{`Выбран пользователь: ${firstName} ${lastName}`}</ListGroupItem>
      <ListGroupItem>{`Описание: ${description}`}</ListGroupItem>
      <ListGroupItem>{`Адрес проживания: ${streetAddress}`}</ListGroupItem>
      <ListGroupItem>{`Город: ${city}`}</ListGroupItem>
      <ListGroupItem>{`Провинция/штат: ${state}`}</ListGroupItem>
      <ListGroupItem>{`Индекс: ${zip}`}</ListGroupItem>
    </ListGroup>
  );
}

CardInfo.propTypes = {
  selectedRow: PropTypes.shape({
    address: PropTypes.shape({
      city: PropTypes.string,
      state: PropTypes.string,
      streetAddress: PropTypes.string,
      zip: PropTypes.string
    }),
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    description: PropTypes.string
  }).isRequired
};
