// components/ContractAward.js
import Image from 'next/image';

const ContractAward = () => {
  return (
    <div className="relative min-h-screen bg-white text-black font-serif">
      {/* --- Centered Low-Opacity Watermark --- */}
      <div className="fixed inset-0 z-0 flex items-center justify-center  " >
        <div className="relative w-full max-w-xl opacity-100">
          <Image
            src="/SVG/johnson-controls-logo-1.svg"
            alt="Watermark"
            width={800}
            height={600}
            className="object-contain mx-auto"
            priority
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-10 bg-white bg-opacity-80 shadow-md rounded-lg">
        
        {/* Header with Logo and Stamp */}
        <div className="flex justify-between items-center mb-8">
          <div className="relative w-48 h-16">
            <Image
              src="/SVG/johnson-controls-logo-1.svg"
              alt="Johnson Controls Logo"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <img 
            src="/approved.svg" 
            alt="Approved Stamp" 
            className="w-20 h-20" 
          />
        </div>

        {/* Contract Details */}
        <div className="mt-4">
          <p><strong>DATE:</strong> 25<sup>th</sup> Mar.2025</p>
          <p><strong>NAME:</strong> MICHAEL VARGAS</p>
          <p><strong>PHONE:</strong> +1 208 417 2734</p>
        </div>

        <h2 className="text-center mt-6 text-xl font-bold">
          ____________CONTRACT AWARD_____________
        </h2>

        <p className="mt-6">
          Dear Mr. Michael, this letter is to inform you of the contract award you got from Johnson Controls on
          25<sup>th</sup> March, 2025. We reviewed your application and after the interview with you, we have decided to
          award you a 4 months contract for building and repairs in Manila Philippines. The work will be completed
          exactly in accordance with the Drawings, Plans and specifications made.
        </p>

        <div className="mt-4 space-y-1">
          <p><strong>Date awarded:</strong> 25<sup>th</sup> March 2025</p>
          <p><strong>Date to finish:</strong> 30<sup>th</sup> July 2025</p>
          <p><strong>Amount:</strong> $19,000,000</p>
          <p><strong>Amount in words:</strong> Nineteen Million Dollars</p>
          <p><strong>Contract type:</strong> Building & Road Construction</p>
          <p><strong>Contract duration:</strong> 4 months</p>
          <p><strong>Bonus:</strong> 20%</p>
          <p><strong>Contract Number:</strong> A1667</p>
        </div>

        <p className="mt-4">
          Dear Mr. Michael, this contract awarded to you is expected to be finished before the estimated date, any
          additional cost to complete this work will be charged to the contractor. All documentary and observations
          have been done and we will expect you to start working from 2<sup>nd</sup> April 2025…
        </p>

        <p className="mt-6">Thank you</p>

        <div className="mt-8 flex justify-between items-center">
          <div className="text-center">
            <p>Signed by JOHNSON CONTROLS</p>
            <div className="h-12 w-32 border-t border-black mx-auto mt-2" />
          </div>
          <div className="text-center">
            <p>Signed by Michael Vargas</p>
            <div className="h-12 w-32 border-t border-black mx-auto mt-2" />
          </div>
        </div>

        <div className="mt-8 text-center">
          <a className="text-blue-700 underline cursor-pointer">
            Download Approved SVG
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContractAward;