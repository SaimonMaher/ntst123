"use client";

import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  runTransaction,
  collection,
  serverTimestamp
} from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function ConfirmationPage() {

  const router = useRouter();

  const [booking, setBooking] = useState<any>(null);
  const [message, setMessage] = useState("");



  useEffect(() => {

    const confirmed = sessionStorage.getItem("confirmed");

    if (confirmed) {

      sessionStorage.removeItem("confirmed");

      router.push("/");

      return;

    }


    const data = localStorage.getItem("booking");

    if (data) {

      setBooking(JSON.parse(data));

    }


  }, [router]);





  const confirmBooking = async () => {

    if (!booking) return;


    try {


      const dayRef = doc(
        db,
        "days",
        booking.dayId
      );



      await runTransaction(db, async (transaction) => {


        const daySnap = await transaction.get(dayRef);



        if (!daySnap.exists()) {

          throw new Error("اليوم غير موجود");

        }



        const dayData = daySnap.data();



        if (dayData.booked >= dayData.capacity) {

          throw new Error("اليوم اكتمل العدد");

        }



        transaction.update(dayRef, {

          booked: dayData.booked + 1

        });



        const bookingRef = doc(
          collection(db, "bookings")
        );



        transaction.set(bookingRef, {


          name: booking.name,

          phone: booking.phone,

          sector: booking.sector,

          dayId: booking.dayId,

          day: booking.day,

          createdAt: serverTimestamp()


        });



      });



setMessage("تم تأكيد اليوم بنجاح ✅");

sessionStorage.setItem(
  "confirmed",
  "true"
);

setTimeout(() => {
  router.push("/success");
}, 1000);



    } catch (error:any) {


      setMessage(error.message);


    }


  };





  if (!booking) {


    return (

      <div className="text-center mt-20">

        لا يوجد حجز

      </div>

    );


  }





  return (

    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">


      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">


        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">

          برجاء تأكيد اليوم

        </h1>




        <div className="space-y-4 text-lg">


          <p>
            <strong>الاسم:</strong> {booking.name}
          </p>


          <p>
            <strong>رقم الهاتف:</strong> {booking.phone}
          </p>


          <p>
            <strong>القطاع:</strong> {booking.sector}
          </p>


          <p>
            <strong>اليوم:</strong> {booking.day}
          </p>


        </div>





        <button

          onClick={confirmBooking}

          className="w-full bg-blue-700 text-white rounded-lg p-3 mt-8"

        >

          تأكيد اليوم

        </button>





        <p className="text-center mt-4">

          {message}

        </p>



      </div>


    </main>


  );

}