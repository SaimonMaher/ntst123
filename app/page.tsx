"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sector, setSector] = useState("");
  const [days, setDays] = useState<any[]>([]);
  const [selectedDay, setSelectedDay] = useState("");



  useEffect(() => {

    const loadDays = async () => {

      const snapshot = await getDocs(
        collection(db, "days")
      );


      const data = snapshot.docs.map((doc) => {

        const day = doc.data();

        return {
          id: doc.id,
          date: day.date,
          sectors: day.sectors,
          capacity: day.capacity,
          booked: day.booked,
        };

      });



      const sortedDays = data.sort((a, b) => {

        const dayNumberA = Number(
          a.date.match(/\d+/)?.[0] || 0
        );


        const dayNumberB = Number(
          b.date.match(/\d+/)?.[0] || 0
        );


        return dayNumberA - dayNumberB;

      });



      setDays(sortedDays);

    };


    loadDays();


  }, []);




  const availableDays = days.filter((day) => {

    return (
      day.sectors?.includes(sector) &&
      day.booked < day.capacity
    );

  });




  const nextStep = () => {


    const selected = JSON.parse(selectedDay);


    localStorage.setItem(
      "booking",
      JSON.stringify({

        name,

        phone,

        sector,

        dayId: selected.id,

        day: selected.date

      })
    );


    router.push("/confirmation");


  };




  return (

    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">


      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">


        <h1 className="text-3xl font-bold text-center text-blue-700">
          فريق العهد الجديد الكشفي
        </h1>


        <p className="text-center text-gray-600 mt-2">
         خدمة نظام - نهضة العذراء
        </p>

<div className="flex flex-col items-center">

  <Image
    src="/logo.png"
    width={120}
    height={120}
    alt="شعار الفريق"
    className="mb-4"
  />


  <Image
    src="/eladra.png"
    width={250}
    height={250}
    alt="السيدة العذراء"
    className="rounded-xl mb-6"
  />

</div>

        <input

          className="w-full border rounded-lg p-3 mt-6"

          placeholder="الاسم"

          value={name}

          onChange={(e)=>setName(e.target.value)}

        />



        <input

          className="w-full border rounded-lg p-3 mt-4"

          placeholder="رقم الهاتف"

          value={phone}

          onChange={(e)=>setPhone(e.target.value)}

        />



        <select

          className="w-full border rounded-lg p-3 mt-4"

          value={sector}

          onChange={(e)=>setSector(e.target.value)}

        >

          <option value="">
            اختر القطاع
          </option>


          <option value="مرشح جوالة">
            مرشح جوالة
          </option>


          <option value="جوالة">
            جوالة
          </option>


          <option value="متقدم">
            متقدم
          </option>


          <option value="رائدات">
            رائدات
          </option>


        </select>




        {sector && (

          <select

            className="w-full border rounded-lg p-3 mt-4"

            value={selectedDay}

            onChange={(e)=>setSelectedDay(e.target.value)}

          >


            <option value="">
              اختر اليوم
            </option>



            {
              availableDays.map((day)=>(


                <option

                  key={day.id}

                  value={JSON.stringify({
                    id: day.id,
                    date: day.date
                  })}

                >

                  {day.date} - متاح {day.capacity - day.booked} مكان

                </option>


              ))
            }


          </select>

        )}






        <button

          onClick={nextStep}

          disabled={
            !name ||
            !phone ||
            !sector ||
            !selectedDay
          }


          className="w-full bg-blue-700 text-white rounded-lg p-3 mt-8 disabled:bg-gray-400"

        >

          التالي

        </button>



      </div>


    </main>

  );

}