"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";


export default function AdminPage() {

  const [days, setDays] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);



  useEffect(() => {

    const loadData = async () => {


      const daysSnapshot = await getDocs(
        collection(db, "days")
      );


      const daysData = daysSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));



      const bookingsSnapshot = await getDocs(
        collection(db, "bookings")
      );


      const bookingsData = bookingsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));



      const sortedDays = daysData.sort((a: any, b: any) => {

  const dayA = Number(
    a.date.match(/\d+/)?.[0] || 0
  );

  const dayB = Number(
    b.date.match(/\d+/)?.[0] || 0
  );

  return dayA - dayB;

});

setDays(sortedDays);
      setBookings(bookingsData);


    };


    loadData();


  }, []);





  return (

    <main className="min-h-screen bg-gray-100 p-6">


      <div className="max-w-6xl mx-auto">


        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
          إدارة حجوزات نهضة العذراء
        </h1>




        {
          days.map((day)=>{


            const dayBookings = bookings.filter(
  (booking) =>
    booking.day === day.date
);


            const remaining =
              day.capacity - dayBookings.length;



            return (

              <div
                key={day.id}
                className="bg-white rounded-xl shadow p-6 mb-6"
              >


                <div className="flex justify-between items-center mb-4">


                  <h2 className="text-xl font-bold">
                    {day.date}
                  </h2>


                  <div>

                    <span className="mr-4">
                      الإجمالي: {day.capacity}
                    </span>


                    <span className="text-green-700">
                      متبقي: {remaining}
                    </span>

                  </div>


                </div>



                {
                  dayBookings.length === 0 ?

                  (
                    <p>
                      لا يوجد حجوزات
                    </p>
                  )

                  :

                  (

                    <table className="w-full border">


                      <thead>

                        <tr className="bg-gray-200">

                          <th className="border p-2">
                            الاسم
                          </th>


                          <th className="border p-2">
                            الهاتف
                          </th>


                          <th className="border p-2">
                            القطاع
                          </th>


                        </tr>

                      </thead>



                      <tbody>


                        {
                          dayBookings.map((booking)=>(

                            <tr key={booking.id}>


                              <td className="border p-2">
                                {booking.name}
                              </td>


                              <td className="border p-2">
                                {booking.phone}
                              </td>


                              <td className="border p-2">
                                {booking.sector}
                              </td>


                            </tr>


                          ))
                        }


                      </tbody>


                    </table>

                  )

                }


              </div>


            );


          })

        }


      </div>


    </main>

  );

}