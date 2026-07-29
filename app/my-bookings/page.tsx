"use client";

import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export default function MyBookingsPage() {

  const [phone, setPhone] = useState("");
  const [bookings, setBookings] = useState<any[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const searchBookings = async () => {

    if (!phone) return;

    setLoading(true);

    const q = query(
      collection(db, "bookings"),
      where("phone", "==", phone)
    );

    const snapshot = await getDocs(q);

    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setBookings(data);
    setSearched(true);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-100 flex justify-center p-6">

      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">

        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          استعلام عن حجوزاتي
        </h1>

        <input
          className="w-full border rounded-lg p-3"
          placeholder="اكتب رقم الهاتف"
          value={phone}
          onChange={(e)=>setPhone(e.target.value)}
        />

        <button
          onClick={searchBookings}
          className="w-full bg-blue-700 text-white rounded-lg p-3 mt-4"
        >
          {loading ? "جاري البحث..." : "بحث"}
        </button>

        {searched && bookings.length === 0 && (

          <p className="text-center mt-6 text-red-600">

            لا توجد حجوزات بهذا الرقم

          </p>

        )}

        {bookings.length > 0 && (

          <div className="mt-8 space-y-4">

            <h2 className="text-xl font-bold text-green-700">
              الحجوزات
            </h2>

            {bookings.map((booking) => (

              <div
                key={booking.id}
                className="border rounded-lg p-4 bg-gray-50"
              >

                <p><strong>الاسم:</strong> {booking.name}</p>

                <p><strong>القطاع:</strong> {booking.sector}</p>

                <p><strong>اليوم:</strong> {booking.day}</p>

              </div>

            ))}

          </div>

        )}

      </div>

    </main>
  );
}