"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";


export default function AdminPage() {


  const [bookings, setBookings] = useState<any[]>([]);



  useEffect(() => {


    const loadBookings = async () => {


      const snapshot = await getDocs(
        collection(db, "bookings")
      );


      const data = snapshot.docs.map(doc => ({

        id: doc.id,

        ...doc.data()

      }));


      setBookings(data);


    };


    loadBookings();


  }, []);



  return (

    <main className="min-h-screen bg-gray-100 p-6">


      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8">


        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">

          إدارة الحجوزات

        </h1>



        {
          bookings.length === 0 ?

          (

            <p className="text-center">
              لا يوجد حجوزات حتى الآن
            </p>

          )

          :

          (

            <div className="space-y-4">


              {
                bookings.map((booking) => (


                  <div

                    key={booking.id}

                    className="border rounded-lg p-4"

                  >

                    <p>
                      <strong>الاسم:</strong> {booking.name}
                    </p>


                    <p>
                      <strong>الهاتف:</strong> {booking.phone}
                    </p>


                    <p>
                      <strong>القطاع:</strong> {booking.sector}
                    </p>


                    <p>
                      <strong>اليوم:</strong> {booking.day}
                    </p>


                  </div>


                ))
              }


            </div>

          )
        }


      </div>


    </main>

  );

}