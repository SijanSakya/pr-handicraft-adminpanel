const IconBtn = ({
  openModal,
  icon: Icon,
  text = 'Edit',
  tooltip,
  showText = true,
  className = `rounded-full border border-gray-300`,
}: {
  openModal: () => void;
  icon: React.ElementType;
  text?: string;
  tooltip?: string;
  className?: string;
  showText?: boolean;
}) => {
  return (
    <button
      onClick={openModal}
      title={tooltip || text}
      className={`flex w-fit items-center justify-center gap-2 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto dark:border-gray-700 ${className}`}
    >
      <Icon /> {showText && text}
    </button>
  );
};

export default IconBtn;
