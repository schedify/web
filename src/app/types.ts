export type PageProps = {
  params: Promise<{ [key: string]: string }>;
  searchParams: Promise<{ [key: string]: string | string[] }>;
};

export type App = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};
