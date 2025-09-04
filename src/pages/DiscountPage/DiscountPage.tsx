import { Button, Grid, InlineStack, Page, Text } from "@shopify/polaris";
import { ArrowLeftIcon } from '@shopify/polaris-icons';
import GeneralForm from "../../components/GeneralForm/GeneralForm";
import VolumeDiscountForm from "../../components/VolumeDiscountForm/VolumeDiscountForm";
import DiscountPreview from "../../components/DiscountPreview/DiscountPreview";
import { FormProvider, useForm } from "react-hook-form";
import type { Option } from "../../model/types/common";

export default function DiscountPage() {
    const methods = useForm({
        mode: "onChange",
        defaultValues: {
            campaign: "",
            title: "",
            description: "",
            options: [
                {
                    id: 1,
                    title: 'Single',
                    subtitle: 'Standard price',
                    label: '',
                    quantity: '1',
                    discountType: 'none',
                    amount: '',
                },
                {
                    id: 2,
                    title: 'Duo',
                    subtitle: 'Save 10%',
                    label: 'Popular',
                    quantity: '2',
                    discountType: 'percentage',
                    amount: '10',
                },
            ],
        },
    });

    const watchOptions: Option[] = methods.watch("options");

    const onSubmit = async (data: unknown) => {
        console.log("Form data:", data);

        try {
            const response = await new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        ok: true,
                        status: 200,
                        json: () => Promise.resolve({ message: "Discount saved successfully!" })
                    });
                }, 1500);
            });

            const result = await (response as any).json();
            alert(result.message);
        } catch (error) {
            alert("Something went wrong!");
        }
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Page>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <InlineStack wrap={false} gap={'200'} blockAlign="center">
                            <Button size="large" icon={ArrowLeftIcon} />
                            <Text variant="headingLg" as="h2">
                                Online store dashboard
                            </Text>
                        </InlineStack>
                        <Button size="large" variant="primary" tone="success" onClick={methods.handleSubmit(onSubmit)}>
                            Save
                        </Button>
                    </div>
                    <br />
                    <Grid>
                        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>

                            <GeneralForm />
                            <br />
                            <VolumeDiscountForm />

                        </Grid.Cell>
                        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                            <DiscountPreview
                                title={"Buy more and save"}
                                description={"Apply for all products in store"}
                                options={watchOptions}
                            />
                        </Grid.Cell>
                    </Grid>
                </Page>
            </form>
        </FormProvider >
    );
}