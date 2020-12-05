import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const Wrapper = styled.li`
  width: 100%;
  padding: 16px;
  margin: 16px 0;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);

  p {
    color: #888;
  }
`

const Name = styled.h2`
  margin: 4px 0 8px;
  font-size: 18px;
`

const Address = styled.h3`
  margin: 4px 0 16px;
  font-size: 16px;
  font-weight: 400;
`

const ListItem = (props) => {
  const {
    id,
    name,
    address,
    uf,
    city,
    zip_code,
    address_types,
    handleClickOnDelete,
  } = props;

  return (
    <Wrapper>
      <Name>{name}</Name>
      <Address>{address} - {zip_code}</Address>
      <p>{city}/{uf}</p>
      <p>Type(s): {address_types ? address_types.join(', ') : '-'}</p>
      <Button small="true" as={Link} to={`/edit-address/${id}`}>Edit</Button>
      <Button small="true" onClick={() => handleClickOnDelete(id)}>Delete</Button>
    </Wrapper>
  );
}

export default ListItem;
