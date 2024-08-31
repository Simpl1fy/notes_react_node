// import React from 'react'
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';

export default function AlertComponent(props) {
  return (
    <Alert variant='filled' icon={props.success ? <CheckIcon fontSize="inherit"/> : <ErrorIcon fontSize="inherit" />} severity={props.severity} onClose={props.close} >
        {props.text}
    </Alert>
  )
}