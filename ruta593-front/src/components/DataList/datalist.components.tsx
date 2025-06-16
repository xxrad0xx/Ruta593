import { useEffect, useState } from "react";
import { IconType } from "react-icons";

interface DataListProps<T> {
    id: string;
    label: string;
    options: Partial<T>[];
    placeholder: string;
    onSelect: (value: string) => void;
    value: string;
    iconP?: IconType;
    className?: string;
    inputClassName?: string;
    opKey: keyof T;
    opValue: keyof T;
    optionP: keyof T;
}

const DataList = <T,>({
    id,
    label,
    options,
    placeholder,
    onSelect,
    value,
    iconP: Icon,
    className,
    inputClassName,
    opKey,
    opValue,
    optionP,
}: DataListProps<T>) => {
    const [inputValue, setInputValue] = useState<string>("");

    useEffect(() => {
        const selectedOption = options.find((option) => String(option[opKey]) === value);
        setInputValue(selectedOption ? String(selectedOption[opValue]) : "");
    }, [value, options, opKey, opValue]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const typedValue = e.target.value;
        setInputValue(typedValue);

        const selectedOption = options.find(
            (option) => String(option[opValue]) === typedValue
        );
        onSelect(selectedOption ? String(selectedOption[opKey]) : "");
    };

    const datalistId = `${id}-options`; // <- ID distinto para datalist

    return (
        <div className={`relative ${className}`}>
            {label && (
                <label htmlFor={id} className="mb-2 block text-sm font-medium text-white">
                    {label}
                </label>
            )}
            <div className="relative">
                {Icon && <span className="absolute left-3 top-3"><Icon /></span>}
                <input
                    id={id}
                    list={datalistId}
                    placeholder={placeholder}
                    onChange={handleInputChange}
                    value={inputValue}
                    className={
                        inputClassName ||
                        "w-full rounded border border-gray-300 bg-[#172B4D] py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-yellow-400"
                    }
                />
                <datalist id={datalistId}>
                    {options.map((option, idx) => (
                        <option
                            key={String(option[opKey]) || idx}
                            value={String(option[opValue])}
                        >
                            {String(option[optionP])}
                        </option>
                    ))}
                </datalist>
            </div>
        </div>
    );
};

export default DataList;
