import { SignUp } from "@clerk/nextjs";

// SignUpPage component
export default function SignUpPage() {
  return (
    <main className="flex h-screen items-center justify-center p-4">
      <SignUp />
    </main>
  );
}
