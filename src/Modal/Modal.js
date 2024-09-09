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

  // const handleSaveSegment = () => {
  //   const schemaData = addedSchemas.map((schema) => {
  //     const foundSchema = schemas.find((s) => s.value === schema);
  //     return { [schema]: foundSchema ? foundSchema.label : schema };
  //   });

  //   const dataToSend = {
  //     segment_name: segmentName,
  //     schema: schemaData,
  //   };

    
  //   console.log('Sending Data:', dataToSend);

  
  //   handleClose();
  // };
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
            mode: 'no-cors', // this bypasses CORS checks but limits response handling
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
// import React, { useState } from 'react';
// import {
//   Box,
//   Button,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
 
//   Chip,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
// } from '@mui/material';


// const SaveSegment = () => {
//   const [segmentName, setSegmentName] = useState('');
//   const [open, setOpen] = useState(false);
//   const [schemas, setSchemas] = useState([
//     { label: 'First Name', value: 'first_name' },
//     { label: 'Last Name', value: 'last_name' },
//     { label: 'Gender', value: 'gender' },
//     { label: 'Age', value: 'age' },
//     { label: 'Account Name', value: 'account_name' },
//     { label: 'City', value: 'city' },
//     { label: 'State', value: 'state' },
//   ]);
//   const [addedSchemas, setAddedSchemas] = useState([]);

//   const handleAddSchema = () => {
//     if (schemas.length > 0) {
//       setAddedSchemas([...addedSchemas, schemas[0].value]);
//       setSchemas(schemas.slice(1));
//     }
//   };



//   const handleSaveSegment = async () => {
//     const data = {
//       segment_name: segmentName,
//       schema: addedSchemas.map((schema) => ({
//         [schema]: schemas.find((s) => s.value === schema)?.label || schema,
//       })),
//     };

//     try {
//       const response = await fetch('https://webhook.site/d59bd47e-aa80-4652-8fad-0c0c597cd757', {
//         method: 'POST',
//         mode: 'no-cors', // this bypasses CORS checks but limits response handling
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       })

//       if (response.ok) {
//         alert('Data sent successfully!');
//       } else {
//         alert('Failed to send data.');
//       }
//     } catch (error) {
//       console.error('Error sending data:', error);
//       alert('An error occurred while sending data.');
//     }
//   };

//   return (
//     <div>
//       <Button variant="contained" onClick={() => setOpen(true)}>
//         Save Segment
//       </Button>

//       <Dialog open={open} onClose={() => setOpen(false)}>
//         <DialogTitle>Create Segment</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Segment Name"
//             fullWidth
//             margin="normal"
//             value={segmentName}
//             onChange={(e) => setSegmentName(e.target.value)}
//           />
//           <FormControl fullWidth margin="normal">
//             <InputLabel>Add schema to segment</InputLabel>
//             <Select
//               value=""
//               onChange={(e) => {
//                 const selectedSchema = schemas.find(
//                   (schema) => schema.value === e.target.value
//                 );
//                 setAddedSchemas([...addedSchemas, selectedSchema.value]);
//                 setSchemas(schemas.filter((s) => s.value !== selectedSchema.value));
//               }}
//             >
//               {schemas.map((schema) => (
//                 <MenuItem key={schema.value} value={schema.value}>
//                   {schema.label}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <Button
//             variant="text"
//             onClick={handleAddSchema}
//             sx={{ marginBottom: 2 }}
//           >
//             + Add new schema
//           </Button>
//           <Box
//             sx={{
//               border: '1px solid blue',
//               padding: 2,
//               marginTop: 2,
//               display: 'flex',
//               flexDirection: 'column',
//               gap: 1,
//             }}
//           >
//             {addedSchemas.map((schema, index) => (
//               <Box
//                 key={`schema-${index}`}
//                 sx={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: 1,
//                   border: '1px solid lightgray',
//                   padding: 1,
//                   borderRadius: 1,
//                   position: 'relative',
//                 }}
//               >
//                 <Chip
//                   sx={{ marginLeft: 1 }}
//                   color={index % 2 === 0 ? 'success' : 'error'}
//                   size="small"
//                   label=""
//                   variant="filled"
//                 />
//                 <FormControl fullWidth>
//                   <InputLabel id={`added-schema-label-${index}`}>
//                     {schemas.find((s) => s.value === schema)?.label ||
//                       `Schema ${index + 1}`}
//                   </InputLabel>
//                   <Select
//                     labelId={`added-schema-label-${index}`}
//                     value={schema}
//                     onChange={(e) => {
//                       const newSchemas = [...addedSchemas];
//                       newSchemas[index] = e.target.value;
//                       setAddedSchemas(newSchemas);
//                       setSchemas(
//                         schemas.filter(
//                           (s) =>
//                             !newSchemas.includes(s.value) ||
//                             s.value === e.target.value
//                         )
//                       );
//                     }}
//                     label={
//                       schemas.find((s) => s.value === schema)?.label ||
//                       `Schema ${index + 1}`
//                     }
//                   >
//                     {schemas
//                       .concat(
//                         addedSchemas
//                           .filter((s, i) => i !== index)
//                           .map((s) => ({ label: s, value: s }))
//                       )
//                       .map((schemaOption, optionIndex) => (
//                         <MenuItem
//                           key={`option-${optionIndex}`}
//                           value={schemaOption.value}
//                         >
//                           {schemaOption.label}
//                         </MenuItem>
//                       ))}
//                   </Select>
//                 </FormControl>

             
//               </Box>
//             ))}
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpen(false)}>Cancel</Button>
//           <Button onClick={handleSaveSegment}>Save</Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default SaveSegment;
