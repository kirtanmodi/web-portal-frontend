import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Table, TableHead, TableBody, TableCell, TableRow, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const API_URL = 'http://localhost:11000/data';

const App = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({ id: '', name: '', age: '', email: '', city: '' });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleAddData = async () => {
    try {
      const response = await axios.post(API_URL, formData);
      setData((prevData) => [...prevData, response.data]);
      setFormData({ id: '', name: '', age: '', email: '', city: '' });
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  const handleDeleteData = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleEditData = (id) => {
    const itemToUpdate = data.find((item) => item.id === id);
    if (!itemToUpdate) {
      console.error('Item not found.');
      return;
    }
    setFormData(itemToUpdate);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({ id: '', name: '', age: '', email: '', city: '' });
  };

  const handleUpdateData = async () => {
    try {
      const response = await axios.put(`${API_URL}/${formData.id}`, formData);
      setData((prevData) =>
        prevData.map((item) => (item.id === formData.id ? response.data : item))
      );
      handleClose();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
      <form onSubmit={handleAddData}>
        <TextField
          label="ID"
          name="id"
          value={formData.id}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Age"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="City"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '1rem' }}>
          Add Data
        </Button>
      </form>
      <Table sx={{ marginTop: '2rem' }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.age}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.city}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDeleteData(item.id)}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEditData(item.id)}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Data</DialogTitle>
        <DialogContent>
          <TextField
            label="ID"
            name="id"
            value={formData.id}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="City"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdateData} color="primary">Update</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default App;
