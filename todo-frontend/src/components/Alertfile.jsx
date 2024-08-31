// import React from 'react'
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';

function SuccessAlert() {
  return (
    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" onClose={() => {}} >
        Your note has been saved successfully
    </Alert>
  )
}

function FailureAlert() {
    return (
    <Alert icon={<ErrorIcon fontSize="inherit" />} severity="error" onClose={() => {}} >
        Note could not be saved
    </Alert>
    )
}


export {SuccessAlert, FailureAlert}
