export interface FoundationLog {
  id: string;
  type: string;
  category?: string | null;
  title: string;
  content: string;
  imageUrls: string;
  youtubeId?: string | null;
  eventDate: string | Date;
  metrics?: string | null;
  isPublished: boolean;
}

export interface Initiative {
  id: string;
  category?: string | null;
  title: string;
  description: string;
  status: string;
  link?: string | null;
  imageUrl?: string | null;
  metrics?: string | null;
  isPublished: boolean;
}

export interface Donation {
  id: string;
  amount: number;
  donorName: string;
  date: string | Date;
}
