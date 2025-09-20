import { Status } from "@/types/status";

type Props = {
  status: Status;
  setStatus: (s: Status) => void;
};

export default function InputCombo({ status, setStatus }: Props) {
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
