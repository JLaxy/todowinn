type Props = {
  label: string;
  item: string;
  type: string;
  placeholder: string;
  isRequired: boolean;
  value: string;
  setItem: (i: string) => void;
};

export default function InputField({
  label,
  item,
  type,
  placeholder,
  isRequired,
  value,
  setItem,
}: Props) {
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
