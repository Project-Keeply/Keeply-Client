/**
 * 폐기관리 글쓰기 폼 (뷰)
 * - use-disposal-write-form 훅의 상태를 받아 shared 원자 컴포넌트
 *   (Input · TagButton · ImgUploadButton 등)를 WritePageLayout 위에 조립한다.
 * - 폼 로직은 갖지 않는 순수 뷰. (상태/제출은 훅 담당)
 */

import {
  ImgUploadButton,
  Input,
  TagButton,
  WritePageTitle,
} from '@shared/components';
import WritePageLayout from '@shared/layouts/WritePageLayout';
import { Controller } from 'react-hook-form';

import useDisposalWriteForm from '../hooks/use-disposal-write-form';

import { DISPOSAL_CATEGORIES } from '@/entities/disposal';

const DisposalWriteForm = () => {
  const { control, isValid, isPending, submit } = useDisposalWriteForm();

  return (
    <WritePageLayout
      label="폐기 업로드"
      disabled={!isValid || isPending}
      onSubmit={submit}
    >
      <div className="flex flex-col gap-10">
        <section>
          <WritePageTitle title="상품명" />
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                size="md"
                placeholder="상품명을 입력해주세요"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </section>

        <section>
          <WritePageTitle title="카테고리 태그" />
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <div className="flex flex-wrap gap-3">
                {DISPOSAL_CATEGORIES.map((category) => (
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
          <WritePageTitle title="유통기한" />
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <Input
                type="date"
                size="md"
                placeholder="유통기한을 입력하세요"
                value={field.value ?? ''}
                onChange={field.onChange}
              />
            )}
          />
        </section>

        <section>
          <WritePageTitle
            title="이미지"
            explanation="(상품 이미지를 등록해주세요.)"
          />
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <ImgUploadButton onChange={(files) => field.onChange(files[0])} />
            )}
          />
        </section>
      </div>
    </WritePageLayout>
  );
};

export default DisposalWriteForm;
