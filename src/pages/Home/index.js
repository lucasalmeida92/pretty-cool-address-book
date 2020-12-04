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

  return (
    <>
      <PageTitle>
        Address List
      </PageTitle>
      <div style={{textAlign: 'right'}}>
        <Link to="/create-address">+ Create an Address</Link>
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
