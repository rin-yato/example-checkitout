"use server";

import { checkitout } from "@/lib/checkitout";
import { db } from "@/lib/db";

export interface Student {
  id: number;
  name: string;
  phone: string;
  address: string;
  paid: number;
}

export const getStudents = async () => {
  return db.prepare<[], Student>("SELECT * FROM students").all();
};

export const createPayment = async (student: Student) => {
  const checkout = await checkitout.create({
    client: {
      name: student.name,
      phone: student.phone,
      address: student.address,
    },

    tax: 10,
    currency: "KHR",
    discount: { type: "PERCENTAGE", value: 50 },

    redirectUrl: "http://localhost:3060/",

    items: [
      {
        quantity: 1,
        price: 1000,
        productId: "y4_cs",
        img: "https://www.mtholyoke.edu/sites/default/files/styles/1170x780/public/news-images/COM_PopularMajors_Graphics_ComputerScience_010821.jpg?h=c74750f6&itok=tMas2dHw",
        name: "Computer Science Year 4",
      },
    ],

    additionalInfo: student,
  });

  if (checkout.error) {
    return { error: checkout.error };
  }

  const url = checkitout.getCheckoutUrl(checkout.data.checkout.id);

  return { url };
};
