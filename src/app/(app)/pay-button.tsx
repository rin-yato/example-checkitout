"use client";

import { createPayment, Student } from "./actions";

interface PayButtonProps {
  student: Student;
}

export function PayButton(props: PayButtonProps) {
  return (
    <button
      onClick={async () => {
        const res = await createPayment(props.student);

        if (res.url) {
          window.location.assign(res.url);
        } else {
          console.error("Failed to create payment", res.error);
        }
      }}
      className="px-3 bg-white border rounded"
    >
      Pay
    </button>
  );
}
