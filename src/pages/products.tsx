"use client";

import React from 'react';
import { Container, Typography, TextField, Button, IconButton } from '@mui/material';
import { Formik, Form, Field, FieldArray } from 'formik';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import Main from '@/layout/mainLayout';
import DeleteIcon from '@mui/icons-material/Delete';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

interface Product {
  Product_Type: string;
  Quantity: BigInteger;
}

interface User {
  id: number;
  name: string;
  email: string;
  bio: string;
  product: Product[];
}

const ProfilePage: React.FC = () => {
  const { data, error } = useSWR<User>('/api/user', fetcher);

  if (error) return <div>Error loading user data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Main>
      <Container className='w-1/2 justify-start'>
        <Typography variant="h4">Products</Typography>
        <Formik
          initialValues={{ products: data.product || [] }} // Ensure products is an array
          onSubmit={(values, actions) => {
            axios.put('/api/user', { ...data, product: values.products })
              .then(res => {
                mutate('/api/user', { ...data, product: values.products }, false);
                console.log('Products updated successfully');
              })
              .catch(err => {
                console.error('Error updating products:', err);
              })
              .finally(() => {
                actions.setSubmitting(false);
              });
          }}
        >
          {({ values, isSubmitting }) => (
            <Form>
              <FieldArray name="products">
                {({ push, remove }) => (
                  <div>
                    {Array.isArray(values.products) ? values.products.map((product, index) => (
                      <div key={index} style={{ marginBottom: '1rem' }}>
                        <Field
                          name={`products.${index}.Product_Type`}
                          as={TextField}
                          label="Product_Type"
                          InputProps={{ style: { color: 'white' } }}
                          InputLabelProps={{ style: { color: 'darkgray' } }}
                          style={{ color: 'white', marginRight: '1rem' }}
                        />
                        <Field
                          name={`products.${index}.quantity`}
                          as={TextField}
                          label="Quantity"
                          InputProps={{ style: { color: 'white' } }}
                          InputLabelProps={{ style: { color: 'darkgray' } }}
                          style={{ color: 'white', marginRight: '1rem' }}
                        />
                        <IconButton
                          onClick={() => remove(index)}
                          aria-label="delete"
                          color="secondary"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div> 
                    )) : null}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => push({ Product_Type: '', Quantity: '' })}
                    >
                      Add Product
                    </Button>
                  </div>
                )}
              </FieldArray><br /><br />
              <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>Save</Button>
            </Form>
          )}
        </Formik>
      </Container>
    </Main>
  );
}

export default ProfilePage;
