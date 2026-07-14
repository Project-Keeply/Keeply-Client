interface InviteCodeCardProps {
  inviteCode: string;
}

const InviteCodeCard = ({ inviteCode }: InviteCodeCardProps) => {
  return (
    <section className="pt-6">
      <h2 className="text-title2 font-bold text-black">그룹 초대코드</h2>
      <p className="mt-3 text-body2 leading-[1.6] text-gray-800">
        알바생이 그룹에 가입할 때 이 코드를 입력하면 돼요.
      </p>
      <div className="mt-8 flex items-center justify-center rounded-xl bg-lightgray py-8">
        <span className="text-title1 font-bold tracking-[0.1em] text-black">
          {inviteCode}
        </span>
      </div>
    </section>
  );
};

export default InviteCodeCard;
