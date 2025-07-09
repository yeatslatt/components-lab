import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'

export default function DocumentEdit() {
  const { quill, quillRef } = useQuill();

  console.log(quill);  
  console.log(quillRef); 

  return (
    <div style={{ width: 500, height: 300 }}>
      <div ref={quillRef} />
    </div>
  );
};