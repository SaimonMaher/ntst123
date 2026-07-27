import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";


const days = [

  { day: "السبت 1 أغسطس", remaining: 6 },
  { day: "الأحد 2 أغسطس", remaining: 6 },
  { day: "الاثنين 3 أغسطس", remaining: 6 },
  { day: "الثلاثاء 4 أغسطس", remaining: 6 },
  { day: "الأربعاء 5 أغسطس", remaining: 6 },
  { day: "الخميس 6 أغسطس", remaining: 6 },

  { day: "الجمعة 7 أغسطس", remaining: 20 },
  { day: "السبت 8 أغسطس", remaining: 20 },
  { day: "الأحد 9 أغسطس", remaining: 20 },
  { day: "الاثنين 10 أغسطس", remaining: 20 },

  { day: "الثلاثاء 11 أغسطس", remaining: 20 },
  { day: "الأربعاء 12 أغسطس", remaining: 20 },
  { day: "الخميس 13 أغسطس", remaining: 20 },
  { day: "الجمعة 14 أغسطس", remaining: 20 },
  { day: "السبت 15 أغسطس", remaining: 20 },

  { day: "الأحد 16 أغسطس", remaining: 20 },
  { day: "الاثنين 17 أغسطس", remaining: 20 },
  { day: "الثلاثاء 18 أغسطس", remaining: 20 },
  { day: "الأربعاء 19 أغسطس", remaining: 20 },
  { day: "الخميس 20 أغسطس", remaining: 20 },

  { day: "الجمعة 21 أغسطس", remaining: 20 },

];


async function addDays(){

  for (const item of days){

    await setDoc(
      doc(db,"days",item.day),
      {
        remaining:item.remaining
      }
    );

  }

  console.log("تم إضافة الأيام بنجاح ✅");

}


addDays();