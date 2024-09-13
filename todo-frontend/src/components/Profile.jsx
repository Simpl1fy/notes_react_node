import { useEffect, useState } from "react"
import axios from "axios"
import { useAuth } from "./useAuth"

export default function Profile() {

  const { localToken } = useAuth();
  const [profileData, setProfileData] = useState([])

  useEffect(() => {
    console.log(localToken);
    const getProfile = async() => {
      try {
        const res = await axios.get('http://localhost:5000/profile', {
            headers: {Authorization: `Bearer ${localToken}`}
        })
        console.log(res);
        if(res.data.length > 0) {
          setProfileData(res.data);
        } else {
          setProfileData([]);
        }
        console.log(profileData);
        } catch(err) {
          console.error(err);
        }
    }
    getProfile();
    console.log(profileData);
  }, [])

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="p-3 bg-light-subtle border">
        <h3>Your Profile</h3>
        <div className="container">
          {profileData ? (
          <>
            <div>Name: {profileData[0].name}</div>
            <div>Email: {profileData[0].email}</div>
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

