import { Formik, Field, Form } from 'formik';
import styled from 'styled-components';
import PageTitle from '../../components/PageTitle';
import Button from '../../components/Button';

/*
○ Name: Text Input
○ Address: Text Input
○ City and UF: Select box
  ■ You must load it dynamically using the following API
● https://servicodados.ibge.gov.br/api/docs/localidades?versao=1
○ Zip Code: Text Input
  ■ Just plaintext without any API integration
  ■ Masks and validations are optional
○ Default Shipping Address: Checkbox
○ Billing Address: Checkbox
*/

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px 0;
  margin-top: 16px;
`;

const CreateAddress = () => {

  const handleFormSubmit = async (values) => {
    await new Promise((r) => setTimeout(r, 500));
    alert(JSON.stringify(values, null, 2));
  }

  return (
    <>
      <PageTitle>Create Address</PageTitle>
      <Formik
        initialValues={{
          name: '',
          address: '',
          uf: null,
          city: null,
          zip_code: '',
          address_type: '',
        }}
        onSubmit={handleFormSubmit}
      >
        <Form>
          <label htmlFor="name">Name:</label>
          <Field id="name" name="name" type="text" placeholder="Cool name" />

          <label htmlFor="address">Address:</label>
          <Field id="address" name="address" type="text" placeholder="Cool address" />

          <label htmlFor="uf">UF:</label>
          <Field as="select" id="uf" name="uf">
            <option value="SP">SP</option>
          </Field>

          <label htmlFor="city">City:</label>
          <Field as="select" id="city" name="city">
            <option value="São Paulo">São Paulo</option>
          </Field>

          <label htmlFor="zip_code">Zip Code:</label>
          <Field id="zip_code" name="zip_code" type="text" placeholder="Cool Zip Code" />

          <div role="group" aria-labelledby="checkbox-group">
            <label>
              <Field type="checkbox" name="address_type" value="shipping" />
              Shipping Address
            </label>
            <label>
              <Field type="checkbox" name="address_type" value="billing" />
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
