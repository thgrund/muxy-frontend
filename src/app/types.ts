export type MuxyEvents = {
  count: number;
  next: MuxyEvent;
  previous: MuxyEvent;
  results: Array<MuxyEvent>;
};

export type MuxyEvent = {
  url: string;
  name: string;
  slug: string;
  description: string;
  starts_at: string;
  ends_at: string;
  active: boolean;
  preparation_time: number;
  rtmp_url: string;
  public_rtmp_url: string;
  contact_email: string;
};

export type MuxyStream = {
  url: string;
  publisher_name: string;
  publisher_email: string;
  title: string;
  description: string;
  location: string;
  timezone: string;
  key?: string;
  live_at: string;
  event: string;
  recordings: string;
  starts_at: string;
  ends_at: string;
};

export type EmptyMuxyStream = {
  starts_at: string;
  ends_at: string;
};

export type MuxyStreams = {
  count: number;
  next: string;
  previous: string;
  results: Array<MuxyStream>;
};
