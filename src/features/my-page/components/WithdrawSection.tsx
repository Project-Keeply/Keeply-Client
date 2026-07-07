import { useState } from 'react';
import { BaseBottomSheet, Button, CheckButton } from '@shared/components';
import useRouteNavigation from '@shared/hooks/use-route-navigation';
import { ROUTE_PATH } from '@shared/router/path';

const WITHDRAW_NOTICES = [
  '탈퇴 시 카카오 계정 연결이 해제되고, 개인정보는 지체 없이 파기됩니다.',
  '작성하신 공지사항과 운영 기록은 매장 운영을 위해 유지되며, 작성자는 ‘탈퇴한 사용자’로 표시됩니다.',
  '탈퇴 후 재가입하더라도 기존 계정의 정보는 복구되지 않습니다.',
];

const WithdrawSection = () => {
  const [isAgreed, setIsAgreed] = useState(false);
  const [isConfirmSheetOpen, setIsConfirmSheetOpen] = useState(false);
  const { handleNavigate } = useRouteNavigation();

  const handleAgreeClick = () => {
    setIsAgreed((prev) => !prev);
  };

  const handleWithdrawClick = () => {
    setIsConfirmSheetOpen(true);
  };

  const handleConfirmSheetClose = () => {
    setIsConfirmSheetOpen(false);
  };

  const handleWithdrawConfirmClick = () => {
    // TODO: 회원 탈퇴 API 연동 후 토큰/사용자 상태를 초기화
    setIsConfirmSheetOpen(false);
    handleNavigate(ROUTE_PATH.LOGIN);
  };

  return (
    <>
      <div className="flex h-full flex-col pb-10 pt-6">
        <div className="flex-1">
          <h2 className="text-title2 font-bold text-black">
            탈퇴하기 전에 꼭 확인해주세요
          </h2>
          <ul className="mt-6 flex flex-col gap-4">
            {WITHDRAW_NOTICES.map((notice) => (
              <li key={notice} className="flex gap-2.5">
                <span
                  aria-hidden
                  className="mt-[7px] size-1.5 shrink-0 rounded-full bg-gray-200"
                />
                <p className="text-body2 leading-[1.6] text-gray-800">
                  {notice}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <CheckButton
              size="sm"
              hasBackground
              isChecked={isAgreed}
              onClick={handleAgreeClick}
            >
              위 내용을 모두 확인했습니다
            </CheckButton>
          </div>
        </div>
        <div className="flex shrink-0 flex-col gap-4">
          <Button
            variant="red"
            size="large"
            disabled={!isAgreed}
            onClick={handleWithdrawClick}
          >
            탈퇴하기
          </Button>
        </div>
      </div>
      <BaseBottomSheet
        open={isConfirmSheetOpen}
        onClose={handleConfirmSheetClose}
      >
        <div className="flex flex-col gap-10 p-8 pb-[max(1.5625rem,env(safe-area-inset-bottom))]">
          <div className="text-center">
            <h2 className="text-title2 font-bold text-black">
              정말 탈퇴하시겠어요?
            </h2>
            <p className="mt-3 text-body2 text-gray-300">
              탈퇴 후에는 되돌릴 수 없어요.
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={handleConfirmSheetClose}
            >
              취소
            </Button>
            <Button
              variant="red"
              className="flex-1"
              onClick={handleWithdrawConfirmClick}
            >
              탈퇴하기
            </Button>
          </div>
        </div>
      </BaseBottomSheet>
    </>
  );
};

export default WithdrawSection;
