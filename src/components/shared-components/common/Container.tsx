import React from 'react';

export const DefaultContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      {children}
    </div>
  );
};

export const FormContainer = ({
  children,
  title = 'Add or Edit',
  subTitle = 'Add or edit your details to keep your information up-to-date.',
}: {
  children: React.ReactNode;
  title?: string;
  subTitle?: string;
}) => {
  return (
    <div className="no-scrollbar relative w-full  max-h-[800px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
      <div className="px-2 pr-14">
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">{title}</h4>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">{subTitle}</p>
      </div>
      {children}
    </div>
  );
};
