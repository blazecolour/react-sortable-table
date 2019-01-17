import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Input } from 'reactstrap';

export default function SeacrhForm(props) {
  const { handleSearch, searchValue, handleChangeField } = props;

  return (
    <Form inline className="mx-3">
      <FormGroup>
        <Input type="text" onChange={handleChangeField} />
        <Button
          className="m-2"
          color="success"
          type="submit"
          outline
          onClick={handleSearch(searchValue)}
        >
          Search
        </Button>
      </FormGroup>
    </Form>
  );
}

SeacrhForm.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  handleChangeField: PropTypes.func.isRequired,
  searchValue: PropTypes.string
};
