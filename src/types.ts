export type ofUserData = {
  _id: string;
  username: string;
  password: string;
  userimage: string;
  posts: string[];
  saved: string[];
  likedPost: string[];
};

export type ofComment = {
  username: string
  userimage: string
  userId: string
  commentBody: string
}

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
export type ofSignUp = {
  username: string;
  password: string;
  confirm:string;
  userimage: string;
};
export type ofLogIn = {
    username:string,
    password:string,
}
