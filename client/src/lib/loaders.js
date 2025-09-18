import apiRequest from "./apiReques";

export const singlePageLoader = async ({ request, params }) => {
  const res = await apiRequest("/posts/" + params.id);
  console.log(request);
  return res.data;
};

export const listPageLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];
  const postPromise = apiRequest.get("/posts?" + query);

  return {
    postResponse: postPromise,
  };
};

export const profilePostsLoader = () => {
  const postPromise = apiRequest.get("/users/profilePosts");
  const chatPromise = apiRequest.get("/chats");
  return {
    postResponse: postPromise,
    chatResponse: chatPromise,
  };
};
