export interface Comment {
  id: string;
  text: string;
  createdAt: number;
}

export interface Post {
  id: string;
  title: string;
  description: string;
  imageUri: string;
  likes: number;
  isLiked: boolean;
  comments: Comment[];
  createdAt: number;
}

export interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}
