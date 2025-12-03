declare module 'quill-image-resize-module-react' {
  const ImageResize: any;
  export default ImageResize;
}

declare module 'react-quill' {
  import { ReactQuill } from 'react-quill';
  export interface ReactQuillProps {
    theme?: string;
    value?: string;
    onChange?: (content: string) => void;
    modules?: any;
    formats?: string[];
    ref?: React.RefObject<ReactQuill>;
  }

  export interface QuillInstance {
    getSelection(): { index: number; length: number } | null;
    format(name: string, value: any): void;
    insertEmbed(index: number, type: string, value: any): void;
    setSelection(index: number): void;
    getModule(name: string): any;
  }

  export interface ReactQuill extends React.Component<ReactQuillProps> {
    getEditor(): QuillInstance;
  }

  const ReactQuill: React.ForwardRefExoticComponent<ReactQuillProps>;
  export default ReactQuill;
}
