import { useEffect, useState } from "react"
import { useAuth } from "./useAuth"
import { Button } from "react-bootstrap";
import ChangeInformationModal from "./ChangeInformationModal";
import ToastFile from "./ToastFile";
import api from "../config/axiosConfig";

export default function Profile() {

  const { isLoggedIn, localToken } = useAuth();
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

  // functions for handling toast
  const toggleToast = () => setShowToast(!showToast);

  useEffect(() => {
    console.log(localToken);
    console.log("Is logged in ", isLoggedIn);
    if(isLoggedIn) {
      const getProfile = async() => {
        try {
          const res = await api.get('/profile', {
              headers: {Authorization: `Bearer ${localToken}`}
          })
          console.log("Response from the server is ", res);
          if(res.data.length > 0) {
            setProfileData(res.data[0]);
          } else {
            setProfileData(null);
          }
          } catch(err) {
            console.error(err);
            setProfileData(null)
          }
      }
      getProfile();
    }
  }, [isUpdated])

  const handleUpdate = (buttonText) => {
    console.log(localToken);
    console.log(buttonText);
    setType(buttonText);
    openModal();
  }

  return (
    <div className="container-lg vh-100 d-flex justify-content-center align-items-center">
      <div className="p-3 bg-light-subtle border border-2" style={{width: "40rem"}}>
        <h3 className="mb-2">Your Profile</h3>
        <div className="container d-flex flex-column">
          {profileData ? (
          <>
            <div className="mt-2">Name: {profileData.name}</div>
            <div className="d-flex justify-content-between align-items-center mt-2">
              <div>Email: {profileData.email}</div>
              <div>
                <Button variant="primary" onClick={() => handleUpdate('email')} style={{width:'10rem'}}>Update Email</Button>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-2">
              <div className="d-flex align-items-center">
                <div className="me-2">Password</div>
                <input type="password" className="form-control" disabled={true} value={profileData.password} />
              </div>
              <div>
                <Button variant="primary" onClick={() => handleUpdate('password')} style={{width:'10rem'}}>Change Password</Button>
              </div>
            </div>
          </>
          ) : (
            <>
              <p>No profile data found</p>
            </>
          )}
        </div>
      </div>
      <ChangeInformationModal isOpen={isChangeModalOpen} closeModal={closeModal} type={type} token={localToken} toggleToast={toggleToast} setSuccess={setSuccess} setMessage={setMessage} setIsUpdated={setIsUpdated} isUpdated={isUpdated} />
      <ToastFile show={showToast} onClose={toggleToast} success={success} message={message} />
    </div>
  )
}

