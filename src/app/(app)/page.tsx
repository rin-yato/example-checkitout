import { getStudents } from "./actions";
import { PayButton } from "./pay-button";

export default async function Home() {
  const students = await getStudents();

  return (
    <main className="w-screen h-dvh flex items-center justify-center">
      <div className="bg-gray-100 p-5 scale-150 rounded-lg text-lg w-96">
        <h1 className="font-semibold">Students</h1>
        <ul className="mt-5">
          {students.map((student) => (
            <li
              key={student.id}
              className="py-5 border-b last:border-b-0 flex items-center justify-between"
            >
              <span>{student.name}</span>

              <div className="flex gap-2">
                <div
                  data-paid={Boolean(student.paid)}
                  className="bg-red-500 flex items-center data-[paid=true]:bg-green-500 font-medium text-white px-2 rounded"
                >
                  {Boolean(student.paid) ? "Paid" : "In Debt"}
                </div>

                <PayButton student={student} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
