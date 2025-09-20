import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import { ModeToggle } from "./ModeToggle"

interface IProps {

}

const Nav = ({}: IProps) => {
    return(
        <nav className="flex items-center justify-between">
        <ModeToggle />

        <SignedIn>
           <UserButton />
        </SignedIn>
        <SignedOut>
           <SignInButton />
        </SignedOut>
        </nav>
    )
}

export default Nav