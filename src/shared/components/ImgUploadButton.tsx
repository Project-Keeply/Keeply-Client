import { useEffect,useRef, useState } from 'react';
import type { ChangeEvent } from 'react';

import { WritePageTitle } from '@/shared/components';
import { IcUploadArrow } from '@/shared/icons';

interface ImgUploadButtonProps {
  onChange: (files: FileList) => void;
}

const ImgUploadButton = ({ onChange }: ImgUploadButtonProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onChange(e.target.files);
      setPreviewUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <>
      <WritePageTitle
        title="이미지"
        explanation="(이미지 첨부는 필수 사항이 아닙니다.)"
      />
      <button
        type="button"
        onClick={handleButtonClick}
        className="h-[150px] w-[150px] cursor-pointer overflow-hidden rounded-2xl bg-primary-100"
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="업로드 이미지 미리보기"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <IcUploadArrow />
          </div>
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </>
  );
};

export default ImgUploadButton;
