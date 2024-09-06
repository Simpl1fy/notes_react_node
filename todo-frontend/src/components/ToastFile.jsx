import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';


export default function ToastFile({ show, onClose, success, message }) {


    return (
        <div>
            <ToastContainer
            className="p-3"
            position="bottom-end"
            style={{ zIndex: 1 }}
            >
                <Toast show={show} onClose={onClose} delay={3000} autohide>
                    <Toast.Header closeButton>
                        <h3 className='me-auto'><strong>{success === true ? "Success" : "Failed"}</strong></h3>
                    </Toast.Header>
                    <Toast.Body>
                        {message}
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    )
}

