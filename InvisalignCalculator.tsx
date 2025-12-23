"use client";

import React, { useState, useMemo } from "react";
import { Calculator, MapPin, ExternalLink, Sparkles } from "lucide-react";

/**
 * Invisalign Cost Estimator (Standalone Widget)
 * 
 * This component provides estimated prices for Invisalign clear aligners:
 * - Case Complexity (Express, Lite, Comprehensive)
 * - Insurance Coverage Options
 * - Financing/Monthly Payment Calculations
 * 
 * Powered by FixmysmileAI (https://fixmysmile.ai)
 */
export default function InvisalignCalculator() {
  const [zipCode, setZipCode] = useState("");
  const [caseType, setCaseType] = useState("comprehensive");
  const [hasInsurance, setHasInsurance] = useState(false);

  const BASE_PRICES = {
    express: 2500,
    lite: 4000,
    comprehensive: 6000,
  };

  const INSURANCE_BENEFIT = 2000;

  const costs = useMemo(() => {
    let base = BASE_PRICES[caseType as keyof typeof BASE_PRICES] || 0;
    
    // Geo Modifier
    let geoMod = 1.0;
    if (zipCode.startsWith("9") || zipCode.startsWith("1")) geoMod = 1.15;
    if (zipCode.startsWith("3") || zipCode.startsWith("7")) geoMod = 0.9;

    let total = Math.round(base * geoMod);
    const stickerPrice = total;
    
    if (hasInsurance) {
        total = Math.max(total - INSURANCE_BENEFIT, 1000);
    }

    // Monthly Payment (typical 36-month term with avg interest)
    const monthly = Math.round(total / 36);

    return {
      stickerPrice,
      total,
      monthly,
    };
  }, [caseType, hasInsurance, zipCode]);

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden font-sans text-gray-900 my-8">
      {/* Header */}
      <div className="bg-teal-600 p-6 text-white text-center">
        <div className="flex justify-center mb-2">
           <Sparkles className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold">Invisalign Price Estimator</h2>
        <p className="text-teal-100 text-xs mt-1 uppercase tracking-widest font-semibold text-center">2025 Market Guide</p>
      </div>

      <div className="p-6 space-y-5">
        <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="text-xs font-bold text-gray-400 uppercase block mb-2">Zip Code</label>
                <input 
                  type="text"
                  placeholder="90210" 
                  className="w-full h-11 px-4 rounded-lg border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none"
                  maxLength={5}
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value.replace(/\D/g,''))}
                />
             </div>
             <div>
                <label className="text-xs font-bold text-gray-400 uppercase block mb-2">Case Level</label>
                <select 
                  className="w-full h-11 px-3 rounded-lg border border-gray-200 bg-gray-50 text-sm outline-none cursor-pointer hover:bg-white transition-colors"
                  value={caseType}
                  onChange={(e) => setCaseType(e.target.value)}
                >
                    <option value="express">Express (Minor)</option>
                    <option value="lite">Lite (Moderate)</option>
                    <option value="comprehensive">Comprehensive</option>
                </select>
             </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-teal-50/30">
            <div>
                <label className="text-sm font-bold text-gray-700">Dental Insurance?</label>
                <p className="text-[10px] text-gray-500">Typically covers $1.5k - $3k for Ortho</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={hasInsurance}
                onChange={() => setHasInsurance(!hasInsurance)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
            </label>
          </div>

          <div className="bg-gray-900 text-white rounded-2xl p-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/10 blur-2xl rounded-full"></div>
             
             <div className="flex justify-between items-end mb-6">
                <div>
                   <p className="text-[10px] text-teal-400 font-bold uppercase tracking-widest mb-1">Estimated Total</p>
                   <div className="text-2xl font-black flex items-baseline gap-2">
                      ${costs.total.toLocaleString()}
                      {hasInsurance && (
                          <span className="text-xs text-gray-500 line-through font-normal font-sans">
                             ${costs.stickerPrice.toLocaleString()}
                          </span>
                      )}
                   </div>
                </div>
                <div className="text-right">
                   <p className="text-[10px] text-teal-400 font-bold uppercase tracking-widest mb-1">Monthly</p>
                   <div className="text-2xl font-black text-teal-400 leading-none">
                      ${costs.monthly}
                   </div>
                </div>
             </div>

             <a 
               href="https://fixmysmile.ai/invisalign-cost-calculator?utm_source=github&utm_medium=open-source"
               target="_blank"
               rel="noopener noreferrer"
               className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all transform active:scale-95 text-sm"
             >
                Get Exact Quotes <ExternalLink className="w-4 h-4" />
             </a>
          </div>

          <div className="text-center pt-2">
            <p className="text-[10px] text-gray-400">
              Tool provided by <a href="https://fixmysmile.ai" className="text-teal-600 font-bold hover:underline" target="_blank" rel="noopener">FixmysmileAI</a>
            </p>
          </div>
      </div>
    </div>
  );
}
