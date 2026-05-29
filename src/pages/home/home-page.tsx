import ItemCard from '../../shared/components/ItemCard';

const MOCK_ITEMS = [
  {
    id: 1,
    imgUrl: 'https://placehold.co/90x90',
    tag: '음료',
    title: '스타벅스 카페라떼',
    date: '2026.05.02 16:00 까지',
  },
  {
    id: 2,
    imgUrl: 'https://placehold.co/90x90',
    tag: '식품',
    title: '삼각김밥 참치마요',
    date: '2026.05.03 09:00 까지',
  },
];

const HomePage = () => {
  return (
    <div className="flex flex-col gap-4 p-10">
      {MOCK_ITEMS.map((item) => (
        <ItemCard
          onClick={() => alert(`임시 아이템 클릭: ${item.title}`)}
          key={item.id}
          imgUrl={item.imgUrl}
          tag={item.tag}
          title={item.title}
          date={item.date}
        />
      ))}
    </div>
  );
};

export default HomePage;
