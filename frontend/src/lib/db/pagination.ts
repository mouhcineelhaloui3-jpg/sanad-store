export type ListParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  segment?: string;
  sort?: "newest" | "oldest" | "name";
};

export type PaginatedResult<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export function parseListParams(searchParams: URLSearchParams): ListParams {
  return {
    page: Math.max(1, Number(searchParams.get("page") ?? 1)),
    limit: Math.min(100, Math.max(1, Number(searchParams.get("limit") ?? 20))),
    search: searchParams.get("search") ?? undefined,
    status: searchParams.get("status") ?? undefined,
    segment: searchParams.get("segment") ?? undefined,
    sort: (searchParams.get("sort") as ListParams["sort"]) ?? "newest"
  };
}

export function paginate<T>(items: T[], page: number, limit: number): PaginatedResult<T> {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;
  return {
    items: items.slice(start, start + limit),
    total,
    page,
    limit,
    totalPages
  };
}

export function buildOrderBy(sort: ListParams["sort"]) {
  switch (sort) {
    case "oldest":
      return { createdAt: "asc" as const };
    case "name":
      return { name: "asc" as const };
    default:
      return { createdAt: "desc" as const };
  }
}
