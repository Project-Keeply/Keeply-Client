interface ToastCardProps {
  message: string;
}

const ToastCard = ({ message }: ToastCardProps) => {
  return (
    <div className="w-full rounded-3xl bg-gray-800/70 px-[30px] py-[20px] shadow-lg backdrop-blur-sm">
      <p className="text-body2 text-white">{message}</p>
    </div>
  );
};

export default ToastCard;
