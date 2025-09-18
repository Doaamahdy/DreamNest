import React, { useContext, useState } from "react";
import "./ProfileUpdatePag.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiReques";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/UploadWidget";

const ProfileUpdatePage = () => {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState([]);
  const [username, setUsername] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState("");
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleUpdate = async (e) => {
    e.preventDefault();

    const data = {
      email: email || undefined,
      username: username || undefined,
      password: password || undefined,
      avatar: avatar[0] || currentUser.avatar || undefined,
    };
    console.log(data);
    try {
      setIsLoading(true);
      const res = await apiRequest.put("/users/user/", data);
      console.log(res.data.updatedUser);
      updateUser(res.data.updatedUser);
      navigate("/profile");
    } catch (e) {
      console.log(e.response);
      setError(e.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleUpdate}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              name="email"
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button disabled={loading}>Update</button>
          {error && <span>{error}</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img src={avatar[0] || currentUser.avatar || "/no-avatar.png"} alt="" />
        <UploadWidget
          uwConfig={{
            cloudName: "dnllcystl",
            uploadPreset: "DreamNest",
            multiple: false,
            maxImageFileSize: 2000000,
            folder: "avatars",
          }}
          setState={setAvatar}
        />
      </div>
    </div>
  );
};

export default ProfileUpdatePage;
