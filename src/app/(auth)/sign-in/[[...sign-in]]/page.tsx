import { SignIn } from "@clerk/nextjs";

// Sign In Page component
export default function SignInPage() {
  return (
    <main className="flex h-screen items-center justify-center p-4">
      <SignIn />
    </main>
  );
}
