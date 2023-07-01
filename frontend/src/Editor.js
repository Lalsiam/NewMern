import ReactQuill from "react-quill";

export default function Editor({ value, onChange }) {
  const modules = {
    toolbar: [["bold", "italic", "underline", "strike"]],
  };
  return (
    <div className="content">
      <ReactQuill
        placeholder={"Write....."}
        value={value}
        theme={"snow"}
        onChange={onChange}
        modules={modules}
      />
    </div>
  );
}
