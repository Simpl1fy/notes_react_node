import { Box, Typography, Modal, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '25vw',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};


export default function SuccessModal({ isOpen, onRequestClose, message }) {
  
  const navigate = useNavigate();

  const handleClick = () => {
    onRequestClose();
    navigate('/home');
  }

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={onRequestClose}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h3" component="h6">
            Success
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt:2, mb:2 }}>
            {message}
          </Typography>
          <Button onClick={handleClick} variant="contained">
            Go to Home Page
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
