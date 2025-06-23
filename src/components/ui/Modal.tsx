"use client";

import React from "react";
import { cn } from "@/utils/cn";
import { X } from "lucide-react";

// Modal context
interface ModalContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const ModalContext = React.createContext<ModalContextType | undefined>(
  undefined
);

const useModal = () => {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error("Modal components must be used within a Modal provider");
  }
  return context;
};

// Modal Root component
export interface ModalProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  children,
  open,
  onOpenChange,
  defaultOpen = false,
}) => {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);

  const isOpen = open !== undefined ? open : internalOpen;
  const setIsOpen = React.useCallback(
    (newOpen: boolean) => {
      if (open === undefined) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [open, onOpenChange]
  );

  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

// Modal Trigger component
export interface ModalTriggerProps {
  children: React.ReactNode;
}

const ModalTrigger: React.FC<ModalTriggerProps> = ({ children }) => {
  const { setIsOpen } = useModal();

  const handleClick = () => setIsOpen(true);

  return (
    <button onClick={handleClick} type="button">
      {children}
    </button>
  );
};

// Modal Content component
export interface ModalContentProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  closable?: boolean;
  closeOnClickOutside?: boolean;
}

const ModalContent: React.FC<ModalContentProps> = ({
  children,
  className,
  size = "md",
  closable = true,
  closeOnClickOutside = true,
}) => {
  const { isOpen, setIsOpen } = useModal();

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && closable) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, closable, setIsOpen]);

  // Handle click outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnClickOutside && closable) {
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-full mx-4",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className={cn(
          "relative w-full rounded-lg bg-white shadow-xl dark:bg-gray-800",
          sizeClasses[size],
          "max-h-[90vh] overflow-hidden",
          "animate-in fade-in-0 zoom-in-95 duration-200",
          className
        )}
      >
        {closable && (
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 z-10 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:ring-offset-gray-800"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        )}

        <div className="overflow-y-auto max-h-[90vh]">{children}</div>
      </div>
    </div>
  );
};

// Modal Header component
export interface ModalHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ children, className }) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left px-6 py-4 border-b border-gray-200 dark:border-gray-700",
      className
    )}
  >
    {children}
  </div>
);

// Modal Title component
export interface ModalTitleProps {
  children: React.ReactNode;
  className?: string;
}

const ModalTitle: React.FC<ModalTitleProps> = ({ children, className }) => (
  <h2
    className={cn(
      "text-lg font-semibold leading-none tracking-tight text-gray-900 dark:text-gray-100",
      className
    )}
  >
    {children}
  </h2>
);

// Modal Description component
export interface ModalDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

const ModalDescription: React.FC<ModalDescriptionProps> = ({
  children,
  className,
}) => (
  <p className={cn("text-sm text-gray-600 dark:text-gray-400", className)}>
    {children}
  </p>
);

// Modal Body component
export interface ModalBodyProps {
  children: React.ReactNode;
  className?: string;
}

const ModalBody: React.FC<ModalBodyProps> = ({ children, className }) => (
  <div className={cn("px-6 py-4", className)}>{children}</div>
);

// Modal Footer component
export interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

const ModalFooter: React.FC<ModalFooterProps> = ({ children, className }) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 px-6 py-4 border-t border-gray-200 dark:border-gray-700",
      className
    )}
  >
    {children}
  </div>
);

export {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
};

export default Modal;
