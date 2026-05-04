import { ReviewCount } from "@/types/Product";
import Stars from "./Stars";

interface ReviewOverviewProps {
  reviewCount: ReviewCount;
}

const ReviewOverview = ({ reviewCount }: ReviewOverviewProps) => {
  // 1. 데이터가 없을 경우를 대비한 기본값 설정 (Optional Chaining)
  const { sumScore = 0, ...rest } = (reviewCount || {}) as ReviewCount;

  const ratings = [
    rest.rate5Length || 0,
    rest.rate4Length || 0,
    rest.rate3Length || 0,
    rest.rate2Length || 0,
    rest.rate1Length || 0,
  ];

  // 2. 전체 개수 계산
  const rateTotal = ratings.reduce((acc, cur) => acc + cur, 0);

  // 3. 평균 계산 시 0으로 나누기 방지 (핵심 예외 처리)
  const average = rateTotal > 0 ? (sumScore / rateTotal).toFixed(1) : "0.0";

  // 4. 그래프 최대치 계산 (분모가 0이 되지 않도록 최소값 1 설정)
  const maxRatingCount = Math.max(...ratings, 1);

  return (
    <div className="border-gray03 flex h-68.75 items-center justify-between rounded-xl border px-61">
      <div className="flex flex-col items-center gap-6 leading-none">
        <p className="text-gray03 text-[2.375rem] leading-none font-extrabold">
          <span className="text-black01 text-[4rem]">{average}</span> / 5
        </p>
        <Stars
          rating={Number(average)}
          size="large"
        />
      </div>
      <div className="flex flex-col gap-5">
        {ratings.map((rating, index) => (
          <div
            className="flex gap-7.5 text-xl leading-none font-bold"
            key={index}
          >
            <p className="font-extrabold">{5 - index}점</p>
            <div className="bg-gray04 h-2.5 w-92.5 overflow-hidden rounded-xl">
              <div
                className="bg-yellow01 h-2.5 rounded-xl transition-all duration-300"
                // 5. 안전한 그래프 너비 계산
                style={{ width: `${(rating / maxRatingCount) * 100}%` }}
              />
            </div>
            <p className="w-8 text-right">{rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewOverview;
