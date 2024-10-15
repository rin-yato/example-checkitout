import { Student } from "@/app/(app)/actions";
import { checkitout } from "@/lib/checkitout";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

let count = 1;

// /api/webhook

export const POST = async (req: NextRequest) => {
  // if (count < 6) {
  //   count++;
  //   return NextResponse.json(
  //     { message: "SERVER ERROR COUNT: " + count },
  //     { status: 500 },
  //   );
  // }

  const { checkoutId } = await req.json();

  if (!checkoutId) {
    return NextResponse.json(
      { message: "Invalid checkoutId" },
      { status: 400 },
    );
  }

  const { error, data } = await checkitout.findOne(checkoutId);

  if (error) {
    return NextResponse.json(error, { status: 500 });
  }

  const isPaid = data.transactions.some((t) => t.status === "SUCCESS");

  if (!isPaid) {
    return NextResponse.json(
      { message: "Invalid webhook, checkout has no successful transaction" },
      { status: 400 },
    );
  }

  const student = data.additionalInfo as Student;

  // update student in database
  const updateQuery = db.prepare("UPDATE students SET paid = ? WHERE id = ?");
  updateQuery.run(1, student.id);

  return NextResponse.json({ message: "OK" }, { status: 200 });
};
