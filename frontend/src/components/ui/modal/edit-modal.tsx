import { ModalType } from "@/types/modal-type";
import React, { FormEvent } from "react";
import InputField from "../input-field";
import { useTodowinnContext } from "@/contexts/todowinn-context";
import InputCombo from "../input-combo";

type Props = {
  handleSubmit: (e: FormEvent) => void;
  handleModalClose: () => void;
  modalType: ModalType;
};

export default function EditModalBody({
  handleSubmit,
  handleModalClose,
  modalType,
}: Props) {
  const {
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

  const resource = modalType === ModalType.EDIT_PROJECT ? "Project" : "Task";

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputField
          label={`${resource} Name`}
          item="name"
          type="text"
          placeholder={`Enter ${resource} Name`}
          isRequired={true}
          value={name}
          setItem={setName}
        />
        <InputField
          label={`${resource} Description`}
          item="description"
          type="text"
          placeholder={`Enter ${resource} Description`}
          isRequired={true}
          value={description}
          setItem={setDescription}
        />
        <InputField
          label="Target Date"
          item="dateTarget"
          type="datetime-local"
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
