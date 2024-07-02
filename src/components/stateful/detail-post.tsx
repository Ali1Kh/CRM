import Post from "../stateful/post";
import Breadcrumbs_Custom from "../stateless/breadcrumb";
import Owner_Details_Box from "../stateless/owner-details-box";
import Testimonials from "../stateless/testimonial";
import {
  Button,
  Separator,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/index";
import {
  Bath,
  Bed,
  Clipboard,
  Heart,
  ImageIcon,
  MapPin,
  MoveLeft,
  Ruler,
  Share2,
} from "lucide-react";

function DetailPost({ id }: { id: any }) {
  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ];

  return (
    <main className="p-6">
      <div className="flex justify-between items-center">
        <Breadcrumbs_Custom />
        <Button variant={"ghost"} className="flex gap-x-3 items-center">
          <MoveLeft />
          Back to Search
        </Button>
      </div>
      <h2 className="text-4xl mt-6">Available Properties for rent in Egypt</h2>
      <div className="flex justify-between items-center">
        <div className="flex space-x-8 mt-6">
          <div className="flex space-x-2 text-muted-foreground">
            <MapPin /> <p>Pyramids of Giza, Egypt</p>
          </div>
          <div className="flex space-x-2 text-muted-foreground">
            <Clipboard /> <p>Advert no: 12422243</p>
          </div>
        </div>

        <p className="text-muted-foreground">Published on: 13 July, 2024</p>
      </div>
      <div className="w-full grid grid-cols-[2.5fr_1fr] min-h-[250px] h-[650px] my-8 gap-x-6 ">
        <div className="w-full h-full relative rounded-lg overflow-hidden">
          <img
            src={"/assets/background.jpeg"}
            alt="background"
            className="object-cover"
          />
          <Button
            variant={"secondary"}
            className="z-20 absolute left-[10px] bottom-[10px] gap-x-3"
          >
            <ImageIcon />
            Show All Images
          </Button>
        </div>
      </div>
      <div className="grid lg:grid-cols-[2.5fr_1fr] w-full gap-x-6 items-start">
        <div className="mb-10">
          <div className="flex justify-between">
            <div className="flex space-x-4 md:space-x-10 my-4">
              <div className="flex items-center space-x-3">
                <Bed className="text-primary" />
                <p>3 bd.</p>
              </div>
              <div className="flex items-center space-x-3">
                <Bath className="text-primary" />
                <p>3 bd.</p>
              </div>
              <div className="flex items-center space-x-3">
                <Ruler className="text-primary" />
                <p>3 bd.</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <Button
                variant={"outline"}
                className="flex items-center gap-x-2 py-2"
              >
                <Share2 className="scale-75" />
                Share
              </Button>
              <Button
                variant={"outline"}
                className="flex items-center gap-x-2 py-2"
              >
                <Heart className="scale-75 fill-destructive stroke-destructive" />
                Add Favourite
              </Button>
            </div>
          </div>
          <Separator className="my-6" />
          <p className="text-lg text-muted-foreground">
            Welcome to your future home, where every detail is crafted with your
            comfort and lifestyle in mind. Our exquisite real estate offerings
            epitomize elegance, luxury, and functionality. Step into a world of
            timeless beauty, where spacious interiors blend seamlessly with
            breathtaking exteriors, promising a haven of tranquility and
            sophistication. Whether you seek a modern urban retreat, a charming
            suburban oasis, or a sprawling countryside estate, our diverse
            portfolio caters to your discerning tastes. Experience unparalleled
            quality, impeccable design, and unparalleled service as we guide you
            towards finding the perfect property to call home."
          </p>
          <Separator className="my-6" />
          {/* property details */}
          <section>
            <h5 className="text-2xl font-semibold text-foreground">
              Property Details
            </h5>
            <div className="grid grid-cols-2 gap-x-6">
              <Table>
                <TableHeader className="w-full">
                  <TableRow className="w-full">
                    <TableHead>Type</TableHead>
                    <TableHead>Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.invoice}>
                      <TableCell>{invoice.paymentStatus}</TableCell>
                      <TableCell>{invoice.paymentMethod}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Table>
                <TableHeader className="w-full">
                  <TableRow className="w-full">
                    <TableHead>Type</TableHead>
                    <TableHead>Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.invoice}>
                      <TableCell>{invoice.paymentStatus}</TableCell>
                      <TableCell>{invoice.paymentMethod}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>

          {/* Property details end */}
        </div>
        <Owner_Details_Box />
      </div>
      <section>
        <h5 className="text-2xl font-semibold text-foreground my-6">
          Other Properties of owner
        </h5>
        <div className="grid lg:grid-cols-4 gap-6 ">
          {/* <Post />
          <Post />
          <Post />
          <Post /> */}
        </div>
      </section>
      <section>
        <h5 className="text-2xl font-semibold text-foreground my-6">
          Testimonials
        </h5>
        <div className="grid grid-cols-3 border rounded-2xl overflow-hidden">
          <Testimonials />
          <Testimonials />
          <Testimonials />
        </div>
      </section>
    </main>
  );
}

export default DetailPost;
