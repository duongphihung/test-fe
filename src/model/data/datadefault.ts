import type { DiscountTypeOption } from "../types/common";

export const discountTypeOptions: DiscountTypeOption[] = [
    { label: 'None', value: 'none' },
    { label: '% discount', value: 'percentage' },
    { label: 'Discount / each', value: 'each' }
];