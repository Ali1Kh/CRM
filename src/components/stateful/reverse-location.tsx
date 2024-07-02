import { Skeleton } from "../ui/index";
import { MapPin } from "lucide-react";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

function ReverseLocation({
  coordinates,
  withIcon,
}: {
  coordinates: number[];
  withIcon?: boolean;
}) {
  const [reverseLoc, setReverseLoc] = useState(null);
  const params = useParams();
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
  if (reverseLoc)
    return (
      <>
        {withIcon && <MapPin />} <p>{reverseLoc}</p>
      </>
    );
  else return <Skeleton className="h-4 w-3/4 max-w-[400px] w-[200px]" />;
}

export default ReverseLocation;
