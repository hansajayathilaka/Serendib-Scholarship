import { NavigationMenuItem } from "./types";
import { NavigationMenu } from "./constants";
import {SponsorRoutes} from "./route-data";

export const NavigationMenuItems: NavigationMenuItem[] = [
    {
        menuText: NavigationMenu.SPONSORS,
        iconName: "person",
        navigationLink: `/${SponsorRoutes.Root}`,
        subMenuItems: []
    },
    {
        menuText: NavigationMenu.STUDENTS,
        iconName: "school",
        // navigationLink: `/${ProjectRoutes.Root}`,
        navigationLink: `/${SponsorRoutes.Root}`,
        subMenuItems: []
    },
];
