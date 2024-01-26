import { useContext } from "react";
import { Code, Edit2 } from "lucide-react";
import { EditorContext } from "@uiw/react-md-editor";

const PreviewButton = () => {
  const { preview, dispatch } = useContext(EditorContext);
  const click = () => {
    if (dispatch) {
      dispatch({
        preview: preview === "edit" ? "preview" : "edit",
      });
    }
  };

  if (preview === "edit") {
    return <Code onClick={click} size={16} />;
  }
  return <Edit2 onClick={click} size={12} />;
};

export const codePreview = {
  name: "preview",
  keyCommand: "preview",
  value: "preview",
  icon: <PreviewButton />,
};

export default PreviewButton;
