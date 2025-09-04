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

    const onSubmit = (data: unknown) => {
        console.log("Form data:", data);
    };

    return (
        <Page>
            <InlineStack wrap={false} gap={'200'} blockAlign="center">
                <Button size="large" icon={ArrowLeftIcon} />
                <Text variant="headingLg" as="h2">
                    Online store dashboard
                </Text>
            </InlineStack>
            <br />
            <Grid>
                <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)}>
                            <GeneralForm />
                            <br />
                            <VolumeDiscountForm />
                            <Button submit>Save</Button>
                        </form>
                    </FormProvider>
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
    );
}