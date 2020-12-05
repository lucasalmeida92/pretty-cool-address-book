import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PageTitle from '../../components/PageTitle';
import ListItem from './ListItem';

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
`

function Home() {
  const [addresses, setAddresses] = useState(null);
  const [addressesArray, setAddressesArray] = useState(null);
  const [sortingType, setSortingType] = useState('default');

  const getAddresses = (addresses) => {
    const array = Object.values(addresses);
    const sortedById = array.sort((a, b) => (b.id - a.id));
    const sortedByTypes = sortedById.sort((a, b) => (b.address_types.length - a.address_types.length));

    setAddresses(addresses);
    setAddressesArray(sortedByTypes);
  }

  useEffect(() => {
    const addresses = JSON.parse(localStorage.getItem('addresses') || '{}');

    getAddresses(addresses);
  }, []);

  const handleClickOnDelete = id => {
    let newAddresses = {...addresses};

    delete newAddresses[id];
    localStorage.setItem('addresses', JSON.stringify(newAddresses));
    getAddresses(newAddresses);
  }

  const handleChangeSorting = e => {
    const newSortingType = e.target.value;
    console.log(newSortingType, sortingType);

    if(sortingType !== newSortingType) {
      if(newSortingType === 'default') {
        const sortedById = addressesArray.sort((a, b) => (b.id - a.id));
        const sortedByTypes = sortedById.sort((a, b) => (b.address_types.length - a.address_types.length));
        setAddressesArray(sortedByTypes);
      }

      if(newSortingType === 'byName') {
        console.log('entrou')
        setAddressesArray([...addressesArray].sort((a, b) => (a.name > b.name ? 1 : -1)));
      }

      if(newSortingType === 'byAddress') {
        setAddressesArray([...addressesArray].sort((a, b) => (a.address > b.address ? 1 : -1)));
      }

      setSortingType(newSortingType);
    }
  }

  return (
    <>
      <PageTitle>
        Address List
      </PageTitle>
      <div style={{textAlign: 'right'}}>
        <Link to="/create-address">+ Create an Address</Link>
      </div>
      <div>
        <select onChange={handleChangeSorting} value={sortingType}>
          <option value="default">No sorting</option>
          <option value="byName">Sort by name (ASC)</option>
          <option value="byAddress">Sort by address (ASC)</option>
        </select>
      </div>
      <List>
        {addressesArray === null
          ? <p>Loading...</p>
          : (
            addressesArray.length === 0
              ? <p>No address added yet</p>
              : addressesArray.map(({id, ...rest }) => (
                <ListItem key={id} id={id} {...rest} handleClickOnDelete={handleClickOnDelete} />
              ))
          )}
      </List>
    </>
  );
}

export default Home;
