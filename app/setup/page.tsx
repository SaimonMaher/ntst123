"use client";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";

export default function SetupPage() {

  const [message, setMessage] = useState("");

  const createDays = async () => {

    const days = [

      // مرشح جوالة فقط (6 أماكن)
      {
        date: "السبت 1 أغسطس",
        sectors: ["مرشح جوالة"],
        capacity: 6,
        booked: 0,
      },
      {
        date: "الأحد 2 أغسطس",
        sectors: ["مرشح جوالة"],
        capacity: 6,
        booked: 0,
      },
      {
        date: "الاثنين 3 أغسطس",
        sectors: ["مرشح جوالة"],
        capacity: 6,
        booked: 0,
      },
      {
        date: "الثلاثاء 4 أغسطس",
        sectors: ["مرشح جوالة"],
        capacity: 6,
        booked: 0,
      },
      {
        date: "الأربعاء 5 أغسطس",
        sectors: ["مرشح جوالة"],
        capacity: 6,
        booked: 0,
      },
      {
        date: "الخميس 6 أغسطس",
        sectors: ["مرشح جوالة"],
        capacity: 6,
        booked: 0,
      },


      // مرشح جوالة + جوالة (20 مكان)
      {
        date: "الجمعة 7 أغسطس",
        sectors: ["مرشح جوالة", "جوالة"],
        capacity: 20,
        booked: 0,
      },
      {
        date: "الأحد 9 أغسطس",
        sectors: ["مرشح جوالة", "جوالة"],
        capacity: 20,
        booked: 0,
      },
      {
        date: "الاثنين 10 أغسطس",
        sectors: ["مرشح جوالة", "جوالة"],
        capacity: 20,
        booked: 0,
      },
      {
        date: "السبت 16 أغسطس",
        sectors: ["مرشح جوالة", "جوالة"],
        capacity: 20,
        booked: 0,
      },
      {
        date: "الخميس 21 أغسطس",
        sectors: ["مرشح جوالة", "جوالة"],
        capacity: 20,
        booked: 0,
      },


      // متقدم + رائدات (20 مكان)
      {
        date: "الجمعة 8 أغسطس",
        sectors: ["متقدم", "رائدات"],
        capacity: 20,
        booked: 0,
      },
      {
        date: "الاثنين 11 أغسطس",
        sectors: ["متقدم", "رائدات"],
        capacity: 20,
        booked: 0,
      },
      {
        date: "الثلاثاء 12 أغسطس",
        sectors: ["متقدم", "رائدات"],
        capacity: 20,
        booked: 0,
      },
      {
        date: "الأربعاء 13 أغسطس",
        sectors: ["متقدم", "رائدات"],
        capacity: 20,
        booked: 0,
      },
      {
        date: "الخميس 14 أغسطس",
        sectors: ["متقدم", "رائدات"],
        capacity: 20,
        booked: 0,
      },
      {
        date: "الجمعة 15 أغسطس",
        sectors: ["متقدم", "رائدات"],
        capacity: 20,
        booked: 0,
      },
      {
        date: "الأحد 17 أغسطس",
        sectors: ["متقدم", "رائدات"],
        capacity: 20,
        booked: 0,
      },
      {
        date: "الاثنين 18 أغسطس",
        sectors: ["متقدم", "رائدات"],
        capacity: 20,
        booked: 0,
      },
      {
        date: "الثلاثاء 19 أغسطس",
        sectors: ["متقدم", "رائدات"],
        capacity: 20,
        booked: 0,
      },
      {
        date: "الأربعاء 20 أغسطس",
        sectors: ["متقدم", "رائدات"],
        capacity: 20,
        booked: 0,
      },

    ];


    try {

      for (const day of days) {

        await addDoc(
          collection(db, "days"),
          day
        );

      }

      setMessage("تم إضافة الأيام بنجاح ✅");

    } catch (error) {

      console.log(error);
      setMessage("حدث خطأ ❌");

    }

  };


  return (

    <main className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-xl">

        <h1 className="text-2xl font-bold mb-6">
          تجهيز أيام صوم العذراء
        </h1>


        <button

          onClick={createDays}

          className="bg-blue-700 text-white px-6 py-3 rounded-lg"

        >

          إنشاء الأيام

        </button>


        <p className="mt-5">
          {message}
        </p>


      </div>

    </main>

  );

}