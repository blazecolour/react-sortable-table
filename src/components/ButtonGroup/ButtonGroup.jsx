import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonToolbar } from 'reactstrap';

export default function ButtonGroup(props) {
  const { handleLoad, btnLargeData, btnSmallData, activeButton } = props;

  return (
    <ButtonToolbar className="m-1">
      <Button
        className="btn-data m-1"
        color="primary"
        onClick={handleLoad('largeData')}
        disabled={btnLargeData.isDisable}
        active={activeButton === 'largeData'}
        outline
      >
        {btnLargeData.isLoading ? 'Loading...' : 'More'}
      </Button>
      <Button
        className="btn-data m-1"
        color="primary"
        onClick={handleLoad('smallData')}
        disabled={btnSmallData.isDisable}
        active={activeButton === 'smallData'}
        outline
      >
        {btnSmallData.isLoading ? 'Loading...' : 'Less'}
      </Button>
    </ButtonToolbar>
  );
}

ButtonGroup.propTypes = {
  handleLoad: PropTypes.func.isRequired,
  btnLargeData: PropTypes.objectOf(PropTypes.bool),
  btnSmallData: PropTypes.objectOf(PropTypes.bool),
  activeButton: PropTypes.string
};
