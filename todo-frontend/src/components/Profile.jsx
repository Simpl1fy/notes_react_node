import { useEffect, useState } from "react"
import axios from "axios"
import { useAuth } from "./useAuth"
import { Button } from "react-bootstrap";

export default function Profile() {

  const { localToken } = useAuth();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    console.log(localToken);
    const getProfile = async() => {
      try {
        const res = await axios.get('http://localhost:5000/profile', {
            headers: {Authorization: `Bearer ${localToken}`}
        })
        console.log(res);
        if(res.data.length > 0) {
          setProfileData(res.data[0]);
        } else {
          setProfileData(null);
        }
        console.log(profileData);
        } catch(err) {
          console.error(err);
          setProfileData(null)
        }
    }
    getProfile();
    console.log(profileData);
  }, [])

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="p-3 bg-light-subtle border" style={{width: "30rem"}}>
        <h3 className="mb-2">Your Profile</h3>
        <div className="container d-flex flex-column">
          {profileData ? (
          <>
            <div className="mt-2">Name: {profileData.name}</div>
            <div className="d-flex justify-content-between align-items-center mt-2">
              <div>Email: {profileData.email}</div>
              <div>
                <Button variant="primary">Update Email</Button>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-2">
              <div>Password</div>
              <div>
                <Button variant="primary">Change Password</Button>
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
    </div>
  )
}

