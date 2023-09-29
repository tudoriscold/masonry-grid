export type RatingType = 1 | 2 | 3 | 4 | 5;

export type RatingVersions = 1 | 2 | 3;

export type MasonryCardProps = {
  name: string;
  verified?: boolean;
  role?: string;
  avatarSrc?: string;
  rating?: RatingType;
  reviewTitle: string;
  review: string;
  platform: string;
  date?: number;
};
