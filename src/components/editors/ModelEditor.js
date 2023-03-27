import { Editor } from '@tinymce/tinymce-react';

export default function ModelEditor({ editorRef, initialValue }) {

  // const log = () => {
  //   if (editorRef.current) {
  //     console.log(editorRef.current.getContent());
  //   }
  // };
  return (
    <div>
      <Editor
        apiKey='xv868k07r09xw5omy60vzfxy76k8cmnc3n8pizoewk9krj7u'
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue={initialValue}
        init={{
          height: 450,
          menubar: true,
          block_unsupported_drop: false,
          a11y_advanced_options: true,
          image_caption: true,
          image_advtab: true,
          plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons',
          //   toolbar: 'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | charmap emoticons | fullscreen  preview | insertfile image media link',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      {/* <Button onClick={log}>Log editor content</Button> */}
    </div>
  );
}