import { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PageTitle from '../../components/PageTitle';
import Button from '../../components/Button';
import useFetch from '../../hooks/useFetch';

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px 0;
  margin-top: 16px;
`;

const CreateAddress = () => {
  const [selectedUf, setSelectedUf] = useState('AC');
  const [initialCity, setInitialCity] = useState('');
  const ufs = useFetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
  const cities = useFetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`);

  useEffect(() => {
    if(cities.data)
      setInitialCity(cities.data[0].nome);
  }, [cities])

  const handleChangeUf = e => {
    setSelectedUf(e.target.value);
  };

  const handleFormSubmit = async (values, {resetForm}) => {
    const addresses = JSON.parse(localStorage.getItem('addresses') || '{}');
    const lastIndex = parseInt(localStorage.getItem('lastIndex') || '0');
    const nextIndex = lastIndex + 1;

    addresses[nextIndex] = {
      id: nextIndex,
      ...values,
    }

    localStorage.setItem('addresses', JSON.stringify(addresses));
    localStorage.setItem('lastIndex', nextIndex);

    resetForm();

    alert('Address added!');
  }

  return (
    <>
      <PageTitle>Create Address</PageTitle>
      <div style={{textAlign: 'right'}}>
        <Link to="/">Go to Address List</Link>
      </div>
      <Formik
        initialValues={{
          name: '',
          address: '',
          uf: selectedUf,
          city: initialCity,
          zip_code: '',
          address_types: '',
        }}
        enableReinitialize={true}
        onSubmit={handleFormSubmit}
      >
        <Form>
          <label htmlFor="name">Name:</label>
          <Field id="name" name="name" type="text" placeholder="Cool name" />

          <label htmlFor="address">Address:</label>
          <Field id="address" name="address" type="text" placeholder="Cool address" />

          <label htmlFor="uf">UF:</label>
          {ufs.data
            ? <Field as="select" id="uf" name="uf" onChange={handleChangeUf}>
                {ufs.data.map(({id, sigla}) => (
                  <option key={id+sigla} value={sigla}>{sigla}</option>
                ))}
              </Field>
            : <p>Loading UFs...</p>}

          <label htmlFor="city">City:</label>
          {cities.data
            ? <Field as="select" id="city" name="city">
                {cities.data.map(({id, nome}) => (
                  <option key={id+nome} value={nome}>{nome}</option>
                ))}
              </Field>
            : <p>Loading Cities...</p>}

          <label htmlFor="zip_code">Zip Code:</label>
          <Field id="zip_code" name="zip_code" type="text" placeholder="Cool Zip Code" />

          <div role="group" aria-labelledby="checkbox-group">
            <label>
              <Field type="checkbox" name="address_types" value="shipping" />
              Shipping Address
            </label>
            <label>
              <Field type="checkbox" name="address_types" value="billing" />
              Billing Address
            </label>
          </div>

          <ButtonWrapper>
            <Button type="submit">Create</Button>
          </ButtonWrapper>
        </Form>
      </Formik>
    </>
  );
}

export default CreateAddress;
