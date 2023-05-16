export default function CaseStatus() {
  //temporary list
  const caseList = [
    {
      caseid: "F-0000",
      statuscode: 1,
      status: "Open-Design Complete",
    },
    {
      caseid: "F-1111",
      statuscode: 12,
      status: "Fullfillment Complete",
    },
    {
      caseid: "F-2222",
      statuscode: 5,
      status: "3 - QC Design Fix",
    },
    {
      caseid: "F-3333",
      statuscode: 8,
      status: "4 - QC Design Fix",
    },
    {
      caseid: "F-4444",
      statuscode: 9,
      status: "5 - QC Design Fix",
    },
    {
      caseid: "F-55555",
      statuscode: 11,
      status: "Re-design",
    },
  ];

  function setStatusColor(statuscode) {
    if (!statuscode) return "";
    if (statuscode === 5 || statuscode === 6) return " bg-yellow-300 ";
    if (statuscode === 7 || statuscode === 8) return " bg-orange-300 ";
    if (statuscode === 9 || statuscode === 10) return " bg-red-400 ";
    if (statuscode === 11) return " bg-black text-white";
    if (statuscode === 12) return " bg-green-300 ";
  }

  return (
    <div className="my-5 font-medium">
      <form className="my-3 mx-10 p-4 text-sm max-w-lg border border-gray-300 rounded-md">
        <div className="px-1 py-1">
          <label for="case-id" className="font-medium pr-2">
            Case ID
          </label>

          <input
            name="case-id"
            type="text"
            className="input-styles sm:w-72"
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
            className="input-styles sm:w-72"
            required
          >
            <option value={0}>Open-Design Complete</option>
            <option value={1}>1 - QC Design Fix</option>
            <option value={2}>1 - QC Design Fix Complete</option>
            <option value={3}>2 - QC Design Fix</option>
            <option value={4}>2 - QC Design Fix Complete</option>
            <option value={5}>3 - QC Design Fix</option>
            <option value={6}>3 - QC Design Fix Complete</option>
            <option value={7}>4 - QC Design Fix</option>
            <option value={8}>4 - QC Design Fix Complete</option>
            <option value={9}>5 - QC Design Fix</option>
            <option value={10}>5 - QC Design Fix Complete</option>
            <option value={11}>Re-design</option>
            <option value={12}>Fullfillment Complete</option>
            <option selected value={99} disabled>
              Select an option
            </option>
          </select>
        </div>
        <div className="px-1 py-1">
          <input
            type="submit"
            value="Add Case"
            className="my-3 px-2 py-1  rounded-sm text-white bg-orange-500 hover:bg-orange-600"
          />
        </div>
      </form>

      <div className="mx-10 mt-10">
        <table className="table-auto casetable">
          <thead>
            <tr>
              <th>Case ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {caseList &&
              caseList.map((x) => {
                return (
                  <tr>
                    <td>{x.caseid}</td>
                    <td className={setStatusColor(x.statuscode)}>{x.status}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
