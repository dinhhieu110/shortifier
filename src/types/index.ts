export interface IUser {
  id?: string;
  email?: string;
  name?: string;
  password?: string;
  profile_pic?: any;
}

export interface IUrl {
  id?: string;
  original_url?: string;
  short_url?: string;
  custom_url?: string;
  title?: string;
  qr?: string;
  created_at?: any;
  user_id?: string;
}

export interface IClick {
  id?: string;
  urlId?: string;
  city?: string;
  device?: string;
  country?: string;
}
