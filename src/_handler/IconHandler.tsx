
import { TfiLayoutWidthDefaultAlt } from "react-icons/tfi";
import { IcoAgend, IcoAssing, IcoCancel, IcoCategory, IcoCity, IcoClose, IcoConfig, IcoCopy, IcoCountry, IcoCreate, IcoDanger, IcoDashboard, IcoDelete, IcoDoctor, IcoDownload, IcoExchange, IcoFicha, IcoFinance, IcoFinish, IcoInformation, IcoList, IcoLoad, IcoLogout, IcoMaste, IcoMenu, IcoMessage, IcoMoney, IcoNotification, IcoNutri, IcoOptions, IcoPatient, IcoPayment, IcoPermit, IcoPlus, IcoPresentation, IcoPrimitive, IcoProfile, IcoQuote, IcoRecovery, IcoReport, IcoReprogramming, IcoSelect, IcoSend, IcoShared, IcoState, IcoSubscription, IcoSuccess, IcoSupplement, IcoUnity, IcoUpdate, IcoUser, IcoUsers, IcoWarning } from "../UI/_compound/Icons/AllIcon";

type ICONS =
  | `category`
  | `program`
  | `line`
  | `dashboard`
  | `profile`
  | `logout`
  | `create`
  | `delete`
  | `update`
  | `unique`
  | `show`
  | `list`
  | `report`
  | `recovery`
  | `optionH`
  | `optionsV`
  | `submit`
  | `danger`
  | `warning`
  | `success`
  | `close`
  | `download`
  | `student`
  | `estudiante`
  | `load`
  | `users`
  | `permit`
  | `master`
  | `notification`
  | `message`
  | `assing`
  | `pluss`
  | `patient`
  | `nutricionist`
  | `cancelar`
  | `reprogramming`
  | `finish`
  | `config`
  | `share`
  | `copy`
  | `agend`
  | `calendar`
  | `information`
  | `finanza`
  | string


export function Icono({ ico,size,str }: { ico: ICONS, size?: number, str?: number }) {

  if (ico === `category`) return <IcoCategory size={size} str={str} />
  if (ico === `dashboard`) return <IcoDashboard size={size} str={str} />
  if (ico === `profile`) return <IcoProfile size={size} str={str} />
  if (ico === `logout`) return <IcoLogout size={size} str={str} />
  if (ico === `create`) return <IcoCreate size={size} str={str} />
  if (ico === `delete`) return <IcoDelete size={size} str={str} />
  if (ico === `list`) return <IcoList size={size} str={str} />
  if (ico === `recovery`) return <IcoRecovery size={size} str={str} />
  if (ico === `report`) return <IcoReport size={size} str={str} />
  if (ico === `show`) return <IcoFicha size={size} str={str} />
  if (ico === `unique`) return <IcoFicha size={size} str={str} />
  if (ico === `update`) return <IcoUpdate size={size} str={str} />
  if (ico === `optionsV`) return <IcoOptions size={size} str={str} />
  if (ico === `optionH`) return <IcoOptions size={size} str={str} />
  if (ico === `submit`) return <IcoSend size={size} str={str} />
  if (ico === `danger`) return <IcoDanger size={size} str={str} />
  if (ico === `success`) return <IcoSuccess size={size} str={str} />
  if (ico === `warning`) return <IcoWarning size={size} str={str} />
  if (ico === `close`) return <IcoClose size={size} str={str} />
  if (ico === `download`) return <IcoDownload size={size} str={str} />
  if (ico === `users`) return <IcoUsers size={size} str={str} />
  if (ico === `user`) return <IcoUser size={size} str={str} />
  if (ico === `permit`) return <IcoPermit size={size} str={str} />
  if (ico === `master`) return <IcoMaste size={size} str={str} />
  if (ico === `nutri`) return <IcoNutri size={size} str={str} />
  if (ico === `country`) return <IcoCountry size={size} str={str} />
  if (ico === `state`) return <IcoState size={size} str={str} />
  if (ico === `city`) return <IcoCity size={size} str={str} />
  if (ico === `money`) return <IcoMoney size={size} str={str} />
  if (ico === `payment`) return <IcoPayment size={size} str={str} />
  if (ico === `subscription`) return <IcoSubscription size={size} str={str} />
  if (ico === `primitive`) return <IcoPrimitive size={size} str={str} />
  if (ico === `supplement`) return <IcoSupplement size={size} str={str} />
  if (ico === `presentation`) return <IcoPresentation size={size} str={str} />
  if (ico === `unity`) return <IcoUnity size={size} str={str} />
  if (ico === `quote`) return <IcoQuote size={size} str={str} />
  if (ico === `food`) return <IcoPrimitive size={size} str={str} />
  if (ico === `menu`) return <IcoMenu size={size} str={str} />
  if (ico === `exchange`) return <IcoExchange size={size} str={str} />
  if (ico === `load`) return <IcoLoad size={size} str={str} />
  if (ico === `notification`) return <IcoNotification size={size} str={str} />
  if (ico === `message`) return <IcoMessage size={size} str={str} />
  if (ico === `assing`) return <IcoAssing size={size} str={str} />
  if (ico === `pluss`) return <IcoPlus size={size} str={str} />
  if (ico === `nutricionist`) return <IcoDoctor size={size} str={str} />
  if (ico === `patient`) return <IcoPatient size={size} str={str} />
  if (ico === `cancelar`) return <IcoCancel size={size} str={str} />
  if (ico === `reprogramming`) return <IcoReprogramming size={size} str={str} />
  if (ico === `finish`) return <IcoFinish size={size} str={str} />
  if (ico === `config`) return <IcoConfig size={size} str={str} />
  if (ico === `share`) return <IcoShared size={size} str={str} />
  if (ico === `copy`) return <IcoCopy size={size} str={str} />
  if (ico === `agend`) return <IcoAgend size={size} str={str} />
  if (ico === `calendar`) return <IcoAgend size={size} str={str} />
  if (ico === `select`) return <IcoSelect size={size} str={str} />
  if (ico === `information`) return <IcoInformation size={size} str={str} />
  if (ico === `finanza`) return <IcoFinance size={size} str={str} />

  return <TfiLayoutWidthDefaultAlt />
} 
