import { currentUser } from "@clerk/nextjs/server";
import { redirectToSignIn } from "@clerk/nextjs/server";
import { createUser, getUserById } from "../../actions/user.actions";

export const userinitialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    return redirectToSignIn();
  }

  const profile = await getUserById(user.id);

  if (profile){
    return profile;
  }

  const newProfile = await createUser({
    clerkId: user.id,
    email: user.emailAddresses?.[0].emailAddress,
    username: user.fullName as string,
    firstName: user.firstName as string,
    lastName: user.lastName as string,
    photo: user.imageUrl,
  });

  return newProfile;
}