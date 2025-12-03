import PageBreadcrumb from '@/components/shared-components/common/PageBreadCrumb';
import VideosExample from '@/components/shared-components/ui/video/VideosExample';

export default function VideoPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Videos" />

      <VideosExample />
    </div>
  );
}
