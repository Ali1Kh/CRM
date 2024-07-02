import { Badge, Button } from "../ui/index";
import { PostMapContext } from "../../store/posts-map";
import { Bath, Bed, Heart, Ruler } from "lucide-react";
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import config from "../../services/config";
import { useParams } from "react-router-dom";
import useReverseLocation from "../../hooks/use-reverse-location";

type IDETAIL = {
  key: string;
  value: string;
};

export interface IPOST {
  _id?: string;
  images: string[];
  details: IDETAIL[];
  title: string;
  description: string;
  advertNo: number;
  publishedAt: Date;
  location: { coordinates: number[] };
  price: string;
  tags: string[];
  owner?: { fullname?: string; profilePicture?: string };
}

function Post({
  images,
  details,
  description,
  title,
  advertNo,
  publishedAt,
  location,
  price,
  tags,
}: IPOST) {
  const { value, setValue } = useContext(PostMapContext);
  // const defaultValues = { longitude: -100, latitude: 40, zoom: 10 };
  const thumbnail = images?.length && images[0];
  // const [reverseLoc, setReverseLoc] = useState('');
  const { reverseLoc } = useReverseLocation(location.coordinates);

  const params = useParams();

  const set_pointer_into_view = () => {
    if (!setValue) return;
    setValue({
      lng: location.coordinates[0],
      lat: location.coordinates[1],
      zoom: 10,
    });
  };

  return (
    <div className="max-w-[440px] border border-input rounded-md">
      <div className="relative w-full h-[200px] md:h-[250px] overflow-hidden">
        <img
          src={config.storage_url + "/advert/" + thumbnail}
          alt={"house"}
          className="object-cover"
          sizes="30vw"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h6 className="text-2xl text-primary">${price}</h6>
          <Heart className="cursor-pointer hover:fill-destructive hover:stroke-destructive" />
        </div>
        <h4 className="md:text-xl py-2 font-medium text-lg ">{title}</h4>

        {reverseLoc}

        <div className="flex space-x-4 md:gap-x-4 my-4">
          <div className="flex items-center gap-x-3">
            <Bed className="text-primary" />
            <p>3 bd.</p>
          </div>
          <div className="flex items-center gap-x-3">
            <Bath className="text-primary" />
            <p>3 bd.</p>
          </div>
          <div className="flex items-center gap-x-3">
            <Ruler className="text-primary" />
            <p>3 bd.</p>
          </div>
        </div>

        <div className="flex gap-x-5 my-6">
          {tags &&
            tags.map((tag: string, i: number) => {
              return (
                <Badge variant={"secondary"} key={i}>
                  {tag}
                </Badge>
              );
            })}
        </div>
        <Link
          to={"/dashboard/posts/" + advertNo}
          onMouseEnter={set_pointer_into_view}
        >
          <Button className="w-full" type="button">
            Show Details
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Post;
