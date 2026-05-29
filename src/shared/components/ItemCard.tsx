import Tag from './Tag';

interface ItemCardProps {
  imgUrl: string;
  tag: string;
  title: string;
  date: string;
  onClick?: () => void;
}

const ItemCard = ({ imgUrl, tag, title, date, onClick }: ItemCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-[14px] bg-white text-left"
    >
      <img src={imgUrl} alt={title} className="w-[90px] h-[90px] object-cover rounded-[10px]" />
      <div className="flex flex-col items-start gap-3">
        <Tag variant="primary" label={tag} />
        <h3 className="text-title3 text-black font-semibold">{title}</h3>
        <p className="text-body2 text-gray-300">{date}</p>
      </div>
    </button>
  );
}

export default ItemCard
