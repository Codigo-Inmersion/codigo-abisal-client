import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { X } from 'lucide-react';
import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, title, children }) => {
  return (
    <Transition appear show={isOpen}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* El fondo oscuro translúcido */}
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" />
        </TransitionChild>

        {/* Contenedor para centrar el modal */}
<div className="modal-centering-container">
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="modal-panel">
              {/* Encabezado del Modal */}
              <div className="modal-header">
                <DialogTitle as="h3" className="modal-title">{title}</DialogTitle>
                <button onClick={onClose} className="modal-close-btn">
                  <X size={20} />
                </button>
              </div>

              {/* Contenido del Modal */}
              <div className="modal-content">
                {children}
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;