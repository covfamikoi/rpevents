export interface Admin {
  createConferences: boolean;
  manageAdmins: boolean;
}

export interface Announcement {
  title: string;
  content: string;
  postedAt: any;
}

export interface Location {
  name: string;
  location: any;
}

export interface Event {
  name: string;
  description: string;

  location: number;

  start: any;
  end: any;
}

export interface Conference {
  title: string;

  start: any;
  end: any;

  topLeft: any;
  tileWidth: number;
  tileHeight: number;

  admins: string[];
  announcements: Announcement[];
  locations: Location[];
  events: Event[];
}
