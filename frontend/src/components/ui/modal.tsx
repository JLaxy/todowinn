"use client";
import { IoCloseCircleOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { ModalType } from "@/types/modal-type";
import { Project } from "@/types/project";
import { dateFormatter } from "@/utils/date-formatter";
import "@/styles/ui/modals.css";
import { ReactNode } from "react";
import { Status } from "@/types/status";

type ModalProps = {
  isOpen: boolean;
  onClose: (e: boolean) => void;
  children: ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const iconSize = 30;
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background overlay */}
          <motion.div
            className="fixed inset-0 bg-black/30 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onClose(false)}
          />

          {/* Modal content */}
          <motion.div
            className="flex flex-col fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 p-6 w-11/12 max-w-4xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <button className="flex justify-end" onClick={() => onClose(false)}>
              <IoCloseCircleOutline size={iconSize} />
            </button>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

type ModalBodyProps = {
  modalType: ModalType | undefined;
  selectedProject: Project | undefined;
  handleSubmit: () => void;
  setIsModalOpen: (b: boolean) => void;
  name: string;
  setName: (n: string) => void;
  description: string;
  setDescription: (d: string) => void;
  dateTarget: string;
  setDatetarget: (d: string) => void;
  remarks: string;
  setRemarks: (r: string) => void;
  status: Status;
  setStatus: (s: Status) => void;
};

export function ModalBody({
  modalType,
  selectedProject,
  handleSubmit,
  setIsModalOpen,
  name,
  setName,
  description,
  setDescription,
  dateTarget,
  setDatetarget,
  remarks,
  setRemarks,
  status,
  setStatus,
}: ModalBodyProps) {
  if (modalType === undefined || selectedProject === undefined) return <></>;

  switch (modalType) {
    case ModalType.ADD_PROJECT:
      return <div>adding project</div>;
    case ModalType.VIEW_PROJECT:
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
              name,
              setName
            )}
            {getInputField(
              "Project Description",
              "description",
              "text",
              "Enter Project Description",
              description,
              setDescription
            )}
            {getInputField(
              "Target Date",
              "dateTarget",
              "date",
              "",
              dateTarget,
              setDatetarget
            )}
            {getComboField(status, setStatus)}
            {getInputField(
              "Remarks",
              "remarks",
              "text",
              "Remarks",
              remarks,
              setRemarks
            )}
          </form>
          <div className="flex flex-row gap-x-5 mt-7">
            <button
              onClick={() => setIsModalOpen(false)}
              className="cancel-btn w-full"
            >
              Cancel
            </button>
            <button className="save-btn w-full">Save</button>
          </div>
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
        required
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
