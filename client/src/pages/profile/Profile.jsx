import React, { Suspense, useState } from "react";
import List from "../../components/list/List";
import "./Profile.scss";
import Chat from "../../components/chat/Chat";
import apiRequest from "../../lib/apiReques.js";
import { useNavigate, Link, useLoaderData, Await } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";

const Profile = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser, updateUser } = useContext(AuthContext);
  const data = useLoaderData();
  const getDataContent = async () => {
    const res = await data;
    console.log(res);
  };
  getDataContent();

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      setError(err.message || "Error Logging out");
    } finally {
      setIsLoading(false);
    }
  };
  console.log(currentUser);

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <button
              onClick={() => {
                navigate("update");
              }}
            >
              Update Profile
            </button>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img src={currentUser.img || "/no-avatar.png"} />{" "}
            </span>
            <span>
              Username: <b>{currentUser.username}</b>{" "}
            </span>
            <span>
              E-amil: <b>{currentUser.email}</b>
            </span>
            <button disabled={isLoading} onClick={handleLogout}>
              Logout
            </button>
            {error && <span className="error">{error}</span>}
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to="/add">
              <button>Create New Post</button>
            </Link>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts</p>}
            >
              {(postResponse) => <List posts={postResponse.data.userPosts} />}
            </Await>
          </Suspense>
          <div className="title">
            <h1>Save List</h1>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts</p>}
            >
              {(postResponse) => <List posts={postResponse.data.savedPosts} />}
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.chatResponse}
              errorElement={<p>Error loading chats</p>}
            >
              {(chatResponse) => <Chat chats={chatResponse.data.chats} />}
            </Await>
          </Suspense>
          {/* <Chat /> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
