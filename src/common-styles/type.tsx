// Integerface definitions for Post and Comment objects used in the application
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