import PageBreadcrumb from '@/components/shared-components/common/PageBreadCrumb';
import DefaultModal from '@/components/shared-components/example/ModalExample/DefaultModal';
import FormInModal from '@/components/shared-components/example/ModalExample/FormInModal';
import FullScreenModal from '@/components/shared-components/example/ModalExample/FullScreenModal';
import ModalBasedAlerts from '@/components/shared-components/example/ModalExample/ModalBasedAlerts';
import VerticallyCenteredModal from '@/components/shared-components/example/ModalExample/VerticallyCenteredModal';

export default function Modals() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Modals" />
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2 xl:gap-6">
        <DefaultModal />
        <VerticallyCenteredModal />
        <FormInModal />
        <FullScreenModal />
        <ModalBasedAlerts />
      </div>
    </div>
  );
}
