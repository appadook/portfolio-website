import { SignIn } from '@clerk/clerk-react';

const AdminLoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Portfolio Admin</h1>
          <p className="text-muted-foreground">
            Sign in to manage your portfolio content
          </p>
        </div>
        <SignIn
          appearance={{
            elements: {
              rootBox: 'mx-auto',
              card: 'bg-card border-border shadow-lg',
            },
          }}
          routing="path"
          path="/admin/login"
          signUpUrl="/admin/signup"
          afterSignInUrl="/admin"
        />
      </div>
    </div>
  );
};

export default AdminLoginPage;
