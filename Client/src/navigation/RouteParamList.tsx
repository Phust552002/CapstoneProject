export type RouteParamList = {
  TabRoute:
    | undefined
    | {
        screen?: 'Menu' | 'Home' | 'Profile';
        params?: any;
      };
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  AddService: {service: any};
  EditService: {service: any};
  Feedback: undefined;
  
};

export const ProtectedScreens: Array<keyof RouteParamList> = [];
