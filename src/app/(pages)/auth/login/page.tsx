import { Info } from "./_components/info";
import { Login } from "./_components/login";

export default function LoginPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <Info />
      <Login />
    </div>
  );
}
