import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', company: '', jobTitle: '' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Fetch contacts from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/contacts')
      .then(response => setContacts(response.data))
      .catch(error => console.error(error));
  }, []);

  // Handle form data change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (Adding a new contact)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      alert('All required fields must be filled!');
      return;
    }

    // Prepare the payload with keys that match the backend database columns
    const payload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      job_title: formData.jobTitle,
    };

    // Send POST request to backend
    axios.post('http://localhost:5000/contacts', payload)
      .then(response => {
        setContacts([...contacts, response.data]);
        setFormData({ firstName: '', lastName: '', email: '', phone: '', company: '', jobTitle: '' });
      })
      .catch(error => {
        console.error('Error submitting data:', error.response);
      });
  };

  // Handle deletion of a contact
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/contacts/${id}`)
      .then(() => setContacts(contacts.filter(contact => contact.id !== id)))
      .catch(error => console.error(error));
  };

  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <h1>Contact Management</h1>

      <form onSubmit={handleSubmit}>
        <TextField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
        <TextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
        <TextField label="Email" name="email" value={formData.email} onChange={handleChange} required />
        <TextField label="Phone" name="phone" value={formData.phone} onChange={handleChange} required />
        <TextField label="Company" name="company" value={formData.company} onChange={handleChange} />
        <TextField label="Job Title" name="jobTitle" value={formData.jobTitle} onChange={handleChange} />
        <Button type="submit" variant="contained">Add Contact</Button>
      </form>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>{contact.first_name}</TableCell>
                <TableCell>{contact.last_name}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>{contact.company}</TableCell>
                <TableCell>{contact.job_title}</TableCell>
                <TableCell>
                  <Button onClick={() => handleDelete(contact.id)} color="secondary">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={contacts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
}

export default App;
