
export type CRUDS =
    | `user`
    | `country`
    | `state`
    | `city`
    | `money`
    | `payment`
    | `primitive`
    | `presentation`
    | `supplement`
    | `unity`
    | `exchange`
    | `menu`
    | `food`
    | `quote`
    ;

export interface ErrorInputStruct {
    input: string;
    label: string;
    active: boolean;
}
