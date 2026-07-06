import DetailPageLayout from '@shared/layouts/DetailPageLayout';

import { TERMS_POLICIES } from './config/terms';

const TermsPage = () => {
  return (
    <DetailPageLayout title="약관 및 정책">
      <div className="divide-y divide-gray-100">
        {TERMS_POLICIES.map(({ id, title, content }) => (
          <section key={id} className="py-7">
            <h2 className="text-body4 font-semibold text-black">{title}</h2>
            <p className="mt-4 text-body1 leading-[1.8] whitespace-pre-line text-gray-800">
              {content}
            </p>
          </section>
        ))}
      </div>
    </DetailPageLayout>
  );
};

export default TermsPage;
