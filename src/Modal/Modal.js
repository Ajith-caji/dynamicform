import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';

export default function SaveSegment() {
  const [open, setOpen] = useState(false);
  const [segmentName, setSegmentName] = useState('');
  const [selectedSchema, setSelectedSchema] = useState('');
  const [schemas, setSchemas] = useState([
    { label: 'First Name', value: 'first_name' },
    { label: 'Last Name', value: 'last_name' },
    { label: 'Gender', value: 'gender' },
    { label: 'Age', value: 'age' },
    { label: 'Account Name', value: 'account_name' },
    { label: 'City', value: 'city' },
    { label: 'State', value: 'state' },
  ]);
  const [addedSchemas, setAddedSchemas] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSegmentName('');
    setSelectedSchema('');
    setAddedSchemas([]);
    setSchemas([
      { label: 'First Name', value: 'first_name' },
      { label: 'Last Name', value: 'last_name' },
      { label: 'Gender', value: 'gender' },
      { label: 'Age', value: 'age' },
      { label: 'Account Name', value: 'account_name' },
      { label: 'City', value: 'city' },
      { label: 'State', value: 'state' },
    ]);
  };

  const handleSchemaChange = (event) => {
    setSelectedSchema(event.target.value);
  };

  const handleAddSchema = () => {
    if (selectedSchema) {
      setAddedSchemas([...addedSchemas, selectedSchema]);
      setSchemas(schemas.filter((schema) => schema.value !== selectedSchema));
      setSelectedSchema('');
    }
  };

 
  const handleSaveSegment = async () => {
        const data = {
          segment_name: segmentName,
          schema: addedSchemas.map((schema) => ({
            [schema]: schemas.find((s) => s.value === schema)?.label || schema,
          })),
        };
    
        try {
          const response = await fetch('https://webhook.site/d59bd47e-aa80-4652-8fad-0c0c597cd757', {
            method: 'POST',
            mode: 'no-cors', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
    
          if (response.ok) {
            alert('Data sent successfully!');
          } else {
            alert('Failed to send data.');
          }
        } catch (error) {
          console.error('Error sending data:', error);
          alert('An error occurred while sending data.');
        }
      };
  return (
    <div className="App">
     
    
      <button
        className="text-black bg-transparent border-2 w-36 h-8"
        type="submit"
        onClick={handleOpen}
      >
        Save Segment
      </button>
   
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            width: '500px',
            height: 'auto',
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" className='bg-cyan-500 text-white' >Saving Segment</DialogTitle>
        <DialogContent>
      
          <DialogContentText id="alert-dialog-description" className="mb-4 font-bold">
           Enter The Name of Segment
          </DialogContentText>
          
          <TextField
            label="Name of segment"
            variant="outlined"
            fullWidth
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
            margin="normal"
          />
          <div className='text-black font-medium'>
            To save your segment, you need to add schemas to build query
          </div>
   <div className="mt-4 p-4 border-2 border-blue-500">
            {addedSchemas.map((schema, index) => (
            <FormControl fullWidth>
            <InputLabel id={`added-schema-label-${index}`}>
              {schemas.find((s) => s.value === schema)?.label || `Schema ${index + 1}`}
            </InputLabel>
            <Select className=''
              labelId={`added-schema-label-${index}`}
              value={schema}
              onChange={(e) => {
                const newSchemas = [...addedSchemas];
                newSchemas[index] = e.target.value;
                setAddedSchemas(newSchemas);
                setSchemas(
                  schemas.filter(
                    (s) => !newSchemas.includes(s.value) || s.value === e.target.value
                  )
                );
              }}
              label={schemas.find((s) => s.value === schema)?.label || `Schema ${index + 1}`}
            >
              {schemas
                .concat(
                  addedSchemas
                    .filter((s, i) => i !== index)
                    .map((s) => ({ label: s, value: s }))
                )
                .map((schemaOption) => (
                  <MenuItem key={schemaOption.value} value={schemaOption.value}>
                    {schemaOption.label}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          
            ))}
          </div>
          <FormControl fullWidth margin="normal">
            <InputLabel id="add-schema-label">Add schema to segment</InputLabel>
            <Select
              labelId="add-schema-label"
              value={selectedSchema}
              onChange={handleSchemaChange}
              label="Add schema to segment"
            >
              {schemas.map((schema) => (
                <MenuItem key={schema.value} value={schema.value}>
                  {schema.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

     
          <Button variant="text" onClick={handleAddSchema}>
            +Add new schema
          </Button>

       
       
        </DialogContent>

        
        <DialogActions >
          <Button onClick={handleSaveSegment} style={{color:"#ffffff",backgroundColor:"#02a0bf"}}>
            Save Segment
          </Button>
          <Button onClick={handleClose} style={{color:"red",backgroundColor:"#ffffff"}}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
