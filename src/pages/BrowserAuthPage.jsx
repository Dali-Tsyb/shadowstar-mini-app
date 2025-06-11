export default function BrowserAuthPage() {
   const botUsername = "Shadowstar_master_bot";
   const miniAppUrl = encodeURIComponent(
      window.location.origin + "/"
   );
   const deepLink = `tg://resolve?domain=${botUsername}&start=webapp_${miniAppUrl}?mode=browser`;

   const handleLoginClick = () => {
      window.location.href = deepLink;
   };

   return (
      <div className="d-flex flex-column gap-4 align-items-center justify-content-center h-100 w-100">
         <h4 className="fw-bold">Авторизуйся через Telegram</h4>
         <button onClick={handleLoginClick} className="base-button brown-bg beige-text rounded">Перейти к боту</button>
      </div>
   );
}
