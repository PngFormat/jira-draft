import React, { useCallback, useRef } from 'react';

interface IProps {
    children: any;
    setFile: (file: File) => void;
}

const FilePicker = ({ children, setFile }: IProps) => {
    const FileInputRef = useRef<HTMLInputElement>(null);

    const chooseAvatar = useCallback(() =>{
        if(FileInputRef.current){
            FileInputRef.current.value = '';
            FileInputRef.current.click()
        }
    },[])

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if(files) {
            const file = files[0]
            if(file) {
                setFile(file);
            }
        }
    }

    return (
        <div>
            <div onClick={chooseAvatar}>{children}</div>
            <input type='file'
                ref={FileInputRef}
                onChange={handleFileChange}
                style={{display: 'none'}}
            >
            </input>
        </div>
    );
};
