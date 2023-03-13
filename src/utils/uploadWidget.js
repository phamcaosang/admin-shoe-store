import { useEffect, useRef } from 'react';

const UploadWidget = ({ children, onUpload, multipleAllow }) => {
    const cloudinary = useRef();
    const widget = useRef();

    useEffect(() => {
        cloudinary.current = window.cloudinary;
    }, [multipleAllow]);


    function createWidget() {

        const options = {
            cloudName: process.env.REACT_APP_CLOUD_NAME,
            uploadPreset: process.env.REACT_APP_UPLOAD_PRESET,
            // cropping: true, //add a cropping step
            // showAdvancedOptions: true,  //add advanced options (public_id and tag)
            // sources: [ "local", "url"], // restrict the upload sources to URL and local files
            multiple: multipleAllow,  //restrict upload to a single file
            folder: process.env.REACT_APP_FOLDER, //upload files to the specified folder
            // tags: ["users", "profile"], //add the given tags to the uploaded files
            // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
            clientAllowedFormats: ["jpg", "jpeg", "png", "webp"], //restrict uploading to image files only
            // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
            // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
            // theme: "purple", //change to a purple theme
        }

        return cloudinary.current?.createUploadWidget(options,
            function (error, result) {
                if (error || result.event === 'success') {
                    onUpload(error, result, widget?.current);
                }
            }
        );
    }

    function open() {
        if (!widget?.current) {
            widget.current = createWidget();
            console.log(widget);
        }
        widget?.current && widget.current.open();
    }

    return (
        <>
            {children({ cloudinary: cloudinary.current, widget: widget.current, open })}
        </>
    )
}

export default UploadWidget;