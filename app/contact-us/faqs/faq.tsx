"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { faq } from "../../data/dummyTypes";
import { AddOutlined, RemoveOutlined } from "@mui/icons-material";

const FAQ = ({
  faq,
  visibleQuestion,
  setVisibleQuestion,
}: {
  faq: faq;
  visibleQuestion: number;
  setVisibleQuestion: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div className="mb-4">
      <button
        onClick={() => setVisibleQuestion(faq.id)}
        className="flex w-full items-center justify-between rounded-xl border border-gray-300 px-4 py-2 text-left font-semibold"
      >
        <span>{faq.question}</span>
        {visibleQuestion === faq.id ? <RemoveOutlined /> : <AddOutlined />}
      </button>

      {visibleQuestion === faq.id && (
        <div className="px-4 py-2">
          <p className="text-sm">{faq.answer}</p>
        </div>
      )}
    </div>
  );
};

export default FAQ;
