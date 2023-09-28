import { NavigationMenuItem } from "./types";
import { NavigationMenu } from "./constants";
import {SponsorRoutes, StudentRoutes} from "./route-data";

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
        navigationLink: `/${StudentRoutes.Root}`,
        subMenuItems: []
    },
];
