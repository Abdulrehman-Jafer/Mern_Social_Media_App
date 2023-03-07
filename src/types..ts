import { ofComment } from "./components/Home/Post";
export type ofUserData = {
  _id: string;
  username: string;
  password: string;
  userimage: string;
  posts: string[];
  saved: string[];
  likedPost: string[];
};
export type OfPost = {
  createdBy: {
    userId: string;
    username: string;
    userimage: string;
  };
  _id: string;
  image: string;
  caption: string;
  likes: string[];
  createdOn: string;
  comments: ofComment[];
};
export const emptyUserData = {
  _id: "",
  username: "",
  password: "",
  userimage: "",
  posts: [],
  saved: [],
  likedPost: [],
};
