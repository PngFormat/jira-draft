import { useCallback, useState } from "react";
import { IUser } from "../../../interfaces";
import styles from './TypePicker.module.css'
import TypePickerModal from "../../dialogs/TypePickerModal";
import { Button } from "@mui/material";


interface IProps {
    user: IUser | undefined;
    setType: (user: IUser) => void;
}

const TypePicker = ({user, setType}: IProps) => {
    const [open, setOpen] = useState(false);

    const openModal = useCallback(() => {
        setOpen(true);
    },[])

    const closeModal = useCallback(() => {
        setOpen(false);
    },[])

    const selectUser = useCallback((selectedType: IUser) => {
        setType(selectedType);
        closeModal();
    },[])

    return (
        <div className={styles.container}>
      <div className={styles.content}>
        <span className={styles.title}>{user?.email ?? 'Not selected'}</span>
        {open && (
          <TaskUserPickerModal selectUser={selectUser} closeModal={closeModal} />
        )}
      </div>
      <Button onClick={openModal} className={styles.button} variant="contained">
        Select
      </Button>
    </div>
    )
}
export default TypePicker;