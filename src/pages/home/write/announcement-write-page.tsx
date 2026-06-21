import WritePageLayout from "@shared/layouts/WritePageLayout";
import { ImgUploadButton } from '@shared/components';

const AnnouncementWritePage = () => {
  return (
    <WritePageLayout label="공지사항 등록" onSubmit={() => {}}>
      <ImgUploadButton onChange={() => {}} />
    </WritePageLayout>
  )
}

export default AnnouncementWritePage
