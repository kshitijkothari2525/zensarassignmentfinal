import React, { useEffect, useState } from "react";
import MemberRow from "./MemberRow";
import "./MembersTable.css";
import Pagination from "./Pagination";
import noData from "../assets/No_data.png";

const MembersTable = ({
  members,
  onCheck,
  onDelete,
  onDeleteSelected,
  onEdit,
}) => {
  const maxItem = 10;
  const maximumPageNumber = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [allChecksOnPage, setAllChecksOnPage] = useState(false);
  const [anyChecks, setAnyChecks] = useState(false);
  const [token, setToken] = useState(null);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(members?.length / maxItem)
  );

  const [data, setData] = useState(
    members.slice(
      (currentPage - 1) * maxItem,
      (currentPage - 1) * maxItem + maxItem
    )
  );

  const currentData = () => {
    const begin = (currentPage - 1) * maxItem;
    const end = begin + maxItem;
    setData(members.slice(begin, end));
  };

  useEffect(() => {
    currentData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [members, currentPage]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages !== 0) {
      setCurrentPage(totalPages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [members?.length, totalPages]);

  useEffect(() => {
    setTotalPages(Math.ceil(members?.length / maxItem));
    setAnyChecks(members.reduce((i, member) => i || member.isChecked, false));
  }, [members]);

  useEffect(() => {
    setAllChecksOnPage(data.reduce((i, member) => i && member.isChecked, true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, members, data]);

  const allRowsCheckHandler = (e) => {
    if (e.target.checked) data?.map((row) => !row.isChecked && onCheck(row.id));
    else data?.map((row) => row.isChecked && onCheck(row.id));
  };

  const rowCheckHandler = (id) => onCheck(id);

  const rowDeleteHandler = (id) => onDelete(id);

  const deleteHandler = () => onDeleteSelected();

  const rowEditHandler = (row) => onEdit(row);

  const editLockHandler = (id) => setToken(id);

  return (
    <>
      {members?.length > 0 ? (
        <div className="main-container">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      onChange={allRowsCheckHandler}
                      checked={
                        anyChecks ? (allChecksOnPage ? "checked" : "") : ""
                      }
                    />
                  </th>
                  <th>
                    <div className="data">Name</div>
                  </th>
                  <th>
                    <div className="data">Email</div>
                  </th>
                  <th>
                    <div className="data">Role</div>
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((member) => (
                  <MemberRow
                    key={member.id}
                    row={member}
                    onRowCheck={rowCheckHandler}
                    onRowDelete={rowDeleteHandler}
                    onRowEdit={rowEditHandler}
                    onEditClick={editLockHandler}
                    token={token}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div className="footer">
            <button
              className={`delete-btn${!anyChecks ? " disabled" : ""}`}
              disabled={!anyChecks ? "disabled" : ""}
              onClick={deleteHandler}
            >
              Delete Selected
            </button>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                limit={maximumPageNumber}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="fallback">
          No data found
          <div className="fallback-img-container">
            <img className="fallback-img" alt="fallback" src={noData} />
          </div>
        </div>
      )}
    </>
  );
};

export default MembersTable;
