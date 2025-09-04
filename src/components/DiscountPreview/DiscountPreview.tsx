import { BlockStack, Card, Text } from "@shopify/polaris";
import type { Option, PreviewOption } from "../../model/types/common";

interface DiscountPreviewProps {
    title?: string;
    description?: string;
    options?: Option[];
}
const DiscountPreview = ({
    title,
    description ,
    options
}: DiscountPreviewProps) => {
    const getDiscountTypeDisplay = (type: PreviewOption['discountType']): string => {
        switch (type) {
            case 'percentage':
                return '%discount';
            case 'each':
                return '$/each';
            default:
                return 'None';
        }
    };

    const getAmountDisplay = (option: PreviewOption): string => {
        if (option.discountType === 'none' || !option.amount) {
            return '';
        }
        if (option.discountType === 'percentage') {
            return `${option.amount} %`;
        }
        if (option.discountType === 'each') {
            return `$${option.amount}`;
        }
        return option.amount;
    };

    return (
        <Card>
            <BlockStack gap="400">
                <Text variant="headingMd" as="h2">
                    Preview
                </Text>

                <BlockStack gap="200" align="center">
                    <Text variant="headingLg" as="h3" alignment="center">
                        {title}
                    </Text>
                    <Text variant="bodyMd" tone="subdued" as="h3">
                        {description}
                    </Text>
                </BlockStack>

                <div style={{
                    border: '1px solid #e1e3e5',
                    borderRadius: '6px',
                    overflow: 'hidden'
                }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={tableHeaderStyle}>Title</th>
                                <th style={tableHeaderStyle}>Discount Type</th>
                                <th style={tableHeaderStyle}>Quantity</th>
                                <th style={tableHeaderStyle}>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {options?.map((option, index) => (
                                <tr key={index}>
                                    <td style={tableCellStyle}>{option.title}</td>
                                    <td style={tableCellStyle}>{getDiscountTypeDisplay(option.discountType)}</td>
                                    <td style={tableCellStyle}>{option.quantity}</td>
                                    <td style={tableCellStyle}>{getAmountDisplay(option)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </BlockStack>
        </Card>
    );
}

export default DiscountPreview

const tableHeaderStyle: React.CSSProperties = {
        padding: '12px 16px',
        borderBottom: '1px solid #e1e3e5',
        backgroundColor: '#f6f6f7',
        fontWeight: 600,
        color: '#616161',
        fontSize: '14px'
    };

    const tableCellStyle: React.CSSProperties = {
        padding: '12px 16px',
        borderBottom: '1px solid #e1e3e5',
        fontSize: '14px',
        color: '#303030'
    };