import { Star, StarHalf } from "lucide-react";
import { ReactElement } from "react";
export interface IRatings {
  value: number;
}
const Ratings = ({ value }: IRatings) => {
  const MAX_RATING = 5;
  // calcuate decimal rating from input
  const full_stars = Math.floor(value);
  const half_stars = Math.round(value - full_stars);
  const empty_stars = MAX_RATING - (full_stars + half_stars);

  //render
  const FullStars = () => {
    return Array.from({ length: full_stars }, (_, k) => (
      <Star className="stroke-primary" key={k} />
    ));
  };
  const HalfStars = () => {
    return Array.from({ length: half_stars }, (_, k) => (
      <StarHalf className="stroke-primary" key={k} />
    ));
  };

  const EmptyStars = () => {
    return Array.from({ length: empty_stars }, (_, k) => (
      <Star className="stroke-primary" key={k} />
    ));
  };

  return (
    <div className="flex 500 p-2 items-center space-x-1">
      {/* <FullStars />
      <HalfStars />
      <EmptyStars /> */}
      <p className="text-primary pl-2">{value} / 5</p>
    </div>
  );
};

export default Ratings;
