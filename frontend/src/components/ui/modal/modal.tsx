"use client";
import { IoCloseCircleOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { ModalType } from "@/types/modal-type";
import "@/styles/ui/modals.css";
import { FormEvent } from "react";
import { useTodowinnContext } from "@/contexts/todowinn-context";
import AddModalBody from "./add-modal";
import ViewProjectModalBody from "./view-project-modal";
import EditModalBody from "./edit-modal";
import ViewTaskModalBody from "./view-task-modal";

type ModalProps = {
  handleSubmit: (e: FormEvent) => void;
};

export default function Modal({ handleSubmit }: ModalProps) {
  const { isModalOpen, setIsModalOpen, resetFields } = useTodowinnContext();
  const iconSize = 30;

  const handleModalClose = () => {
    setIsModalOpen(false);
    resetFields();
  };
  return (
    <AnimatePresence>
      {isModalOpen && (
        <>
          {/* Background overlay */}
          <motion.div
            className="fixed inset-0 bg-black/30 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleModalClose}
          />

          {/* Modal content */}
          <motion.div
            className="flex flex-col fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 p-8 w-11/12 max-w-4xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <button
              className="flex justify-end cursor-pointer"
              onClick={handleModalClose}
            >
              <IoCloseCircleOutline size={iconSize} />
            </button>
            <ModalBody
              handleModalClose={handleModalClose}
              handleSubmit={handleSubmit}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

type ModalBodyProps = {
  handleSubmit: (e: FormEvent) => void;
  handleModalClose: () => void;
};

export function ModalBody({ handleSubmit, handleModalClose }: ModalBodyProps) {
  const { modalType } = useTodowinnContext();

  if (modalType === undefined) return <></>;

  switch (modalType) {
    case ModalType.ADD_PROJECT:
      return (
        <AddModalBody
          handleModalClose={handleModalClose}
          handleSubmit={handleSubmit}
          modalType={ModalType.ADD_PROJECT}
        />
      );
    case ModalType.VIEW_PROJECT:
      return <ViewProjectModalBody />;
    case ModalType.EDIT_PROJECT:
      return (
        <EditModalBody
          handleModalClose={handleModalClose}
          handleSubmit={handleSubmit}
          modalType={ModalType.EDIT_PROJECT}
        />
      );
    case ModalType.ADD_TASK:
      return (
        <AddModalBody
          handleModalClose={handleModalClose}
          handleSubmit={handleSubmit}
          modalType={ModalType.ADD_TASK}
        />
      );
    case ModalType.VIEW_TASK:
      return <ViewTaskModalBody />;
    case ModalType.EDIT_TASK:
      return (
        <EditModalBody
          handleModalClose={handleModalClose}
          handleSubmit={handleSubmit}
          modalType={ModalType.EDIT_TASK}
        />
      );
  }
}
