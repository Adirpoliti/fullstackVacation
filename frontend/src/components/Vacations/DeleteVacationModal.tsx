import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import WarningIcon from "@mui/icons-material/Warning";
import { Button, styled } from "@mui/material";
import { deleteVacationService } from "../../services/vacationServices/deleteVacatio";
import { useAppSelector } from "../../App/hooks";
import { selectUser } from "../../App/features/usersSlice";
import { useEffect, useState } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#191919",
  color: "white",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
  borderRadius: "15px",
};

const ModalText = styled(Typography)({
  fontFamily: "tripSans",
  fontSize: "30px",
});

const ModalBtn = styled(Button)({
  color: "white",
  fontSize: "20px",
  backgroundColor: "#292929",
  margin: "10px 10px 0 10px",
  borderRadius: "5px",
  fontFamily: "tripSans",
  "&:hover": {
    color: "black",
    backgroundColor: "#29cedd",
  },
});

interface ModalProps {
  isOpened: boolean;
  id: string;
  onClose: () => void;
  refresh:()=> Promise<void>
}

export const DeleteVacationModal = ({ isOpened, id, onClose, refresh }: ModalProps) => {
  const user = useAppSelector(selectUser);
  const [open, setOpen] = useState(isOpened);

  const handleClose = () => {
    setOpen(!open);
    onClose();
  };

  useEffect(() => {
    setOpen(isOpened);
  }, [isOpened]);

  const handleDeleteVacation = async (id: string) => {

    await deleteVacationService(id, user.token);
    refresh()
    handleClose();
  };

  return (
    <div>
      <Modal
        open={isOpened}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
      >
        <Box sx={style}>
          <ModalText id="modal-modal-title">
            <WarningIcon fontSize="medium" color="error" /> Are you sure you
            want to delete this vacation?
          </ModalText>
          <ModalBtn onClick={() => handleDeleteVacation(id)}>Yes</ModalBtn>
          <ModalBtn onClick={handleClose}>No</ModalBtn>
        </Box>
      </Modal>
    </div>
  );
};
