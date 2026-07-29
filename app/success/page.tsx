"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function SuccessPage() {

  const router = useRouter();


  useEffect(() => {


    const handleBeforeUnload = () => {

      sessionStorage.setItem("refreshSuccess", "true");

    };


    window.addEventListener(
      "beforeunload",
      handleBeforeUnload
    );


    const refreshed = sessionStorage.getItem("refreshSuccess");


    if (refreshed) {

      sessionStorage.removeItem("refreshSuccess");

      router.push("/");

    }



    return () => {

      window.removeEventListener(
        "beforeunload",
        handleBeforeUnload
      );

    };


  }, [router]);



  return (

    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">


      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">


        <h1 className="text-3xl font-bold text-green-700">

          تم الحجز بنجاح ✅

        </h1>


        <p className="mt-4 text-lg">

          شكرًا لتسجيلك في نهضة العذراء

        </p>


      </div>


    </main>

  );

}