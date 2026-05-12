const Home = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      {/* 컬러 토큰 테스트 */}
      <div className="bg-primary-500 text-white p-4 rounded">
        primary-500
      </div>
      <div className="bg-primary-100 text-primary-800 p-4 rounded">
        primary-100 / primary-800
      </div>
      <div className="bg-gray-100 text-gray-300 p-4 rounded">
        gray-100 / gray-300
      </div>

      {/* 타이포그래피 토큰 테스트 */}
      <p className="text-headline1">headline1 — 18px</p>
      <p className="text-title2">title2 — 16px</p>
      <p className="text-body2">body2 — 14px</p>
      <p className="text-caption1">caption1 — 12px</p>
    </div>
  )
}

export default Home
