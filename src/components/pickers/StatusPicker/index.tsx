import { useCallback, useState } from "react";
import { IStatus} from "../../../interfaces";
import styles from '../TypePicker/TypePicker.module.css';
import { Button } from "@mui/material";
import StatusPickerModal from "../../dialogs/StatusPickerModal";

interface IProps {
    status: IStatus | undefined;
    setStatus: (status: IStatus) => void;
}

const StatusPicker = ({ status, setStatus }: IProps) => {
    const [open, setOpen] = useState(false);

    const openModal = useCallback(() => {
        setOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setOpen(false);
    }, []);

    const selectStatus = useCallback((selectedStatus: IStatus) => {
        setStatus(selectedStatus);
        closeModal();
    }, [closeModal, setStatus]);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <span className={styles.title}>{status?.title ?? 'Not selected'}</span>
                {open && (
                    <StatusPickerModal selectStatus={selectStatus} closeModal={closeModal} />
                )}
            </div>
            <Button onClick={openModal} className={styles.button} variant="contained">
                Select
            </Button>
        </div>
    );
};

export default StatusPicker;
