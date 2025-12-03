import ComponentCard from '@/components/shared-components/common/ComponentCard';
import PageBreadcrumb from '@/components/shared-components/common/PageBreadCrumb';
import ResponsiveImage from '@/components/shared-components/ui/images/ResponsiveImage';
import ThreeColumnImageGrid from '@/components/shared-components/ui/images/ThreeColumnImageGrid';
import TwoColumnImageGrid from '@/components/shared-components/ui/images/TwoColumnImageGrid';

export default function Images() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Images" />
      <div className="space-y-5 sm:space-y-6">
        <ComponentCard title="Responsive image">
          <ResponsiveImage />
        </ComponentCard>
        <ComponentCard title="Image in 2 Grid">
          <TwoColumnImageGrid />
        </ComponentCard>
        <ComponentCard title="Image in 3 Grid">
          <ThreeColumnImageGrid />
        </ComponentCard>
      </div>
    </div>
  );
}
