"use client";

import { useState } from "react";
import AddNewCardPopup from "./add-new-card-popup";

const AddNewCardButton = () => {
  const [isShowingAddNewCardPopup, setIsShowingAddNewCardPopup] =
    useState(false);

  return (
    <>
      {isShowingAddNewCardPopup && (
        <AddNewCardPopup
          setIsShowingAddNewCardPopup={setIsShowingAddNewCardPopup}
        />
      )}
      <button
        onClick={() => setIsShowingAddNewCardPopup(true)}
        className="button button-accent px-4 py-2"
      >
        Add new card
      </button>
    </>
  );
};

export default AddNewCardButton;
