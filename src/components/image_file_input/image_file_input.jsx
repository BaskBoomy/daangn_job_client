import React, { memo, useRef, useState } from 'react';
import AddPhoto from '../my-profile/myprofiledetail/write/addphoto/addphoto';
import styles from './image_file_input.module.css';
const ImageFileInput = memo(({ imageUploader, image, onFileChange, onDelete, subTitle, maxImage }) => {
    const [loading, setLoading] = useState(false);
    const inputRef = useRef();
    const onButtonClick = (event) => {
        event.preventDefault();
        inputRef.current.click();
    }
    const onChange = (event) => {
        setLoading(true);
        imageUploader.upload(event.target.files)
            .then((data)=>{
                console.log(data);
                onFileChange(data);
                setLoading(false);
            })
            .catch((e)=>alert(e.toString()));
    }

    return <>
        <input ref={inputRef} className={styles.input} type="file" multiple accept="image/*" name="postImages" onChange={onChange} />
        {!loading && (
            <AddPhoto image={image} onClick={onButtonClick} onDelete={onDelete} subTitle={subTitle} maxImage={maxImage} />
        )}
        {loading && <div className={styles.loading}></div>}
    </>
});

export default ImageFileInput;