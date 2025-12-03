import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill-new'; // or 'react-quill' if you didn’t switch yet
import 'react-quill-new/dist/quill.snow.css';
import './quillOverrides.css';

interface RichTextEditorProps {
  initialValue: string;
  onEditorChange: (content: string) => void;
}
const modules = {
  toolbar: {
    container: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ align: [] }],
      ['blockquote', 'code-block', 'link'],
      //['image', 'video'],
    ],
  },
};

const formats = [
  'font',
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'color',
  'background',
  'script',
  'list',
  'indent',
  'direction',
  'align',
  'blockquote',
  'code-block',
  'link',
  // 'image',
  // 'video',
];

const RichTextEditor = ({ initialValue, onEditorChange }: RichTextEditorProps) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (content: string) => {
    setValue(content);
    onEditorChange(content);
  };

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={handleChange}
      style={{ minHeight: '200px' }}
      modules={modules}
      formats={formats}
    />
  );
};

export default RichTextEditor;
