import { toast } from "../components/ui/index";
import { useReducer } from "react";

interface FileWithUrl {
  name: string;
  getUrl: string;
  size: number;
  error?: boolean | undefined;
  file: any;
}

type Action = ReturnType<typeof addFilesToInput>;
type State = FileWithUrl[];

// Reducer action(s)
const addFilesToInput = () => ({
  type: "ADD_FILES_TO_INPUT" as const,
  payload: [] as FileWithUrl[],
});

const useGallery = () => {
  const [input, dispatch] = useReducer((state: State, action: Action) => {
    switch (action.type) {
      case "ADD_FILES_TO_INPUT": {
        // do not allow more than 5 files to be uploaded at once
        if (state.length + action.payload.length > 10) {
          toast({
            title: "Too many files",
            description: "You can only upload a maximum of 5 files at a time.",
          });
          return state;
        }

        return [...state, ...action.payload];
      }

      // You could extend this, for example to allow removing files
    }
  }, []);

  const addFilesToState = (files: FileWithUrl[]) => {
    dispatch({ type: "ADD_FILES_TO_INPUT", payload: files });
  };

  return { addFilesToState, input, dispatch };
};

export default useGallery;
