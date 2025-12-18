import React, { useState, useEffect } from 'react';
import { Coffee, Gift, Calculator, Sparkles } from 'lucide-react';

function App() {
  const [target, setTarget] = useState('');
  const [result, setResult] = useState({ pay: 0, free: 0, total: 0 });

  useEffect(() => {
    calculate(target);
  }, [target]);

  const calculate = (val) => {
    const num = parseInt(val);
    if (!num || num < 0) {
      setResult({ pay: 0, free: 0, total: 0 });
      return;
    }

    // Logic: Mua 2 tặng 1
    // Mỗi 3 cốc thì có 1 bộ (2 trả tiền, 1 tặng)
    const sets = Math.floor(num / 3);
    const remainder = num % 3;

    let pay = sets * 2 + remainder;
    let free = sets;

    // Nếu dư 2 cốc (ví dụ nhập 2), khách mua nốt 2 cốc này -> được tặng thêm 1
    // Ví dụ nhập 20: 20/3 = 6 dư 2.
    // 6 bộ: trả 12, tặng 6.
    // Dư 2: trả thêm 2, đủ điều kiện tặng thêm 1.
    // Tổng trả: 12 + 2 = 14. Tổng tặng: 6 + 1 = 7.
    if (remainder === 2) {
      free += 1;
    }

    setResult({
      pay,
      free,
      total: pay + free
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-orange-100">
        
        {/* Header */}
        <div className="bg-orange-600 p-6 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <Sparkles className="w-full h-full text-white transform scale-150" />
          </div>
          <h1 className="text-2xl font-bold text-white relative z-10 flex items-center justify-center gap-2">
            <Coffee className="w-8 h-8" />
            Tính Cốc Coffee
          </h1>
          <p className="text-orange-100 mt-2 text-sm relative z-10 font-medium">
            Chương trình Mua 2 Tặng 1
          </p>
        </div>

        <div className="p-8">
          {/* Input Section */}
          <div className="mb-8">
            <label className="block text-gray-700 font-semibold mb-2 ml-1">
              Khách muốn bao nhiêu cốc?
            </label>
            <div className="relative">
              <input
                type="number"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="Nhập số lượng (VD: 20)"
                className="w-full pl-12 pr-4 py-4 text-xl font-bold text-gray-800 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all"
              />
              <Calculator className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-4">
            {/* Pay Card */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-5 border border-orange-100 flex items-center justify-between transition-transform hover:scale-102 cursor-default">
              <div className="flex items-center gap-4">
                <div className="bg-orange-100 p-3 rounded-full text-orange-600">
                  <Coffee className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Cần làm (Tính tiền)</p>
                  <p className="text-3xl font-bold text-gray-800">{result.pay} <span className="text-sm font-normal text-gray-500">cốc</span></p>
                </div>
              </div>
            </div>

            {/* Free Card */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100 flex items-center justify-between transition-transform hover:scale-102 cursor-default">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-full text-green-600">
                  <Gift className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Tặng thêm</p>
                  <p className="text-3xl font-bold text-gray-800">{result.free} <span className="text-sm font-normal text-gray-500">cốc</span></p>
                </div>
              </div>
            </div>

            {/* Total Summary */}
            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
              <p className="text-gray-500 text-sm mb-1">Tổng khách nhận được</p>
              <p className="text-lg font-semibold text-gray-800">
                {result.total > 0 ? (
                   <span>{result.total} cốc {parseInt(target) < result.total && <span className="text-green-600 text-sm">(Dư {result.total - parseInt(target)})</span>}</span>
                ) : '---'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

