import { useState } from 'react';
import { Input, TextArea } from '@shared/components';

const HomePage = () => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  return (
    <div className="flex flex-col gap-8 p-10">
      <section className="flex flex-col gap-2">
        <Input value={name} placeholder="이름" onChange={setName} />
      </section>

      <section className="flex flex-col gap-2">
        <TextArea
          title="내용"
          explanation="(상세 내용은 필수 사항이 아닙니다.)"
          value={content}
          placeholder="공지사항 내용을 남겨주세요"
          onChange={setContent}
        />
      </section>
    </div>
  );
};

export default HomePage;
