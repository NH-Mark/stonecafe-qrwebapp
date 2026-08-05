export interface Category {

    id: number;

    name: string;
    name_ar: string;
    image: string;

    description?: string;
    description_ar?: string;

    sort_order: number;
    parent_id: number;
    active: boolean;
    menu_items_count?: number;
}