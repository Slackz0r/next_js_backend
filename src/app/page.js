import AuthForm from "@/components/AuthForm";

export default async function Home() {
  return (
    <main className="min-h-screen w-full">
      <h1>Login</h1>
      <AuthForm />
    </main>
  );
}
