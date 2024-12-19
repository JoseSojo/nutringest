
import { TfiLayoutWidthDefaultAlt } from "react-icons/tfi";
import { 
    BsApple,
    BsAspectRatio,
    BsBank,
    BsBarChartLineFill,
    BsBellFill,
    BsBookHalf,
    BsCalendar2CheckFill,
    BsCardText,
    BsChatFill,
    BsCheckCircleFill,
    BsClipboard2Fill,
    BsClipboard2Minus,
    BsClockHistory,
    BsCoin,
    BsDownload,
    BsExclamationOctagonFill,
    BsExclamationTriangleFill,
    BsEyeFill,
    BsFillFilePdfFill,
    BsFillFloppyFill,
    BsFillPersonFill,
    BsFillTrashFill,
    BsFillXCircleFill,
    BsGripHorizontal,
    BsGripVertical,
    BsHandIndexThumb,
    BsListTask,
    BsMask,
    BsPalette,
    BsPaypal,
    BsPenFill,
    BsPeopleFill,
    BsPlus,
    BsPower,
    BsReceipt,
    BsSendFill,
    BsSignpostFill,
    BsStack,
    BsVirus,
    BsPersonExclamation,
    BsPersonArmsUp,
    BsFillSignStopFill,
    BsCalendar3Week,
    BsBookmarkCheckFill,
    BsCloudLightningFill,
    BsFillShareFill,
    BsCopy

} from "react-icons/bs";

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
    | string


export function Icono ({ico}:{ico: ICONS}) {

    if(ico === `category`) return <TfiLayoutWidthDefaultAlt />
    if(ico === `dashboard`) return <BsBarChartLineFill />
    if(ico === `line`) return <BsBookHalf />
    if(ico === `profile`) return <BsFillPersonFill />
    if(ico === `program`) return <BsListTask />
    if(ico === `logout`) return <BsPower />
    if(ico === `create`) return <BsFillFloppyFill />
    if(ico === `delete`) return <BsFillTrashFill />
    if(ico === `list`) return <BsCardText />
    if(ico === `recovery`) return <></>
    if(ico === `report`) return <BsFillFilePdfFill />
    if(ico === `show`) return <BsEyeFill />
    if(ico === `unique`) return <BsEyeFill />
    if(ico === `update`) return <BsPenFill />
    if(ico === `optionsV`) return <BsGripVertical />
    if(ico === `optionH`) return <BsGripHorizontal />
    if(ico === `submit`) return <BsSendFill />
    if(ico === `danger`) return <BsExclamationOctagonFill />
    if(ico === `success`) return <BsCheckCircleFill />
    if(ico === `warning`) return <BsExclamationTriangleFill />
    if(ico === `close`) return <BsFillXCircleFill />
    if(ico === `download`) return <BsDownload />
    if(ico === `users`) return <BsPeopleFill />
    if(ico === `permit`) return <BsHandIndexThumb />
    if(ico === `master`) return <BsMask />
    if(ico === `nutri`) return <BsApple />
    if(ico === `country`) return <BsAspectRatio />
    if(ico === `state`) return <BsStack />
    if(ico === `city`) return <BsBank />
    if(ico === `money`) return <BsCoin />
    if(ico === `payment`) return <BsPaypal />
    if(ico === `subscription`) return <BsClipboard2Fill />
    if(ico === `nutri`) return <BsApple />
    if(ico === `primitive`) return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
    <path d="M15 2a1 1 0 0 1 .117 1.993l-.117 .007c-.693 0 -1.33 .694 -1.691 1.552a5.1 5.1 0 0 1 1.982 -.544l.265 -.008c2.982 0 5.444 3.053 5.444 6.32c0 3.547 -.606 5.862 -2.423 8.578c-1.692 2.251 -4.092 2.753 -6.41 1.234a.31 .31 0 0 0 -.317 -.01c-2.335 1.528 -4.735 1.027 -6.46 -1.27c-1.783 -2.668 -2.39 -4.984 -2.39 -8.532l.004 -.222c.108 -3.181 2.526 -6.098 5.44 -6.098c.94 0 1.852 .291 2.688 .792c.419 -1.95 1.818 -3.792 3.868 -3.792m-7.034 6.154c-1.36 .858 -1.966 2.06 -1.966 3.846a1 1 0 0 0 2 0c0 -1.125 .28 -1.678 1.034 -2.154a1 1 0 1 0 -1.068 -1.692"></path>
  </svg>
    if(ico === `supplement`) return <BsPalette />
    if(ico === `presentation`) return <BsApple />
    if(ico === `unity`) return <BsVirus />
    if(ico === `quote`) return <BsCalendar2CheckFill />
    if(ico === `food`) return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
    <path d="M15 2a1 1 0 0 1 .117 1.993l-.117 .007c-.693 0 -1.33 .694 -1.691 1.552a5.1 5.1 0 0 1 1.982 -.544l.265 -.008c2.982 0 5.444 3.053 5.444 6.32c0 3.547 -.606 5.862 -2.423 8.578c-1.692 2.251 -4.092 2.753 -6.41 1.234a.31 .31 0 0 0 -.317 -.01c-2.335 1.528 -4.735 1.027 -6.46 -1.27c-1.783 -2.668 -2.39 -4.984 -2.39 -8.532l.004 -.222c.108 -3.181 2.526 -6.098 5.44 -6.098c.94 0 1.852 .291 2.688 .792c.419 -1.95 1.818 -3.792 3.868 -3.792m-7.034 6.154c-1.36 .858 -1.966 2.06 -1.966 3.846a1 1 0 0 0 2 0c0 -1.125 .28 -1.678 1.034 -2.154a1 1 0 1 0 -1.068 -1.692"></path>
  </svg>
    if(ico === `menu`) return <BsReceipt />
    if(ico === `exchange`) return <BsClipboard2Minus />
    if(ico === `load`) return <BsClockHistory />
    if(ico === `notification`) return <BsBellFill />
    if(ico === `message`) return <BsChatFill />
    if(ico === `assing`) return <BsSignpostFill />
    if(ico === `pluss`) return <BsPlus />
    if(ico === `nutricionist`) return <BsPersonExclamation />
    if(ico === `patient`) return <BsPersonArmsUp />
    if(ico === `cancelar`) return <BsFillSignStopFill />
    if(ico === `reprogramming`) return <BsCalendar3Week />
    if(ico === `finish`) return <BsBookmarkCheckFill />
    if(ico === `config`) return <BsCloudLightningFill />
    if(ico === `share`) return <BsFillShareFill />
    if(ico === `copy`) return <BsCopy />

    return <TfiLayoutWidthDefaultAlt />
} 
