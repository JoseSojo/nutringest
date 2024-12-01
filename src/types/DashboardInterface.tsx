
export interface Card {
    label: string;
    value: string | number;
    ico: string;
    child?: {
        label: string;
        value: string;
    }[]
}

export interface Graphic {
    label: string[];
    value: number[];
}

export interface SidebarChild {
    ico: string;
    label: string;
    path: string;
}

export interface Sidebar {
    ico: string;
    label: string;
    path: string | null;
    chils?: SidebarChild[]
}


export interface ActionCrudInterface {
    label: string;
    ico: any;
    path: string;
    use: `page` | `modal` | `download`
}

export interface AbstractResponseCrud {
    actionsList: ActionCrudInterface[];
    actionsUnique: ActionCrudInterface[];
    title: string;
}

export interface AbstractResponseListCrud {
    message: string;
    error: boolean;
    body: {
        extrat: string[];
        header: string[];
        list: any[];
        next: boolean;
        previw: boolean;
        now: string;
    }
}
