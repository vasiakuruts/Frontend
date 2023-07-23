export interface IPropsLogin {
  setPassword: (volue: string) => void;
  setEmail: (volue: string) => void;
  navigate: (to: string) => void;
}

export interface IPropsRegister {
  setEmail: (volue: string) => void;
  setPassword: (volue: string) => void;
  setRepeatPassword: (volue: string) => void;
  setFirstName: (volue: string) => void;
  setUsername: (volue: string) => void;
  navigate: (volue: string) => void;
}
export interface IAuthState {
  user:IPublicUser,
  isLogged:boolean
}

interface IPublicUser {
  id: number | null;
  firstName: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  watchlist: [IWatchlist];

} 
interface IWatchlist {
  id: number | null;
  name: string;
  assetId: string;
  createdAt: string;
  updatedAt: string;
  user: number | null
}