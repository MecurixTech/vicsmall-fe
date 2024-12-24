"use client";

import { useState } from "react";
import { FAQs } from "../../data/dummyData";
import FAQ from "./faq";

const FAQList = () => {
  const [visibleQuestion, setVisibleQuestion] = useState(0);

  return (
    <div>
      {" "}
      {FAQs.map((faq) => (
        <FAQ
          key={faq.id}
          faq={faq}
          visibleQuestion={visibleQuestion}
          setVisibleQuestion={setVisibleQuestion}
        />
      ))}
    </div>
  );
};

export default FAQList;
