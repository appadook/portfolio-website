import { SignUp } from '@clerk/clerk-react';

const AdminSignupPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create Admin Account</h1>
          <p className="text-muted-foreground">
            Sign up to manage your portfolio content
          </p>
        </div>
        <SignUp
          appearance={{
            elements: {
              rootBox: 'mx-auto',
              card: 'bg-card border-border shadow-lg',
            },
          }}
          routing="path"
          path="/admin/signup"
          signInUrl="/admin/login"
          afterSignUpUrl="/admin"
        />
      </div>
    </div>
  );
};

export default AdminSignupPage;
