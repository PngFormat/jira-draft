import UniversalStub from '../../stubs/UniversalStub';
import UploadedFile from '../../UploadedFile';
import { IFile } from '../../../interfaces';
import styles from './UploadedFileList.module.css';

interface IProps {
  files: IFile[];
  deleteFile: (file: IFile) => void;
}

const UploadedFileList = ({ files, deleteFile }: IProps) => {
  if (files.length === 0) {
    return <UniversalStub text="No Files" />;
  }

  return (
    <>
      {files.map((file: IFile) => (
        <div key={file.name} className={styles.fileContainer}>
          <UploadedFile file={file} deleteFile={deleteFile} />
        </div>
      ))}
    </>
  );
};

export default UploadedFileList;