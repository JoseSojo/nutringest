
export type CRUDS =
    | `user`
    | `country`
    | `state`
    | `city`
    | `money`
    | `payment`
    | `primitive`
    | `presentation`
    | `subscription`
    | `supplement`
    | `unity`
    | `exchange`
    | `menu`
    | `food`
    | `quote`
    | `quote/exchange`
    | `quote/menu`
    ;

export interface ErrorInputStruct {
    input: string;
    label: string;
    active: boolean;
}
