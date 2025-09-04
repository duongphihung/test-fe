import { BlockStack, Card, FormLayout, Text, TextField } from "@shopify/polaris";
import { useFormContext, Controller } from "react-hook-form";

const GeneralForm = () => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Card>
            <BlockStack gap="400">
                <Text variant="headingMd" as="h2">
                    General
                </Text>

                <FormLayout>
                    <Controller
                        name="campaign"
                        control={control}
                        rules={{ required: "Campaign is required" }}
                        render={({ field }) => (
                            <TextField
                                label="Campaign"
                                autoComplete="off"
                                {...field}
                                error={errors.campaign?.message && "Campaign is required"}
                            />
                        )}
                    />

                    <Controller
                        name="title"
                        control={control}
                        rules={{ required: "Title is required" }}
                        render={({ field }) => (
                            <TextField
                                label="Title"
                                autoComplete="off"
                                {...field}
                                error={errors.title?.message && "Title is required"}
                            />
                        )}
                    />

                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                label="Description"
                                multiline={3}
                                autoComplete="off"
                                {...field}
                            />
                        )}
                    />
                </FormLayout>
            </BlockStack>
        </Card>
    );
};

export default GeneralForm;