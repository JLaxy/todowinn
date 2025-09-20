import { useTodowinnContext } from "@/contexts/todowinn-context";
import { dateFormatter } from "@/utils/date-formatter";
import React from "react";

export default function ViewProjectModalBody() {
  const { selectedProject } = useTodowinnContext();

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
}
