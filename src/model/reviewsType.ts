export type Reviews = {
  id: number;
  page: number;
  results: ReviewsResults[];
};

export type ReviewsResults = {
  author: string;
  author_details: AuthorDetails;
  content: string;
  create_at: string;
  id: string;
  update_at: string;
  url: string;
  total_pages: number;
  total_results: number;
};

type AuthorDetails = {
  name: string;
  username: string;
  avatar_path: string;
  rating: string;
};
