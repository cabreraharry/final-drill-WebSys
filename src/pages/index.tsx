import React from "react";
import useSWR from 'swr';
import axios from 'axios';
import Main from "@/layout/mainLayout";
import { Container, Typography } from '@mui/material';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

interface Product {
  Product_Type: string;
  Quantity: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  bio: string;
  product?: Product[]; // Make product optional
}

const Home: React.FC = () => {
  const { data, error } = useSWR<User>('/api/user', fetcher);

  if (error) return <div>Error loading user data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Main>
      <Container className='profile-section'>
        <div className="mb-40 text-center">
          <Typography variant="h3" gutterBottom>{data.name}</Typography>
          <Typography variant="h6" gutterBottom>{data.email}</Typography>
          <Typography variant="body2" gutterBottom>{data.bio}</Typography>
        </div>
        <Typography variant="h6" gutterBottom style={{ marginTop: '2rem'}}>Products</Typography>
        {Array.isArray(data.product) ? (
          data.product.map((product, index) => (
            <div key={index} style={{ marginBottom: '3rem' }}>
              <Typography variant="h6" gutterBottom>{product.Product_Type}</Typography>
              <Typography variant="body2" gutterBottom>{product.Quantity}</Typography>
            </div>
          ))
        ) : (
          <Typography variant="body2">No products available</Typography>
        )}
      </Container>
    </Main>
  );
};

export default Home;
