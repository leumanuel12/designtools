import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function EditStatus() {
  const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
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

        <div className="fixed inset-x-0 z-10 inset-y-1/4">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white m-4">
                  <form>
                    <div className="px-1 py-1">
                      <div className="font-medium pb-2">Case ID : </div>
                      <label for="status" className="font-medium pr-2">
                        Status
                      </label>

                      <select
                        name="status"
                        type="text"
                        className="input-styles max-sm:w-full"
                        required
                        defaultValue={99}
                      >
                        <option value={0}>First Design Complete</option>
                        <option value={1}>1st - Design Fix</option>
                        <option value={2}>1st - QC Fix Complete</option>
                        <option value={3}>2nd - Design Fix</option>
                        <option value={4}>2nd - QC Fix Complete</option>
                        <option value={5}>3rd - Design Fix</option>
                        <option value={6}>3rd - QC Fix Complete</option>
                        <option value={7}>4th - Design Fix</option>
                        <option value={8}>4th - QC Fix Complete</option>
                        <option value={9}>5th - Design Fix</option>
                        <option value={10}>5th - QC Fix Complete</option>
                        <option value={11}>Redesign</option>
                        <option value={12}>Fullfillment Complete</option>
                        <option value={99} disabled>
                          Select Status
                        </option>
                      </select>
                    </div>
                  </form>
                </div>
                <div className="px-4 py-3 flex justify-center">
                  <button
                    type="button"
                    className="w-full justify-center rounded-md bg-red-500 px-5 py-2 font-semibold text-white hover:bg-red-600 sm:mx-2 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="w-full justify-center rounded-md bg-green-600 px-5 py-2 font-semibold text-white hover:bg-green-600 sm:mx-2 sm:w-auto"
                    onClick={() => setOpen(false)}
                  >
                    Save
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
