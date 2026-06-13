export type IptvProductDuration = "1m" | "3m" | "6m" | "12m";
export type IptvProductCategory = "sports" | "movies" | "premium";
export type IptvProductQuality = "HD" | "FHD" | "4K";

export type IptvProduct = {
  id: string;
  name: string;
  price: number;
  duration: IptvProductDuration;
  category: IptvProductCategory;
  quality: IptvProductQuality;
  deviceLimit: number;
  isActive: boolean;
  visibleFrom: string | null;
  visibleTo: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateIptvProductInput = Omit<IptvProduct, "id" | "createdAt" | "updatedAt">;
export type UpdateIptvProductInput = Partial<CreateIptvProductInput>;
