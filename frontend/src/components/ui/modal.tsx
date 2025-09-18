"use client";
import { IoCloseCircleOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { ModalType } from "@/types/modal-type";
import { dateFormatter } from "@/utils/date-formatter";
import "@/styles/ui/modals.css";
import { FormEvent } from "react";
import { Status } from "@/types/status";
import { useTodowinnContext } from "@/contexts/todowinn-context";

type ModalProps = {
  handleSubmit: (e: FormEvent) => void;
};

export default function Modal({ handleSubmit }: ModalProps) {
  const { isModalOpen, setIsModalOpen, modalType, resetFields } =
    useTodowinnContext();
  const iconSize = 30;

  const handleModalClose = () => {
    // First check what is modal type
    switch (modalType) {
      case ModalType.ADD_PROJECT:
        break;
      default:
        break;
    }

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
            className="flex flex-col fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 p-6 w-11/12 max-w-4xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <button className="flex justify-end" onClick={handleModalClose}>
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
  const {
    modalType,
    selectedProject,
    name,
    setName,
    description,
    setDescription,
    dateTarget,
    setDateTarget,
    status,
    setStatus,
    remarks,
    setRemarks,
  } = useTodowinnContext();

  if (modalType === undefined) return <></>;

  switch (modalType) {
    case ModalType.ADD_PROJECT:
      return (
        <div>
          <form onSubmit={handleSubmit}>
            {getInputField(
              "Project Name",
              "name",
              "text",
              "Enter Project Name",
              true,
              name,
              setName
            )}
            {getInputField(
              "Project Description",
              "description",
              "text",
              "Enter Project Description",
              true,
              description,
              setDescription
            )}
            {getInputField(
              "Target Date",
              "dateTarget",
              "date",
              "",
              false,
              dateTarget,
              setDateTarget
            )}
            {getInputField(
              "Remarks",
              "remarks",
              "text",
              "Remarks",
              false,
              remarks,
              setRemarks
            )}
            <div className="flex flex-row gap-x-5 mt-7">
              <button
                type="button"
                onClick={handleModalClose}
                className="cancel-btn w-full"
              >
                Cancel
              </button>
              <button type="submit" className="save-btn w-full">
                Save
              </button>
            </div>
          </form>
        </div>
      );
    case ModalType.VIEW_PROJECT:
      if (selectedProject === undefined) return <></>;
      return (
        <div className="view-proj-div">
          {/* Name */}
          <h3 className="modal-item-label">{selectedProject.name}</h3>
          {/* Description */}
          <p className="pb-5">{selectedProject.description}</p>
          {/* Status */}
          <p>
            <span className="font-bold">Status:</span> {selectedProject.status}
          </p>
          {/* Remarks */}
          <p>
            {selectedProject.remarks && (
              <>
                <span className="font-bold">Remarks: </span>
                {selectedProject.remarks}
              </>
            )}
          </p>
          {/* Date Created */}
          <p>
            {selectedProject.date_created && (
              <>
                <span className="font-bold">Date Created</span>:{" "}
                {dateFormatter(selectedProject.date_created)}
              </>
            )}
          </p>
          {/* Date Target */}
          <p>
            {selectedProject.date_target && (
              <>
                <span className="font-bold">Date Target</span>:{" "}
                {dateFormatter(selectedProject.date_target)}
              </>
            )}
          </p>
          {/* Date Finished */}
          <p>
            {selectedProject.date_finished && (
              <>
                <span className="font-bold">Date Finished</span>:{" "}
                {dateFormatter(selectedProject.date_finished)}
              </>
            )}
          </p>
        </div>
      );
    case ModalType.EDIT_PROJECT:
      return (
        <div>
          <form onSubmit={handleSubmit}>
            {getInputField(
              "Project Name",
              "name",
              "text",
              "Enter Project Name",
              true,
              name,
              setName
            )}
            {getInputField(
              "Project Description",
              "description",
              "text",
              "Enter Project Description",
              true,
              description,
              setDescription
            )}
            {getInputField(
              "Target Date",
              "dateTarget",
              "date",
              "",
              false,
              dateTarget,
              setDateTarget
            )}
            {getComboField(status, setStatus)}
            {getInputField(
              "Remarks",
              "remarks",
              "text",
              "Remarks",
              false,
              remarks,
              setRemarks
            )}
            <div className="flex flex-row gap-x-5 mt-7">
              <button
                type="button"
                onClick={handleModalClose}
                className="cancel-btn w-full"
              >
                Cancel
              </button>
              <button type="submit" className="save-btn w-full">
                Save
              </button>
            </div>
          </form>
        </div>
      );
    case ModalType.ADD_TASK:
      return <div>adding task</div>;
    case ModalType.VIEW_TASK:
      return <div>viewing task</div>;
    case ModalType.EDIT_TASK:
      return <div>editing task</div>;
  }
}

function getInputField(
  label: string,
  item: string,
  type: string,
  placeholder: string,
  isRequired: boolean,
  value: string,
  setItem: (i: string) => void
) {
  return (
    <div className="flex flex-col py-2">
      <label htmlFor={item} className="font-medium mb-1">
        {label}
      </label>
      <input
        id={item}
        type={type}
        placeholder={placeholder}
        className="border rounded p-2 w-full"
        value={value}
        onChange={(e) => setItem(e.target.value)}
        required={isRequired}
      />
    </div>
  );
}

function getComboField(status: Status, setStatus: (s: Status) => void) {
  return (
    <div className="flex flex-col">
      <label htmlFor="status" className="font-medium mb-1">
        Status
      </label>
      <select
        id="status"
        className="border rounded p-2 w-full"
        value={status}
        onChange={(e) => setStatus(e.target.value as Status)}
      >
        {Object.values(Status).map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
}
