import {
  Cog6ToothIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import EditStatus from "../components/EditStatus";

export default function CaseStatus() {
  //temporary list
  const caseList = [
    {
      caseid: "F-0000",
      statuscode: 1,
    },
    {
      caseid: "F-1111",
      statuscode: 12,
    },
    {
      caseid: "F-2222",
      statuscode: 5,
    },
    {
      caseid: "F-2323",
      statuscode: 6,
    },
    {
      caseid: "F-3333",
      statuscode: 7,
    },
    {
      caseid: "F-4444",
      statuscode: 9,
    },
    {
      caseid: "F-5555",
      statuscode: 11,
    },
  ];

  function setStatusColor(statuscode) {
    if (!statuscode) return "";
    if (statuscode === 5) return " bg-yellow-300 ";
    if (statuscode === 7) return " bg-orange-300 ";
    if (statuscode === 9) return " bg-red-400 ";
    if (statuscode === 11) return " bg-black text-white ";
    if (statuscode === 12) return " bg-green-300 ";
  }

  function setStatusMessage(statuscode) {
    if (!statuscode) return "";
    if (statuscode === 0) return "First Design Complete";
    if (statuscode === 1) return "1st - Design Fix";
    if (statuscode === 2) return "1st - QC Fix Complete";
    if (statuscode === 3) return "2nd - Design Fix";
    if (statuscode === 4) return "2nd - QC Fix Complete";
    if (statuscode === 5) return "3rd - Design Fix";
    if (statuscode === 6) return "3rd - QC Fix Complete";
    if (statuscode === 7) return "4th - Design Fix";
    if (statuscode === 8) return "4th - QC Fix Complete";
    if (statuscode === 9) return "5th - Design Fix";
    if (statuscode === 10) return "5th - QC Fix Complete";
    if (statuscode === 11) return "Redesign";
    if (statuscode === 12) return "Fullfillment Complete";
  }

  return (
    <div className="lg:grid lg:grid-cols-2 my-5 font-medium">
      <div className="col-span-1 mb-4">
        <table className="table-fixed casetable">
          <thead>
            <tr>
              <th>Case ID</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {caseList &&
              caseList.map((x) => {
                return (
                  <tr key={x.caseid}>
                    <td>{x.caseid}</td>
                    <td className={setStatusColor(x.statuscode)}>
                      {setStatusMessage(x.statuscode)}
                    </td>
                    <td>
                      <div className="sm:flex justify-center max-md:px-4">
                        <PencilSquareIcon className="h-5 w-5 hover:stroke-blue-600" />
                        <span className="max-md:hidden w-4" />
                        <TrashIcon className="h-5 w-5 hover:stroke-red-600" />
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      <div className="col-span-1 lg:ml-4 p-4 border border-gray-300 rounded-md">
        <form>
          <div className="px-1 py-1">
            <label for="case-id" className="font-medium pr-2">
              Case ID
            </label>

            <input
              name="case-id"
              type="text"
              className="input-styles max-sm:w-full"
              placeholder="F-12345"
              required
            />
          </div>
          <div className="px-1 py-1">
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

          <input
            type="submit"
            value="Add Case"
            className="my-3 px-2 py-1 rounded-sm text-white bg-orange-500 hover:bg-orange-600"
          />
        </form>
      </div>

      <EditStatus />
    </div>
  );
}
