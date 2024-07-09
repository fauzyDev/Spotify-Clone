import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const userSession = async () => {
    const session = await getServerSession(authOptions)
    return session?.user
}