import { Dialog, Transition } from '@headlessui/react';
import React, { cloneElement, Fragment } from 'react';

import { StyleProps } from 'types/general';
import { cn } from 'utils/general';

export interface ModalProps extends StyleProps {
  title?: React.ReactNode;
  content: React.ReactNode;
  badge?: React.ReactNode;
  primaryBtn?: React.ReactElement;
  secondaryBtn?: React.ReactElement;
  customBtn?: React.ReactElement;
}

export const Modal = ({
  title,
  content,
  primaryBtn,
  secondaryBtn,
  customBtn,
  badge,
  className,
}: ModalProps) => {
  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        // initialFocus={cancelButtonRef}
        onClose={() => {}}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={cn(
                  'relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8  w-11/12 md:w-8/12 lg:w-8/12',
                  className,
                )}
              >
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start w-full">
                    {badge && (
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        {badge}
                      </div>
                    )}

                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-10 text-gray-900"
                      >
                        {title}
                      </Dialog.Title>
                      <div className="mt-2">{content}</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row sm:px-6">
                  {customBtn}

                  {primaryBtn &&
                    cloneElement(primaryBtn, {
                      className: 'w-full sm:w-auto ml-auto',
                    })}

                  {secondaryBtn &&
                    cloneElement(secondaryBtn, {
                      className: 'w-full sm:w-auto mt-3 sm:mt-0 ml-0 sm:ml-3',
                    })}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
