import { useState } from 'react';
import { Input } from '@shared/components';

const HomePage = () => {
  const [name, setName] = useState('');

  return (
    <div className="flex flex-col gap-8 p-[25px]">

      <section className="flex flex-col gap-2">
        <Input text={name} placeholder="이름" onChange={setName} />
      </section>

    </div>
  );
};

export default HomePage;
