import React, { useEffect, useState } from "react";
import "./MembersTable.css";

const MemberRow = ({
  row,
  onRowCheck,
  onEditClick,
  onRowEdit,
  onRowDelete,
  token,
}) => {
  const initialVals = { ...row };
  const [editModeFlag, setEditModeFlag] = useState(false);
  const [editedVals, setEditedVals] = useState(initialVals);

  useEffect(() => {
    setEditedVals(row);
  }, [row]);

  useEffect(() => {
    token === row.id ? setEditModeFlag(true) : setEditModeFlag(false);
  }, [token, row.id]);

  const deleteHandler = () => onRowDelete(row.id);

  const checkboxHandler = () => onRowCheck(row.id);

  const editHandler = (e) => {
    if (editModeFlag) {
      const { name, value } = e.target;
      setEditedVals({
        ...editedVals,
        [name]: value,
      });
    }
  };

  const handleSave = () => {
    onRowEdit(editedVals);
    setEditModeFlag(false);
    onEditClick(null);
  };

  const cancelHandler = () => {
    setEditedVals(initialVals);
    setEditModeFlag(false);
    onEditClick(null);
  };

  const editHandlerMode = () => {
    onEditClick(row.id);
  };

  return (
    <tr className={row.isChecked ? "selected" : ""}>
      <td>
        <input
          type="checkbox"
          onChange={checkboxHandler}
          checked={row.isChecked ? "checked" : ""}
        />
      </td>
      <td>
        <div className="input-wrapper">
          <input
            className={`data${row.isChecked ? " selected" : ""}${
              editModeFlag ? " editable" : " view"
            }`}
            name="name"
            value={editedVals.name}
            onChange={editHandler}
          />
        </div>
      </td>
      <td>
        <div className="input-wrapper">
          <input
            className={`data${row.isChecked ? " selected" : ""}${
              editModeFlag ? " editable" : " view"
            }`}
            name="email"
            value={editedVals.email}
            onChange={editHandler}
          />
        </div>
      </td>
      <td>
        <div className="input-wrapper">
          <input
            className={`data${row.isChecked ? " selected" : ""}${
              editModeFlag ? " editable" : " view"
            }`}
            name="role"
            value={editedVals.role}
            onChange={editHandler}
          />
        </div>
      </td>
      <td>
        <div className="actionButtons">
          {editModeFlag ? (
            <>
              <span className="material-icons action-icon" onClick={handleSave}>
                save
              </span>
              <span
                className="material-icons action-icon"
                onClick={cancelHandler}
              >
                close
              </span>
            </>
          ) : (
            <>
              <span
                className="material-icons action-icon"
                onClick={editHandlerMode}
              >
                edit
              </span>
              <span
                className="material-icons action-icon"
                onClick={deleteHandler}
              >
                delete
              </span>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default MemberRow;
