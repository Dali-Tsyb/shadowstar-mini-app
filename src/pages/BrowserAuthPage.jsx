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
         <h1>Авторизуйся через Telegram</h1>
         <button onClick={handleLoginClick} className="base-button brown-bg beige-text p-2">Перейти к боту</button>
      </div>
   );
}
