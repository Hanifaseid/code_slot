import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface DropdownOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export interface CustomFilterDropdownProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  icon?: React.ReactNode;
  isActive?: boolean;
  className?: string;
  align?: 'left' | 'right';
  placeholder?: string;
}

export const CustomFilterDropdown: React.FC<CustomFilterDropdownProps> = ({
  id,
  value,
  onChange,
  options,
  icon,
  isActive = false,
  className = '',
  align = 'left',
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value) || options[0];

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsOpen(true);
        setHighlightedIndex(options.findIndex((o) => o.value === value));
      }
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % options.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev - 1 + options.length) % options.length);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < options.length) {
        onChange(options[highlightedIndex].value);
        setIsOpen(false);
      }
    }
  };

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`} onKeyDown={handleKeyDown}>
      {/* Trigger Button */}
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => {
          setIsOpen(!isOpen);
          setHighlightedIndex(options.findIndex((o) => o.value === value));
        }}
        className={`w-full inline-flex items-center justify-between gap-2 px-3.5 py-2 rounded-2xl border transition-all cursor-pointer shadow-2xs group text-xs font-bold ${
          isActive
            ? 'bg-gradient-to-r from-orange-100 via-amber-100 to-orange-100 border-orange-500 text-orange-950 ring-2 ring-orange-300/60'
            : 'bg-gradient-to-r from-orange-50/70 via-amber-50/50 to-orange-50/70 border-orange-300 hover:border-orange-500 hover:bg-orange-100/60 text-neutral-800 focus:border-orange-500 focus:ring-2 focus:ring-orange-300/60'
        }`}
      >
        <div className="flex items-center gap-2 truncate">
          {icon && <span className="text-orange-600 shrink-0 group-hover:scale-110 transition-transform">{icon}</span>}
          <span className="truncate">{selectedOption?.label || placeholder || 'Select'}</span>
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 text-orange-600 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Options Popup */}
      {isOpen && (
        <div
          ref={listRef}
          role="listbox"
          tabIndex={-1}
          className={`absolute top-full mt-1.5 ${
            align === 'right' ? 'right-0' : 'left-0'
          } z-50 min-w-[220px] max-w-[320px] max-h-[290px] overflow-y-auto rounded-2xl bg-white border border-orange-200 shadow-2xl p-1.5 space-y-0.5 animate-in fade-in zoom-in-95 duration-150`}
        >
          {options.map((opt, idx) => {
            const isSelected = opt.value === value;
            const isHighlighted = idx === highlightedIndex;

            return (
              <div
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setHighlightedIndex(idx)}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer select-none ${
                  isHighlighted
                    ? 'bg-orange-500 text-white font-bold shadow-xs'
                    : isSelected
                    ? 'bg-orange-100 text-orange-950 font-bold border border-orange-300/60'
                    : 'text-neutral-700 hover:bg-orange-500 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  {opt.icon && <span className="shrink-0">{opt.icon}</span>}
                  <span className="truncate">{opt.label}</span>
                </div>
                {isSelected && (
                  <Check className={`w-3.5 h-3.5 shrink-0 ${isHighlighted ? 'text-white' : 'text-orange-600'}`} />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
