export default function BrowserAuthPage() {
   return (
      <div className="d-flex flex-column gap-4 align-items-center justify-content-center h-100 w-100">
         <h2 className="text-center fw-bold">Авторизация...</h2>
         <div className="loader d-flex justify-content-center">
            <div className="loader-inner">
               <div className="loader-line-wrap">
                  <div className="loader-line"></div>
               </div>
               <div className="loader-line-wrap">
                  <div className="loader-line"></div>
               </div>
               <div className="loader-line-wrap">
                  <div className="loader-line"></div>
               </div>
               <div className="loader-line-wrap">
                  <div className="loader-line"></div>
               </div>
               <div className="loader-line-wrap">
                  <div className="loader-line"></div>
               </div>
            </div>
         </div>
      </div>
   );
}
