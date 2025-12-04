'use client';
import ComponentCard from '@/components/shared-components/common/ComponentCard';
import DeleteModal from '@/components/shared-components/common/modal/DeleteModal';
import { AddIcon } from '@/components/shared-components/common/svgIcons';
import ReactTableLoader from '@/components/shared-components/tables/ReactTableLoader';
import ReactTableWrapper from '@/components/shared-components/tables/ReactTableWrapper';
import IconBtn from '@/components/shared-components/ui/button/IconBtn';
import { Modal } from '@/components/shared-components/ui/modal';
import { useFetchQuery } from '@/hooks/api/useFetchQuery';
import { useSupabaseMutation } from '@/hooks/supabase-query/useSupabaseMutation';
import { useModal } from '@/hooks/useModal';
import { useTableColumns } from '@/hooks/useTableColumns';
import { ColumnType, mutationType } from '@/utils/enums';
import { ColumnKey } from '@/utils/types';
import { useState } from 'react';
import { toast } from 'react-toastify';
import CreateProductCategories from './create-product-categories/CreateProductCategories';

const ProductsCategories = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const { isOpen: deleteModalIsOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal();

  const [deleteId, setDeleteId] = useState<null | string>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingDetails, setEditingDetails] = useState<null | any>(null);

  const { data, isLoading, error, refetch } = useFetchQuery({
    endpoint: '/api/categories',
    queryKey: ['categories'],
    // queryParams: { main_collection: false },
  });

  const columnsKey: ColumnKey[] = [
    { header: 'Category title', accessorKey: 'category_title' },
    { header: 'main collection', accessorKey: 'is_main_collection', type: ColumnType.BOOLEAN },
    {
      header: '',
      type: ColumnType.ACTIONS,
      showDetailPopup: false,
      showAddMore: false,
      route: `/explore-trips/trips/`,
    },
  ];

  const { Columns } = useTableColumns({
    openDeleteModal,
    setDeleteSlug: setDeleteId,
    openModal,
    setIsEditing,
    setEditingDetails,
    columnsKey,
    getId: true,
  });

  // const { currentData, totalPages, handlePageChange, currentPage, totalCount, handleSelectedPage } = usePagination({
  //   data,
  //   page,
  //   setPage,
  //   itemPerPage,
  // });

  const { mutate, isPending } = useSupabaseMutation({
    table: 'Categories',
    type: mutationType.DELETE,
    match: { id: deleteId },
  });

  const handleDelete = () => {
    mutate({
      onSuccessCallback: () => {
        toast.success('Category deleted!');
        closeDeleteModal();
        refetch();
      },
      onErrorCallback: (err) => {
        toast.error(err?.message || 'Delete failed');
      },
    });
  };
  return (
    <ComponentCard title={'Products Categories'}>
      <div className="flex justify-end mb-4">
        <IconBtn
          openModal={() => {
            openModal();
            setIsEditing(false);
            setEditingDetails(null);
          }}
          icon={AddIcon}
          text=" Add Product category"
        />
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <CreateProductCategories
          isEditing={isEditing}
          editingDetails={editingDetails}
          closeModal={closeModal}
          refetch={refetch}
        />
      </Modal>

      <DeleteModal
        isOpen={deleteModalIsOpen}
        closeModal={closeDeleteModal}
        handleDelete={handleDelete}
        slug={'product category'}
        isLoading={isPending}
      />

      {isLoading ? (
        <ReactTableLoader columns={Columns} rowCount={5} />
      ) : (
        <>
          <ReactTableWrapper data={data || []} columns={Columns} />

          {/* <Pagination
            data={currentData}
            totalCount={totalCount}
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            handleSelectedPage={handleSelectedPage}
          /> */}
        </>
      )}
    </ComponentCard>
  );
};

export default ProductsCategories;
