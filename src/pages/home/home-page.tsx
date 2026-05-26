import { Tag } from '@shared/components';

const HomePage = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-title2 font-semibold">Tag</h2>

      <section className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Tag variant="primary" label="주간" />
          <Tag variant="primary" label="훈진" />
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Tag variant="secondary" label="일일" />
          <Tag variant="secondary" label="진훈" />
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <ul className="flex flex-col gap-2">
          <li className="flex items-center gap-2">
            <Tag variant="primary" label="주간" />
            <span className="text-body2">종업원 근무일지</span>
          </li>
          <li className="flex items-center gap-2">
            <Tag variant="primary" label="주간" />
            <span className="text-body2">종업원 근무일지</span>
          </li>
          <li className="flex items-center gap-2">
            <Tag variant="secondary" label="일일" />
            <span className="text-body2">종업원 근무일지</span>
          </li>
          <li className="flex items-center gap-2">
            <Tag variant="primary" label="주간" />
            <span className="text-body2">종업원 근무일지</span>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default HomePage;
