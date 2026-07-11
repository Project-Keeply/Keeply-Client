/**
 * 공지사항 글쓰기 폼 (뷰)
 * - use-announcement-write-form 훅의 상태를 받아 shared 원자 컴포넌트
 *   (Input · TagButton · TextArea · ImgUploadButton 등)를 WritePageLayout 위에 조립한다.
 * - 폼 로직은 갖지 않는 순수 뷰. (상태/제출은 훅 담당)
 */

import { ImgUploadButton, Input, TagButton, TextArea, WritePageTitle } from '@shared/components';
import WritePageLayout from '@shared/layouts/WritePageLayout';
import { Controller } from 'react-hook-form';

import useAnnouncementWriteForm from '../hooks/use-announcement-write-form';

import { ANNOUNCEMENT_CATEGORIES } from '@/entities/announcement';

const AnnouncementWriteForm = () => {
  const { control, isValid, isPending, submit } = useAnnouncementWriteForm();

  return (
    <WritePageLayout label="공지사항 업로드" disabled={!isValid || isPending} onSubmit={submit}>
      <div className="flex flex-col gap-10">
        <section>
          <WritePageTitle title="제목" />
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input size="md" placeholder="제목을 입력해주세요" value={field.value} onChange={field.onChange} />
            )}
          />
        </section>

        <section>
          <WritePageTitle title="공지사항 태그" />
          <Controller
            name="tag"
            control={control}
            render={({ field }) => (
              <div className="flex gap-3">
                {ANNOUNCEMENT_CATEGORIES.map((category) => (
                  <TagButton
                    key={category}
                    label={category}
                    isSelected={field.value === category}
                    onClick={() => field.onChange(category)}
                  />
                ))}
              </div>
            )}
          />
        </section>

        <section>
          <WritePageTitle title="내용" explanation="(상세 내용은 필수 사항이 아닙니다.)" />
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <TextArea
                placeholder="공지사항 내용을 남겨주세요"
                value={field.value ?? ''}
                onChange={field.onChange}
              />
            )}
          />
        </section>

        <section>
          <WritePageTitle title="이미지" explanation="(이미지 첨부는 필수 사항이 아닙니다.)" />
          <Controller
            name="image"
            control={control}
            render={({ field }) => <ImgUploadButton onChange={(files) => field.onChange(files[0])} />}
          />
        </section>
      </div>
    </WritePageLayout>
  );
};

export default AnnouncementWriteForm;
