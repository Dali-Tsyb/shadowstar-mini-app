export default function LoadingSpinner() {
   return (
      <div className="d-flex justify-content-center align-items-center h-100">
         <div>
            <div className="spinner-border" role="status">
               <span className="visually-hidden">Загрузка...</span>
            </div>
         </div>
      </div>
   );
}
