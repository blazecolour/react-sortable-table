import React from 'react';
import { Container, Row } from 'reactstrap';
import TableSortable from './components/TableSortable';
import ButtonGroup from './components/ButtonGroup';
import CardInfo from './components/CardInfo';
import SearchForm from './components/SearchForm';
import Pagination from './components/Pagination';
import api from './constants/api';
import getData from './utils/getData';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      btnLargeData: {
        isLoading: false,
        isDisable: false
      },
      btnSmallData: {
        isLoading: false,
        isDisable: false
      },
      activeButton: '',
      activeRowId: null,
      preparingData: [],
      datasets: [],
      sortedDatasets: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
      },
      pagination: {
        pages: 0,
        activePage: 1
      },
      searchValue: ''
    };
  }

  handleLoad = btnType => () => {
    this.setState({
      ...this.state,
      btnLargeData: {
        isLoading:
          btnType === 'largeData' &&
          this.state.btnLargeData.isLoading === false,
        isDisable: true
      },
      btnSmallData: {
        isLoading:
          btnType === 'smallData' &&
          this.state.btnSmallData.isLoading === false,
        isDisable: true
      },
      activeButton: btnType
    });

    fetch(api[btnType])
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong...');
        }
      })
      .then(data => {
        this.initialData = data;
        this.setState({
          ...this.state,
          btnLargeData: {
            isLoading: false,
            isDisable: false
          },
          btnSmallData: {
            isLoading: false,
            isDisable: false
          },
          activeRowId: null,
          preparingData: [...this.initialData],
          datasets: getData(this.initialData),
          pagination: {
            pages: Math.ceil(this.initialData.length / 50),
            activePage: 1
          }
        });
      })
      .catch(error => console.error(error));
  };

  handleChangeField = e => {
    this.setState({ searchValue: e.target.value });
  };

  handleSearch = searchingValue => e => {
    e.preventDefault();
    if (!this.initialData) return;
    const filteredData = this.initialData.filter(el => {
      const tableData = {
        id: el.id,
        firstName: el.firstName,
        lastName: el.lastName,
        email: el.email,
        phone: el.phone
      };
      const valuesArr = Object.values(tableData).filter(
        elem => typeof elem !== 'object'
      );
      const isFiltered = valuesArr.reduce(
        (acc, elem) => (String(elem).includes(searchingValue) ? true : acc),
        false
      );
      return isFiltered;
    });
    this.setState({
      ...this.state,
      preparingData:
        searchingValue === '' ? [...this.initialData] : filteredData,
      datasets:
        searchingValue === ''
          ? getData(this.initialData)
          : getData(filteredData),
      activeRowId: null,
      sortedDatasets: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
      },
      pagination: {
        pages: Math.ceil(filteredData.length / 50),
        activePage: 1
      }
    });
  };

  handleSort = type => () => {
    const sortDir = this.state.sortedDatasets[type] === 'up' ? 'down' : 'up';
    const unsortedData = [...this.state.preparingData];
    const sortedData = unsortedData.sort((a, b) => {
      const prepareValueToCompare = value => {
        if (typeof value === 'number') {
          return value;
        }
        if (typeof value === 'string') {
          return value.toLowerCase();
        }
        return value;
      };

      if (prepareValueToCompare(a[type]) < prepareValueToCompare(b[type])) {
        return sortDir === 'up' ? -1 : 1;
      }
      if (prepareValueToCompare(a[type]) > prepareValueToCompare(b[type])) {
        return sortDir === 'up' ? 1 : -1;
      }
      return 0;
    });
    this.setState({
      ...this.state,
      preparingData: sortedData,
      datasets: getData(sortedData),
      activeRowId: null,
      sortedDatasets: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        [type]: sortDir
      },
      pagination: {
        ...this.state.pagination,
        activePage: 1
      }
    });
  };

  handleRowClick = rowId => () => {
    this.setState({
      ...this.state,
      activeRowId: rowId
    });
  };

  handlePageClick = index => () => {
    const prepData = this.state.preparingData;
    if (prepData.length / 50 <= 1) {
      this.setState({
        ...this.state,
        datasets: [...prepData]
      });
    }
    const firstArrayIndex = 50 * (index - 1);
    const lastArrayIndex = 50 * index - 1;
    const datasets = prepData.slice(firstArrayIndex, lastArrayIndex + 1);
    this.setState({
      ...this.state,
      datasets,
      activeRowId: null,
      pagination: {
        ...this.state.pagination,
        activePage: index
      }
    });
  };

  render() {
    const {
      datasets,
      activeRowId,
      searchValue,
      btnLargeData,
      btnSmallData,
      activeButton,
      sortedDatasets,
      pagination
    } = this.state;

    const selectedRow = datasets.find(el => el.id === activeRowId);
    return (
      <div>
        <div className="fetch-data">
          <Container>
            <Row className="flex-row-reverse">
              <div className="searching-form">
                <SearchForm
                  handleSearch={this.handleSearch}
                  handleChangeField={this.handleChangeField}
                  searchValue={searchValue}
                />
              </div>
              <ButtonGroup
                handleLoad={this.handleLoad}
                btnLargeData={btnLargeData}
                btnSmallData={btnSmallData}
                activeButton={activeButton}
              />
            </Row>
          </Container>
        </div>

        <div className="table-data">
          {datasets.length !== 0 ? (
            <TableSortable
              datasets={datasets}
              handleRowClick={this.handleRowClick}
              activeRowId={activeRowId}
              handleSort={this.handleSort}
              sortedDatasets={sortedDatasets}
            />
          ) : null}
          <div className="pagination">
            <Pagination
              pages={pagination.pages}
              activePage={pagination.activePage}
              handlePageClick={this.handlePageClick}
            />
          </div>
        </div>
        <div className="address-data">
          {activeRowId ? <CardInfo selectedRow={selectedRow} /> : null}
        </div>
      </div>
    );
  }
}
