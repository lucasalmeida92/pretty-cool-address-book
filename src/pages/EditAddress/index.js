import { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import PageTitle from '../../components/PageTitle';
import Button from '../../components/Button';
import Message from '../../components/Message';
import useFetch from '../../hooks/useFetch';

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px 0;
  margin-top: 16px;
`;

const AddressSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').required('Required'),
  address: Yup.string().min(5, 'Too Short!').required('Required'),
  uf: Yup.string().min(2, 'Too Short!').required('Required'),
  city: Yup.string().min(2, 'Too Short').required('Required'),
  zip_code: Yup.string().min(9, 'Must be in format 00000-000').max(9, 'Must be in format 00000-000').required('Required'),
});

const EditAddress = () => {
  const { id } = useParams();
  const [selectedAddress, setSelectedAddress] = useState({});
  const [selectedUf, setSelectedUf] = useState('');
  const [initialCity, setInitialCity] = useState('');
  const ufs = useFetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
  const cities = useFetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedAddress.uf}/municipios`);

  useEffect(() => {
    const addresses = JSON.parse(localStorage.getItem('addresses') || '{}');

    setSelectedAddress(addresses[id]);
    // setSelectedUf(addresses[id].uf);
    // setInitialCity(addresses[id].city);
  }, []);

  // useEffect(() => {
  //   if(cities.data)
  //     setInitialCity({
  //       ...selectedAddress,
  //       city: cities.data[0],
  //     });
  // }, [cities]);

  const handleChangeUf = e => {
    setSelectedAddress({
      ...selectedAddress,
      uf: e.target.value,
    });
  };

  const handleFormSubmit = async (values, {resetForm}) => {
    console.log(values);
    // const addresses = JSON.parse(localStorage.getItem('addresses') || '{}');
    // const lastIndex = parseInt(localStorage.getItem('lastIndex') || '0');
    // const nextIndex = lastIndex + 1;

    // addresses[nextIndex] = {
    //   id: nextIndex,
    //   ...values,
    // }

    // localStorage.setItem('addresses', JSON.stringify(addresses));
    // localStorage.setItem('lastIndex', nextIndex);

    // resetForm();

    // alert('Address added!');
  }

  return (
    <>
      <PageTitle>Create Address</PageTitle>
      <div style={{textAlign: 'right'}}>
        <Link to="/">Go to Address List</Link>
      </div>
      <Formik
        initialValues={selectedAddress}
        enableReinitialize={true}
        validationSchema={AddressSchema}
        onSubmit={handleFormSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <label htmlFor="name">Name:</label>
            <Field id="name" name="name" type="text" placeholder="Cool name" required />
            {errors.name && touched.name ? <Message>{errors.name}</Message> : null}

            <label htmlFor="address">Address:</label>
            <Field id="address" name="address" type="text" placeholder="Cool address" required />
            {errors.address && touched.address ? <Message>{errors.address}</Message> : null}

            <label htmlFor="uf">UF:</label>
            {ufs.data
              ? <Field as="select" id="uf" name="uf" onChange={handleChangeUf}>
                  {ufs.data.map(({id, sigla}) => (
                    <option key={id+sigla} value={sigla}>{sigla}</option>
                  ))}
                </Field>
              : <p>Loading UFs...</p>}
            {errors.uf && touched.uf ? <Message>{errors.uf}</Message> : null}

            <label htmlFor="city">City:</label>
            {cities.data
              ? <Field as="select" id="city" name="city">
                  <option value="">Select a City</option>
                  {cities.data.map(({id, nome}) => (
                    <option key={id+nome} value={nome}>{nome}</option>
                  ))}
                </Field>
              : <p>Loading Cities...</p>}
            {errors.city && touched.city ? <Message>{errors.city}</Message> : null}

            <label htmlFor="zip_code">Zip Code:</label>
            <Field id="zip_code" name="zip_code" type="text" placeholder="Cool Zip Code" />
            {errors.zip_code && touched.zip_code ? <Message>{errors.zip_code}</Message> : null}

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
              <Button type="submit">Save</Button>
            </ButtonWrapper>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default EditAddress;
