'use client'
import React from 'react';

export default function RentalProcess() {
  return (
    <div className="col-12 c-Process">
      <div className="d-none d-sm-flex bg-black">
        <ProcessStepsDesktop />
      </div>
      <div className="d-block d-sm-none bg-black">
        <ProcessStepsMobile />
      </div>
    </div>
  );
}

const ProcessStepsDesktop = () => (
  <>
    <div className="col-1 d-flex justify-content-center align-items-center iconf">
      <img src="/images/Rent/light.png" className="img-fluid  bolt" alt />
    </div>
    <div className="col-3 text-white pt-3">
      <h2>Rental Process</h2>
      <div className="h3">租借流程說明</div>
    </div>
    <div className="col-7 ">
      <img className='pt-3 pb-2' src="/images/Rent/Process-1.png" alt />
    </div>
    <div className="col-1 d-flex justify-content-center align-items-center iconf">
      <img src="/images/Rent/light.png" className="img-fluid  bolt" alt />
    </div>
  </>
);

const ProcessStepsMobile = () => (
  <div className="col-12">
    <img src="/images/Rent/Process-mod.png" alt />
  </div>
);