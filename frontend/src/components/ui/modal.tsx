"use client";
import { IoCloseCircleOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { ModalType } from "@/types/modal-type";
import { dateFormatter } from "@/utils/date-formatter";
import "@/styles/ui/modals.css";
import { FormEvent } from "react";
import { useTodowinnContext } from "@/contexts/todowinn-context";
import InputField from "./input-field";
import InputCombo from "./input-combo";

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
            className="flex flex-col fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 p-6 w-11/12 max-w-4xl"
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
  const {
    modalType,
    selectedProject,
    selectedTask,
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
    taskHistory,
  } = useTodowinnContext();

  if (modalType === undefined) return <></>;

  switch (modalType) {
    case ModalType.ADD_PROJECT:
      return (
        <div>
          <form onSubmit={handleSubmit}>
            <InputField
              label="Project Name"
              item="name"
              type="text"
              placeholder="Enter Project Name"
              isRequired={true}
              value={name}
              setItem={setName}
            />
            <InputField
              label="Project Description"
              item="description"
              type="text"
              placeholder="Enter Project Description"
              isRequired={true}
              value={description}
              setItem={setDescription}
            />
            <InputField
              label="Target Date"
              item="dateTarget"
              type="date"
              placeholder=""
              isRequired={false}
              value={dateTarget}
              setItem={setDateTarget}
            />
            <InputField
              label="Remarks"
              item="remarks"
              type="text"
              placeholder="Remarks"
              isRequired={false}
              value={remarks}
              setItem={setRemarks}
            />
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
            <InputField
              label="Project Name"
              item="name"
              type="text"
              placeholder="Enter Project Name"
              isRequired={true}
              value={name}
              setItem={setName}
            />
            <InputField
              label="Project Description"
              item="description"
              type="text"
              placeholder="Enter Project Description"
              isRequired={true}
              value={description}
              setItem={setDescription}
            />
            <InputField
              label="Target Date"
              item="dateTarget"
              type="date"
              placeholder=""
              isRequired={false}
              value={dateTarget}
              setItem={setDateTarget}
            />
            <InputCombo status={status} setStatus={setStatus} />
            <InputField
              label="Remarks"
              item="remarks"
              type="text"
              placeholder="Remarks"
              isRequired={false}
              value={remarks}
              setItem={setRemarks}
            />
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
      return (
        <div>
          <form onSubmit={handleSubmit}>
            <InputField
              label="Task Name"
              item="name"
              type="text"
              placeholder="Enter Task Name"
              isRequired={true}
              value={name}
              setItem={setName}
            />
            <InputField
              label="Task Description"
              item="description"
              type="text"
              placeholder="Enter Task Description"
              isRequired={true}
              value={description}
              setItem={setDescription}
            />
            <InputField
              label="Target Date"
              item="dateTarget"
              type="date"
              placeholder=""
              isRequired={false}
              value={dateTarget}
              setItem={setDateTarget}
            />
            <InputField
              label="Remarks"
              item="remarks"
              type="text"
              placeholder="Remarks"
              isRequired={false}
              value={remarks}
              setItem={setRemarks}
            />
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
    case ModalType.VIEW_TASK:
      if (selectedTask === undefined) return <></>;
      return (
        <div className="view-task-div">
          {/* Name */}
          <h3 className="modal-item-label">{selectedTask.name}</h3>
          {/* Description */}
          <p className="pb-5">{selectedTask.description}</p>
          {/* Status */}
          <p>
            <span className="font-bold">Status:</span> {selectedTask.status}
          </p>
          {/* Remarks */}
          <p>
            {selectedTask.remarks && (
              <>
                <span className="font-bold">Remarks: </span>
                {selectedTask.remarks}
              </>
            )}
          </p>
          {/* Date Created */}
          <p>
            {selectedTask.date_created && (
              <>
                <span className="font-bold">Date Created</span>:{" "}
                {dateFormatter(selectedTask.date_created)}
              </>
            )}
          </p>
          {/* Date Target */}
          <p>
            {selectedTask.date_target && (
              <>
                <span className="font-bold">Date Target</span>:{" "}
                {dateFormatter(selectedTask.date_target)}
              </>
            )}
          </p>
          {/* Date Finished */}
          <p>
            {selectedTask.date_finished && (
              <>
                <span className="font-bold">Date Finished</span>:{" "}
                {dateFormatter(selectedTask.date_finished)}
              </>
            )}
          </p>
          <h3 className="view-task-history-title">History</h3>
          <div className="view-task-history-div">
            {taskHistory === undefined || taskHistory.length === 0 ? (
              <div className="italic">No history available.</div>
            ) : (
              taskHistory.map((changelog, idx) => (
                <div className="view-task-history-item" key={idx}>
                  <p>
                    Changed{" "}
                    <span className="bg-blue-300 font-bold">
                      {changelog.field}
                    </span>{" "}
                    from{" "}
                    <span className="bg-red-300 font-bold">
                      {changelog.old}
                    </span>{" "}
                    to{" "}
                    <span className="bg-green-300 font-bold">
                      {changelog.new}
                    </span>{" "}
                    on{" "}
                    <span className=" bg-amber-200">
                      {dateFormatter(changelog.date)}
                    </span>
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      );
    case ModalType.EDIT_TASK:
      return (
        <div>
          <form onSubmit={handleSubmit}>
            <InputField
              label="Task Name"
              item="name"
              type="text"
              placeholder="Enter Task Name"
              isRequired={true}
              value={name}
              setItem={setName}
            />
            <InputField
              label="Task Description"
              item="description"
              type="text"
              placeholder="Enter Task Description"
              isRequired={true}
              value={description}
              setItem={setDescription}
            />
            <InputField
              label="Target Date"
              item="dateTarget"
              type="date"
              placeholder=""
              isRequired={false}
              value={dateTarget}
              setItem={setDateTarget}
            />
            <InputCombo status={status} setStatus={setStatus} />
            <InputField
              label="Remarks"
              item="remarks"
              type="text"
              placeholder="Remarks"
              isRequired={false}
              value={remarks}
              setItem={setRemarks}
            />
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
  }
}
