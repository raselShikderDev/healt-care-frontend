import SignUp from "@/components/modules/auth/register";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignupPage() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>
          Enter your email below to create to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignUp />
      </CardContent>
    </Card>
  );
}
