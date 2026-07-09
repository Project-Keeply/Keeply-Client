import { useUser } from '@/entities/user';
import { useLogOut } from '@/features/auth';

const ProfileInfoSection = () => {
  const { user } = useUser();
  const { mutate: handleLogOut, isPending} = useLogOut()

  return (
    <section className="flex items-center gap-6 px-5 py-7">
      {user.profileImageUrl ? (
        <img
          src={user.profileImageUrl}
          alt={`${user.name} 프로필 이미지`}
          className="size-[52px] shrink-0 rounded-full object-cover"
        />
      ) : (
        <div
          aria-hidden
          className="flex size-[52px] shrink-0 items-center justify-center rounded-full bg-primary-100"
        >
          <span className="text-title2 font-bold text-primary-500">
            {user.name.charAt(0)}
          </span>
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="truncate text-title1 font-bold text-black">{user.name}</p>
        {/* TODO: /users/me 에 groupName 추가 후 매장명 표시 복구
        <p className="mt-2.5 truncate text-body2 text-gray-300">
          {user.storeName}
        </p> */}
      </div>

      <button
        type="button"
        className="shrink-0 cursor-pointer text-label2 font-medium text-gray-300"
        disabled={isPending}
        onClick={() => handleLogOut()}
      >
        로그아웃
      </button>
    </section>
  );
};

export default ProfileInfoSection;
