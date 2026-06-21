import { useState } from 'react';
import { ImgUploadButton, TextArea } from '@shared/components';
import WritePageLayout from "@shared/layouts/WritePageLayout";

const AnnouncementWritePage = () => {
  const [content, setContent] = useState('');

  return (
    <WritePageLayout label="공지사항 등록" onSubmit={() => {}}>
      <TextArea
        title="내용"
        explanation="(상세 내용은 필수 사항이 아닙니다.)"
        placeholder="공지사항 내용을 남겨주세요"
        value={content}
        onChange={setContent}
      />
      <ImgUploadButton onChange={() => {}} />
    </WritePageLayout>
  )
}

export default AnnouncementWritePage
