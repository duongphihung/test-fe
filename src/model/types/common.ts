export type Option = {
  id: number;
  title: string;
  subtitle: string;
  label: string;
  quantity: string;
  discountType: string;
  amount: string;
};

export interface DiscountTypeOption {
  label: string;
  value: string;
}
export type Errors = {
  [key: string]: {
    message: string;
  };
};
export interface PreviewOption {
  title: string;
  discountType: string;
  quantity: string;
  amount: string;
}
