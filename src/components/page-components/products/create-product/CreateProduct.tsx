import { FormContainer } from '@/components/shared-components/common/Container';
import Checkbox from '@/components/shared-components/form/input/Checkbox';
import FileInput from '@/components/shared-components/form/input/FileInput';
import InputField from '@/components/shared-components/form/input/InputField';
import Button from '@/components/shared-components/ui/button/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

interface createProps {
  isEditing: boolean;
  editingDetails: any;
  refetch?: any;
  closeModal: any;
}

const createProductSchema = z.object({
  category_title: z.string().min(3, { message: 'Product Category required' }),
  is_main_collection: z.boolean().optional(),
  image: z.any(),
});

const CreateProduct = ({ isEditing, editingDetails, refetch, closeModal }: createProps) => {
  type Inputs = z.infer<typeof createProductSchema>;
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
    control,
  } = useForm<Inputs>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      category_title: isEditing ? editingDetails?.category_title ?? '' : '',
      is_main_collection: isEditing ? editingDetails?.is_main_collection ?? false : false,
      image: isEditing ? editingDetails?.image ?? [] : [],
    },
  });

  // const { mutate, isPending } = useApiMutation(
  //   isEditing ? `adventure-categories/${editingDetails?.slug}/` : `adventure-categories/`
  // );

  const onSubmit = async (value: any) => {
    // mutate({
    //   data: { ...value },
    //   isEditing: isEditing,
    //   isMultipart: false,
    //   onSuccessCallback: () => {
    //     toast.success(isEditing ? 'Successfully edited product category' : 'Successfully created product category');
    //     closeModal();
    //     refetch();
    //   },
    //   onErrorCallback: (resp) => {
    //     const errorData = resp?.message?.data;
    //     const messages = extractErrorMessages(errorData);
    //     messages.forEach((msg) => toast.error(msg));
    //   },
    // });
  };

  return (
    <FormContainer title={`${isEditing ? `Edit` : `Add`} product Category`}>
      <form className="flex flex-col " onSubmit={handleSubmit(onSubmit)}>
        <div className="custom-scrollbar h-fit overflow-y-auto px-2 pb-3 space-y-4">
          <Controller
            name={`category_title`}
            control={control}
            render={({ field }) => (
              <InputField
                name={field.name}
                type="text"
                label="Product category name"
                defaultValue={field.value}
                onChange={field.onChange}
                errorMessage={errors?.category_title?.message as string | undefined}
                placeholder="Product Category title"
              />
            )}
          />

          <Controller
            name={`image`}
            control={control}
            render={({ field }) => (
              <FileInput
                id="image"
                label={'Image'}
                value={field.value}
                onChange={(file) => field.onChange(file)}
                onRemove={() => field.onChange(null)}
                errors={errors.image?.message as string | undefined}
              />
            )}
          />

          <div className="flex gap-6">
            <Controller
              name="is_main_collection"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id={field.name}
                  label="Main collection"
                  checked={!!field.value} // ensures it's a boolean
                  onChange={(checked) => field.onChange(checked)} // updates form state
                  disabled={false} // optional
                />
              )}
            />
          </div>
        </div>
        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
          <Button size="sm" type="submit" disabled={false}>
            Save Changes
          </Button>
        </div>
      </form>
    </FormContainer>
  );
};

export default CreateProduct;
