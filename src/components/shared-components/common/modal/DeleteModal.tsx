import Button from '@/components/shared-components/ui/button/Button';
import { Modal } from '@/components/shared-components/ui/modal';

interface DeleteModalProps {
  isOpen: boolean;
  closeModal: () => void;
  handleDelete: () => void;
  slug?: string | null | undefined;
  isLoading?: boolean;
}

const DeleteModal = ({ isOpen, closeModal, handleDelete, slug = 'item', isLoading = false }: DeleteModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      className="max-w-[480px] w-full rounded-xl bg-white dark:bg-gray-900 p-6 sm:p-8"
    >
      <div className="text-center">
        <div className="flex items-center justify-center w-12 h-12 mx-auto mb-5 bg-red-100 rounded-full">
          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v4m0 4h.01M4.93 4.93l14.14 14.14M12 2a10 10 0 1010 10A10.011 10.011 0 0012 2z"
            />
          </svg>
        </div>

        <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Confirm Delete</h4>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Are you sure you want to delete this {slug}? This action cannot be undone.
        </p>
      </div>

      <div className="flex items-center justify-end gap-3 mt-8">
        <Button size="sm" variant="outline" onClick={closeModal} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          size="sm"
          className="bg-red-500 text-white hover:bg-red-600"
          onClick={handleDelete}
          disabled={isLoading}
        >
          {isLoading ? 'Deleting...' : 'Delete'}
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
