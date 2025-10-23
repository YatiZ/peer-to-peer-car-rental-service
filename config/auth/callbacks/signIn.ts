import { Account, Profile, User } from "next-auth";


const signIn = async({
    account,
    profile,
    user,
}:{
    account: Account | null;
  profile?: Profile;
  user: User;
}):Promise<string|boolean> => {
  try {
    if(!account){
        return true;
    }

    const {username, email} = profile as {
      username: string;
      email: string;
    }

    const generateData = await generateToken
  } catch (error) {
    
  }
}

export default signIn