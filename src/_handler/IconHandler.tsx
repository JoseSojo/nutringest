
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
    BsVirus2

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
    if(ico === `primitive`) return <BsVirus2 />
    if(ico === `supplement`) return <BsPalette />
    if(ico === `presentation`) return <BsApple />
    if(ico === `unity`) return <BsVirus />
    if(ico === `quote`) return <BsCalendar2CheckFill />
    if(ico === `food`) return <BsVirus />
    if(ico === `menu`) return <BsReceipt />
    if(ico === `exchange`) return <BsClipboard2Minus />
    if(ico === `load`) return <BsClockHistory />
    if(ico === `notification`) return <BsBellFill />
    if(ico === `message`) return <BsChatFill />
    if(ico === `assing`) return <BsSignpostFill />
    if(ico === `pluss`) return <BsPlus />

    return <TfiLayoutWidthDefaultAlt />
} 
