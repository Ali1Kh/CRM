import { Skeleton } from "../components/ui/index";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function useReverseLocation(coordinates: number[]) {
  const params = useParams();
  const [reverseLoc, setReverseLoc] = useState(
    <Skeleton className="h-4 w-3/4" />
  );
  useEffect(() => {
    if (coordinates) {
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[0]},${
          coordinates[1]
        }.json?access_token=${process.env.NEXT_PUBLIC_MAP_TOKEN}&language=${
          params.lng || "en"
        }`
      )
        .then((response) => response.json())
        .then((data) => {
          const locationName = data.features[0].place_name;
          setReverseLoc(locationName);
        });
    }
  });

  return { reverseLoc };
}

export default useReverseLocation;
