export type TabItem<T extends string | number> = {
  key: T;
  label: string;
};

export const Tab = <T extends string | number>({
  items,
  active,
  onChange,
}: {
  items: TabItem<T>[];
  active: T;
  onChange: (key: T) => void;
}) => {
  return (
    <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-800 pb-2">
      {items.map((item) => (
        <button
          key={item.key}
          type="button"
          aria-selected={active === item.key}
          onClick={() => onChange(item.key)}
          className={`px-3 py-1 text-sm rounded-t-md focus:outline-none ${
            active === item.key
              ? 'text-brand-600 border-b-2 border-brand-500 dark:text-brand-400'
              : 'text-gray-600 hover:text-gray-800 dark:text-gray-300'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};
