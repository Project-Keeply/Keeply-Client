import { useState } from 'react';
import { TagButton } from '@shared/components';
import WritePageLayout from '@shared/layouts/WritePageLayout';
import { WritePageTitle } from '@shared/components';

import { DISPOSAL_CATEGORIES, type DisposalCategory } from '@/entities/disposal';

const ManagementWritePage = () => {
  const [selectedCategory, setSelectedCategory] = useState<DisposalCategory>('음료');

  const handleSubmit = () => {};

  return (
    <WritePageLayout label="폐기관리 등록" onSubmit={handleSubmit}>
      <WritePageTitle title='제품 카테고리'/>
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {DISPOSAL_CATEGORIES.map((category) => (
          <TagButton
            key={category}
            label={category}
            isSelected={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          />
        ))}
      </div>
    </WritePageLayout>
  );
};

export default ManagementWritePage;
