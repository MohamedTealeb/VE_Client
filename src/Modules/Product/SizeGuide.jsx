import React from 'react';
import sizeGuideImg from '../../assets/WhatsApp Image 2025-05-10 at 23.43.31_0f57f908.jpg';
import { useNavigate } from 'react-router-dom';

export default function SizeGuide() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 flex flex-col items-center justify-center py-10 px-2">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full animate-fade-in-up">
        <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-2 tracking-tight">دليل المقاسات الكامل</h1>
        <p className="text-gray-600 text-center mb-4">استخدم هذا الجدول لمعرفة المقاس الأنسب لك قبل الشراء. جميع المقاسات بالسنتيمتر.</p>
        <img src={sizeGuideImg} alt="جدول مقاسات التيشيرت" className="w-full mb-4 rounded border" />
        <table className="w-full text-center border border-gray-300 mb-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">المقاس</th>
              <th className="border px-2 py-1">S</th>
              <th className="border px-2 py-1">M</th>
              <th className="border px-2 py-1">L</th>
              <th className="border px-2 py-1">XL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-2 py-1 font-semibold">العرض (سم)</td>
              <td className="border px-2 py-1">56</td>
              <td className="border px-2 py-1">58</td>
              <td className="border px-2 py-1">60</td>
              <td className="border px-2 py-1">62</td>
            </tr>
            <tr>
              <td className="border px-2 py-1 font-semibold">الطول (سم)</td>
              <td className="border px-2 py-1">70</td>
              <td className="border px-2 py-1">72</td>
              <td className="border px-2 py-1">74</td>
              <td className="border px-2 py-1">76</td>
            </tr>
          </tbody>
        </table>
        <div className="text-xs text-gray-500 text-center mb-4">* المقاسات بالسنتيمتر وقد يوجد فرق بسيط في القياس الفعلي</div>
        <ul className="list-disc pr-6 text-gray-700 text-sm mb-4">
          <li>يفضل القياس على تيشيرت يناسبك بالفعل.</li>
          <li>العرض يُقاس من الإبط للإبط.</li>
          <li>الطول يُقاس من أعلى الكتف لأسفل التيشيرت.</li>
        </ul>
        <button onClick={() => navigate(-1)} className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl shadow transition">العودة للمنتج</button>
      </div>
    </div>
  );
} 