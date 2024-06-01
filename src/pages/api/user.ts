import { NextApiRequest, NextApiResponse } from 'next';

// Define the Product interface
interface Product {
  Product_Type: string;
  Quantity: number; // Assuming GLfloat is a number type
}

// Define the initial userData object
let userData = {
  id: 1,
  name: 'Harry Ericson A. Cabrera',
  email: 'harryericsoncabrera15@gmail.com',
  bio: '3rd Year Computer Science Student',
  product: [] as Product[] // Ensure product is initialized as an empty array of Product objects
};

// Define the API route handler
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(userData);
  } else if (req.method === 'PUT') {
    const { id, name, email, bio, product } = req.body;
    if (!id || !name || !email || !bio || !Array.isArray(product)) {
      res.status(400).json({ error: "Missing required fields" });
    } else {
      userData = { id, name, email, bio, product };
      res.status(200).json(userData);
    }
  } else if (req.method === 'POST') {
    const { name, email, bio, product } = req.body;
    if (!name || !email || !bio || !Array.isArray(product)) {
      res.status(400).json({ error: "Missing required fields" });
    } else {
      const id = userData.id + 1;
      userData = { id, name, email, bio, product };
      res.status(201).json(userData);
    }
  } else if (req.method === 'DELETE') {
    userData = {
      id: 1,
      name: '',
      email: '',
      bio: '',
      product: []
    };
    res.status(200).end('User data deleted successfully');
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
