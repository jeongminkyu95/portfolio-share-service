import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import * as Api from "../../api";

const ModalAlert = ({
  propsProject,
  currentProject,
  setIsEditing,
  setProjects,
}) => {
  const [openModal, setOpenModal] = useState(false);

  const handleClose = () => setOpenModal(!openModal);

  const project = propsProject;

  const handleDelete = async () => {
    const user_id = currentProject.user_id;

    await Api.delete("projects", project.id);

    const res = await Api.get("projects", user_id);
    setProjects(res.data);
    setIsEditing(false);
  };

  return (
    <>
      <Button
        variant="outline-info"
        size="sm"
        onClick={handleClose}
        className="mr-3"
      >
        삭제
      </Button>

      <Modal show={openModal} onHide={handleClose} centered>
        <Modal.Body>정말 삭제하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              handleClose();
              handleDelete();
            }}
          >
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAlert;
