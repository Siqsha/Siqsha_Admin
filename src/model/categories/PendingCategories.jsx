import React from "react";
import CommonDialog from "../../components/common/CommonDialog";

function PendingCategories({ open, setOpen }) {
  return <CommonDialog open={open} setOpen={setOpen}></CommonDialog>;
}

export default PendingCategories;
