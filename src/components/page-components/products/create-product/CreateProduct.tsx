import { FormContainer } from '@/components/shared-components/common/Container';
import Checkbox from '@/components/shared-components/form/input/Checkbox';
import FileInput from '@/components/shared-components/form/input/FileInput';
import InputField from '@/components/shared-components/form/input/InputField';
import SelectField from '@/components/shared-components/form/input/SelectField';
import TextArea from '@/components/shared-components/form/input/TextArea';
import Button from '@/components/shared-components/ui/button/Button';
import { useProductCategoryOptions } from '@/hooks/api/useGetOptions';
import { useSupabaseMutation } from '@/hooks/supabase-query/useSupabaseMutation';
import { mutationType } from '@/utils/enums';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

interface createProps {
  isEditing: boolean;
  editingDetails: any;
  refetch?: any;
  closeModal: any;
}

const createProductSchema = z.object({
  title: z.string().min(3, { message: 'Product Category required' }),
  description: z.string().min(3, { message: 'Product Category required' }),
  image_url: z.any(),
  category_id: z.string().optional(),
  is_loved: z.boolean().optional(),
  is_latest: z.boolean().optional(),
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
      title: isEditing ? editingDetails?.title ?? '' : '',
      category_id: isEditing ? String(editingDetails?.category_id) ?? '' : '',
      description: isEditing ? editingDetails?.description ?? '' : '',
      is_loved: isEditing ? editingDetails?.is_loved ?? false : false,
      is_latest: isEditing ? editingDetails?.is_loved ?? false : false,
      image_url: isEditing ? editingDetails?.image_url ?? [] : [],
    },
  });

  const { mutate, isPending } = useSupabaseMutation({
    table: 'Collections',
    type: isEditing ? mutationType.UPDATE : mutationType.INSERT,
    ...(isEditing && { match: { id: editingDetails?.id } }),
  });

  const onSubmit = async (value: any) => {
    const image = value?.image_url;

    const payload = {
      ...value,
      image_url: null,
    };
    mutate({
      data: payload,
      isEditing,
      onSuccessCallback: () => {
        toast.success(isEditing ? 'Updated product' : 'Created product');
        closeModal();
        refetch();
      },
      onErrorCallback: (err) => {
        const msg = err?.message || 'Error occurred';
        toast.error(msg);
      },
    });
  };

  const { options, isLoading, error } = useProductCategoryOptions();

  return (
    <FormContainer title={`${isEditing ? `Edit` : `Add`} products`}>
      <form className="flex flex-col " onSubmit={handleSubmit(onSubmit)}>
        <div className="custom-scrollbar h-fit overflow-y-auto px-2 pb-3 space-y-4">
          <Controller
            name={`title`}
            control={control}
            render={({ field }) => (
              <InputField
                name={field.name}
                type="text"
                label="Product name"
                defaultValue={field.value}
                onChange={field.onChange}
                errorMessage={errors?.title?.message as string | undefined}
                placeholder="Product name"
              />
            )}
          />

          <Controller
            name={`description`}
            control={control}
            render={({ field }) => (
              <TextArea
                label="Description"
                defaultValue={field.value}
                onChange={field.onChange}
                rows={4}
                placeholder="Add Description"
                errorMessage={errors?.description?.message}
              />
            )}
          />

          <Controller
            name="category_id"
            control={control}
            render={({ field }) => (
              <SelectField
                id="category"
                label="Category"
                value={field.value ?? ''}
                onChange={(v) => field.onChange(v)}
                options={options}
                placeholder={isLoading ? 'Loading categories...' : 'Select a category'}
                disabled={isLoading}
                error={errors?.category_id?.message as string}
              />
            )}
          />

          <Controller
            name={`image_url`}
            control={control}
            render={({ field }) => (
              <FileInput
                id="image"
                label={'Image'}
                value={field.value}
                onChange={(file) => field.onChange(file)}
                onRemove={() => field.onChange(null)}
                errors={errors.image_url?.message as string | undefined}
              />
            )}
          />

          <div className="flex gap-6">
            <Controller
              name="is_loved"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id={field.name}
                  label="Loved product"
                  checked={!!field.value} // ensures it's a boolean
                  onChange={(checked) => field.onChange(checked)} // updates form state
                  disabled={false} // optional
                />
              )}
            />

            <Controller
              name="is_latest"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id={field.name}
                  label="Latest product"
                  checked={!!field.value}
                  onChange={(checked) => field.onChange(checked)} // updates form state
                  disabled={false} // optional
                />
              )}
            />
          </div>
        </div>
        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
          <Button size="sm" type="submit" disabled={isPending}>
            Save Changes
          </Button>
        </div>
      </form>
    </FormContainer>
  );
};

export default CreateProduct;
