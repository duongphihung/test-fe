import type { Option } from "../../model/types/common";
import {
    Badge,
    BlockStack,
    Button,
    Card,
    FormLayout,
    InlineGrid,
    InlineStack,
    Select,
    Text,
    TextField,
} from "@shopify/polaris";
import { DeleteIcon, PlusIcon } from "@shopify/polaris-icons";
import { discountTypeOptions } from "../../model/data/datadefault";
import {
    Controller,
    useFieldArray,
    useFormContext,
    useWatch,
} from "react-hook-form";

const VolumeDiscountForm = () => {
    const {
        control,
        formState: { errors },
    } = useFormContext<{ options: Option[] }>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "options",
    });

    const options = useWatch({ control, name: "options" });

    const handleAdd = () => {
        const lastOption = options?.[options.length - 1]; 
        const nextQuantity = lastOption
            ? String(Number(lastOption.quantity) + 1)
            : "1";

        append({
            id: fields.length + 1,
            title: "",
            subtitle: "",
            label: "",
            quantity: nextQuantity,
            discountType: "none",
            amount: "",
        });
    };

    const optionErrors = errors.options || [] ;

    return (
        <Card>
            <BlockStack gap="400">
                <Text variant="headingMd" as="h2">
                    Volume discount rule
                </Text>

                <BlockStack gap="600">
                    {fields.map((option, index) => (
                        <Card key={option.id}>
                            <BlockStack gap="400">
                                <InlineStack align="space-between" blockAlign="center">
                                    <Badge tone="critical">{`OPTION ${index + 1}`}</Badge>
                                    <Button
                                        icon={DeleteIcon}
                                        variant="tertiary"
                                        onClick={() => remove(index)}
                                    />
                                </InlineStack>

                                <FormLayout>
                                    <InlineGrid columns={3} gap="400">
                                        <Controller
                                            name={`options.${index}.title`}
                                            control={control}
                                            rules={{ required: "Title is required" }}
                                            render={({ field }) => (
                                                <TextField
                                                    label="Title"
                                                    autoComplete="off"
                                                    {...field}
                                                    error={optionErrors[index]?.title?.message}
                                                />
                                            )}
                                        />
                                        <Controller
                                            name={`options.${index}.subtitle`}
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    label="Subtitle"
                                                    autoComplete="off"
                                                    {...field}
                                                    error={optionErrors[index]?.subtitle?.message}
                                                />
                                            )}
                                        />
                                        <Controller
                                            name={`options.${index}.label`}
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    label="Label (optional)"
                                                    autoComplete="off"
                                                    {...field}
                                                    error={optionErrors[index]?.label?.message}
                                                />
                                            )}
                                        />
                                    </InlineGrid>

                                    <InlineGrid
                                        columns={options?.[index]?.discountType !== "none" ? 3 : 2}
                                        gap="400"
                                    >
                                        <Controller
                                            name={`options.${index}.quantity`}
                                            control={control}
                                            rules={{
                                                required: "Quantity is required",
                                                min: { value: 1, message: "Quantity must be at least 1" },
                                            }}
                                            render={({ field }) => (
                                                <TextField
                                                    label="Quantity"
                                                    autoComplete="off"
                                                    type="number"
                                                    {...field}
                                                    error={optionErrors[index]?.quantity?.message}
                                                />
                                            )}
                                        />
                                        <Controller
                                            name={`options.${index}.discountType`}
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    label="Discount type"
                                                    options={discountTypeOptions}
                                                    {...field}
                                                    onChange={(value) => field.onChange(value)}
                                                    value={field.value}
                                                />
                                            )}
                                        />
                                        {options?.[index]?.discountType !== "none" && (
                                            <Controller
                                                name={`options.${index}.amount`}
                                                control={control}
                                                rules={{
                                                    required: "Amount is required",
                                                    min: { value: 0, message: "Amount cannot be negative" },
                                                }}
                                                render={({ field }) => (
                                                    <TextField
                                                        label="Amount"
                                                        autoComplete="off"
                                                        type="number"
                                                        suffix={
                                                            options?.[index]?.discountType === "percentage"
                                                                ? "%"
                                                                : "$"
                                                        }
                                                        {...field}
                                                        error={optionErrors[index]?.amount?.message}
                                                    />
                                                )}
                                            />
                                        )}
                                    </InlineGrid>
                                </FormLayout>
                            </BlockStack>
                        </Card>
                    ))}
                </BlockStack>

                <Button
                    onClick={handleAdd}
                    icon={PlusIcon}
                    variant="primary"
                    fullWidth
                    size="large"
                >
                    Add option
                </Button>
            </BlockStack>
        </Card>
    );
};

export default VolumeDiscountForm;
