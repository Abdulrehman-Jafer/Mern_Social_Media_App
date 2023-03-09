import { ofComment } from "../../types"
export type ofPostProps = {
    creatorname: string,
    creatorimage: string,
    postImage: string,
    likes: string[],
    createdOn: string,
    caption: string,
    postId: string,
    creatorId: string,
    comments: ofComment[]
}
