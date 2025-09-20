import { useTodowinnContext } from "@/contexts/todowinn-context";
import { dateFormatter } from "@/utils/date-formatter";
import React from "react";

export default function ViewTaskModalBody() {
  const { selectedTask, taskHistory } = useTodowinnContext();

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
                <span className="bg-blue-300 view-task-history-details">
                  {changelog.field}
                </span>{" "}
                from{" "}
                <span className="bg-amber-200 view-task-history-details">
                  {changelog.old}
                </span>{" "}
                to{" "}
                <span className="bg-green-300 view-task-history-details">
                  {changelog.new}
                </span>{" "}
                on{" "}
                <span className=" bg-red-300 view-task-history-details">
                  {dateFormatter(changelog.date)}
                </span>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
