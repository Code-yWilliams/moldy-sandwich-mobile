export type AccountStatus = "verified" | "unverified" | "closed";

export type Account = {
  id: number;
  email: string;
  status: AccountStatus;
};
