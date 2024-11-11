import { useCallback, useState } from "react";
import { IType } from "../../../interfaces";
import styles from './TypePicker.module.css'
import TypePickerModal from "../../dialogs/TypePickerModal";
import { Button } from "@mui/material";


interface IProps {
    type: IType | undefined;
    setType: (type: IType) => void;
}

const TypePicker = ({type, setType}: IProps) => {
    const [open, setOpen] = useState(false);

    const openModal = useCallback(() => {
        setOpen(true);
    },[])

    const closeModal = useCallback(() => {
        setOpen(false);
    },[])

    const selectType = useCallback((selectedType: IType) => {
        setType(selectedType);
        closeModal();
    },[])

    return (
        <div className={styles.container}>
      <div className={styles.content}>
        <span className={styles.title}>{type?.title ?? 'Not selected'}</span>
        {open && (
          <TypePickerModal selectType={selectType} closeModal={closeModal} />
        )}
      </div>
      <Button onClick={openModal} className={styles.button} variant="contained">
        Select
      </Button>
    </div>
    )
}
export default TypePicker;