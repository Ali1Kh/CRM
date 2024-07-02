import { forwardRef } from "react";
import { useUploadFile } from "../../hooks/use-upload-file";
import { ImageResponseData } from "../../types/api/image";
import { Progress } from "../ui/index";
import { Cross, Loader2 } from "lucide-react";
import OtherActionMenu from "../stateless/other-actions-menu";
import { cn } from "../../libs/utils";

interface ImageUploadProps extends React.HTMLAttributes<HTMLTableRowElement> {
  name: string;
  size: number;
  getUrl: string;
  error?: boolean | undefined;
}

const ImageUpload = forwardRef<HTMLTableRowElement, ImageUploadProps>(
  ({ getUrl, error, name, size, className, ...props }, ref) => {
    const {
      data,
      progress,
      isLoading,
      error: processingError,
    } = useUploadFile<ImageResponseData>("/api/image/process", getUrl, {
      disabled: error,
    });

    return (
      <tr ref={ref} {...props} className={cn("", className)}>
        <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-slate-400">
          <div className="relative flex h-12 w-20">
            {error ? (
              <div className="flex w-full justify-center items-center">
                <Cross className="h-6 w-6 fill-destructive" />
              </div>
            ) : (
              <img style={{ objectFit: "contain" }} src={getUrl} alt={name} />
            )}
          </div>
        </td>
        <td className="px-6 py-4 truncate whitespace-normal text-sm font-medium dark:text-slate-400 ">
          <div className="">
            <p
              className={cn("dark:text-slate-300", {
                "dark:text-red-500": error,
              })}
            >
              {name}
            </p>
            {data ? (
              <p>{data.alt}</p>
            ) : isLoading ? (
              <Loader2 className="mt-1 w-4 h-4 animate-spin" />
            ) : null}
          </div>
        </td>
        <td
          className={cn(
            "px-6 py-4 whitespace-nowrap text-sm dark:text-slate-400",
            {
              "dark:text-red-500": error,
            }
          )}
        >
          {(size / 1000).toFixed(0)} KB
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-slate-400 ">
          <Progress
            className={cn("w-full h-2")}
            value={progress}
            // isError={error || processingError}
          />
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-slate-400 ">
          <OtherActionMenu
            actionArr={[
              {
                text: "Crop",
                type: "default",
                onClick: () => {
                  alert("delete");
                },
              },
              {
                text: "Delete",
                type: "destructive",
                onClick: () => {
                  alert("delete");
                },
              },
            ]}
          />
        </td>
      </tr>
    );
  }
);

ImageUpload.displayName = "ImageUpload";

export default ImageUpload;
