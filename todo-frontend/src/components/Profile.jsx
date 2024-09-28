import { useEffect, useState } from "react"
import { useAuth } from "./useAuth"
import { Button, Spinner } from "react-bootstrap";
import ChangeInformationModal from "./ChangeInformationModal";
import ToastFile from "./ToastFile";
import api from "../config/axiosConfig";
import '../scss/profile.css';

export default function Profile() {

  const { isLoggedIn, localToken, isMobile } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [type, setType] = useState('');
  const [isChangeModalOpen, setChangeModal] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  
  // functions for opening modal
  const openModal = () => setChangeModal(true);
  const closeModal = () => setChangeModal(false);
  
  // state for handling toast
  const [showToast, setShowToast] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [spinner, setSpinner] = useState(true);

  // functions for handling toast
  const toggleToast = () => setShowToast(!showToast);

  useEffect(() => {
    if(isLoggedIn) {
      const getProfile = async() => {
        try {
          const res = await api.get('/profile', {
              headers: {Authorization: `Bearer ${localToken}`}
          })
          console.log("Response from the server is ", res);
          if(res.data.length > 0) {
            setProfileData(res.data[0]);
            setSpinner(false);
          }
          } catch(err) {
            console.error(err);
          }
      }
      getProfile();
    }
  }, [isUpdated])

  const handleUpdate = (buttonText) => {
    setType(buttonText);
    openModal();
  }

  return (
    <div className="container-lg d-flex justify-content-center align-items-center mt-2" style={{minWidth: isMobile ? '95vw' : '45vw'}}>
      <div className="p-3 bg-light-subtle border border-2" style={{width: "40rem"}}>
        <h3 className="mb-2">Your Profile</h3>
        <div className="d-flex flex-column">
          {spinner ?
          <div className="d-flex justify-content-center align-items-center">
            <Spinner animation="border"/>
          </div>
          :
          (profileData && (
          <>
            <div className="mt-2"><strong>Name:</strong> {profileData.name}</div>
            <div className="d-flex justify-content-between mt-2 profile-info">
              <div><strong>Email:</strong> {profileData.email}</div>
              <div>
                <Button variant="primary" onClick={() => handleUpdate('email')} style={{width:'20vw', minWidth: '200px', textWrap: 'nowrap'}}>Update Email</Button>
              </div>
            </div>
            <div className="d-flex justify-content-between mt-2 profile-info">
              <div className="d-flex align-items-center">
                <div className="me-2"><strong>Password:</strong></div>
                <input type="password" className="form-control" disabled={true} value={profileData.password} />
              </div>
              <div>
                <Button variant="primary" onClick={() => handleUpdate('password')} style={{width:'20vw', minWidth: '200px', textWrap: 'nowrap'}}>Change Password</Button>
              </div>
            </div>
          </>
          ))}
        </div>
      </div>
      <ChangeInformationModal isOpen={isChangeModalOpen} closeModal={closeModal} type={type} token={localToken} toggleToast={toggleToast} setSuccess={setSuccess} setMessage={setMessage} setIsUpdated={setIsUpdated} isUpdated={isUpdated} />
      <ToastFile show={showToast} onClose={toggleToast} success={success} message={message} />
    </div>
  )
}

