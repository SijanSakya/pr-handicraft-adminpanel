'use client';
import { CalenderIcon } from '@/theme-template/icons';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { useEffect, useRef } from 'react';
import Label from '../Label';

type PropsType = {
  id: string;
  mode?: 'single' | 'multiple' | 'range' | 'time';
  onChange?: flatpickr.Options.Hook | flatpickr.Options.Hook[];
  defaultDate?: flatpickr.Options.DateOption;
  label?: string;
  placeholder?: string;
};

const DatePicker = ({ id, mode = 'single', onChange, defaultDate, label, placeholder = 'Select date' }: PropsType) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const fpRef = useRef<flatpickr.Instance | null>(null);

  useEffect(() => {
    if (!inputRef.current) return;

    const fp = flatpickr(inputRef.current, {
      mode,
      dateFormat: 'Y-m-d',
      defaultDate,
      onChange,
      static: false,
      appendTo: document.body, // ✅ place outside modal
      disableMobile: true,
      position: 'auto', // ✅ let flatpickr decide (but we’ll fine-tune below)
    });

    fpRef.current = fp;

    const positionCalendar = () => {
      if (!fp.calendarContainer || !inputRef.current) return;
      const rect = inputRef.current.getBoundingClientRect();
      const calendar = fp.calendarContainer;

      // detect viewport space
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      calendar.style.position = 'fixed';
      calendar.style.zIndex = '99999';
      calendar.style.pointerEvents = 'auto';

      const calendarHeight = calendar.offsetHeight || 300; // estimate height

      if (spaceBelow < calendarHeight && spaceAbove > calendarHeight) {
        // open above
        calendar.style.top = `${rect.top - calendarHeight - 8}px`;
      } else {
        // open below
        calendar.style.top = `${rect.bottom + 8}px`;
      }

      calendar.style.left = `${rect.left}px`;
    };

    // Reposition when opened
    fp.config.onOpen?.push(() => {
      setTimeout(positionCalendar, 0);
      window.addEventListener('scroll', positionCalendar, true);
      window.addEventListener('resize', positionCalendar);
    });

    fp.config.onClose?.push(() => {
      window.removeEventListener('scroll', positionCalendar, true);
      window.removeEventListener('resize', positionCalendar);
    });

    return () => {
      fp.destroy();
      fpRef.current = null;
    };
  }, [mode, onChange, defaultDate]);

  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}

      <div className="relative">
        <input
          id={id}
          ref={inputRef}
          placeholder={placeholder}
          readOnly
          className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:border-gray-700 dark:focus:border-brand-800"
        />

        <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
          <CalenderIcon className="size-6" />
        </span>
      </div>
    </div>
  );
};

export default DatePicker;
