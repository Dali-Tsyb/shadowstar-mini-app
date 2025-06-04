import { useTranslation } from "react-i18next";
import "../assets/css/basicDropdown.css";

export default function BasicDropdown({ options, onSelect, entity }) {
   const handleChange = (e) => {
      const selectedValue = e;
      onSelect(selectedValue);
   };

   const { t } = useTranslation();

   return (
      <>
         <div className="dropdown-menu show m-0 p-0 beige-bg brown-border">
            <div className="dropdown-menu-list d-flex flex-column justify-content-between  text-right p-0 m-0">
               {options.map((opt) => (
                  <li
                     className="dropdown-menu-item"
                     key={opt.id}
                     onClick={() => handleChange(opt)}
                  >
                     {t(`${entity}.${opt.name}`)}
                  </li>
               ))}
            </div>
         </div>
      </>
   );
}
