import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";

type SignupFormProps = React.ComponentProps<"form"> & {
  userName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  setUserName?: React.Dispatch<React.SetStateAction<string>>;
  setEmail?: React.Dispatch<React.SetStateAction<string>>;
  setPassword?: React.Dispatch<React.SetStateAction<string>>;
  setConfirmPassword?: React.Dispatch<React.SetStateAction<string>>;
  error: boolean;
};

export function SignupForm({
  className,
  userName,
  email,
  password,
  confirmPassword,
  setUserName,
  setEmail,
  setPassword,
  setConfirmPassword,
  error,
  ...props
}: SignupFormProps) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="relative flex flex-col items-center gap-1 mb-4 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Fill in the form below to create your account
          </p>
          <p
            className="absolute top-16 text-red-500 text-sm font-bold tracking-wide animate-in fade-in-200 "
            aria-live="polite"
          >
            {error &&
              "Please check your information and try again"}
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input
            {...(setUserName && {
              value: userName || "",
              onChange: (e) => setUserName(e.target.value),
            })}
            id="name"
            type="text"
            placeholder="John Doe"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            {...(setEmail && {
              value: email || "",
              onChange: (e) => setEmail(e.target.value),
            })}
            id="email"
            type="email"
            placeholder="m@example.com"
            required
          />
          <FieldDescription>
            We&apos;ll use this to contact you. We will not share your email
            with anyone else.
          </FieldDescription>
        </Field>
        <Field>
          <Field className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                required
                minLength={8}
                {...(setPassword && {
                  value: password || "",
                  onChange: (e) => setPassword(e.target.value),
                })}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirm-password"
                type="password"
                required
                minLength={8}
                {...(setConfirmPassword && {
                  value: confirmPassword || "",
                  onChange: (e) => setConfirmPassword(e.target.value),
                })}
              />
            </Field>
          </Field>
          <FieldDescription>
            Must be at least 8 characters long.
          </FieldDescription>
        </Field>
        <Field>
          <Button type="submit">Create Account</Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field className="grid grid-cols-1 gap-4">
          <Button variant="outline" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            <span className="sr-only">Sign up with Google</span>
          </Button>
        </Field>
        <FieldDescription className="text-center">
          Already have an account? <Link to="/login">Sign in</Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
