export type RUserType = {
  password: string;
  username: string;
  __v: number;
  _id: string;
};

export type user = {
  value: RUserType;
};

export type RMemoType = {
  _id: string;
  user: string;
  icon: string;
  title: string;
  description: string;
  position: number;
  favorite: boolean;
  favoritePosition: number;
  __v: number;
};
