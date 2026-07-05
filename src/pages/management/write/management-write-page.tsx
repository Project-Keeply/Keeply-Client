import { DisposalWriteForm } from '@/features/disposal-write';

/**
 * 폐기관리 글쓰기 페이지 (라우팅 슬롯)
 * - disposal-write feature 의 폼을 렌더한다. 로직/조립은 feature 담당.
 */
const ManagementWritePage = () => {
  return <DisposalWriteForm />;
};

export default ManagementWritePage;
