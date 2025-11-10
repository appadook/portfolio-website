import { useUser, UserButton } from '@clerk/clerk-react';
import { useEffect } from 'react';

const SANITY_STUDIO_URL = import.meta.env.VITE_SANITY_STUDIO_URL || 'https://kurtik-portfolio.sanity.studio';

const AdminPage = () => {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    // Redirect to Sanity Studio hosted URL
    window.location.href = SANITY_STUDIO_URL;
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold">Portfolio Admin</h1>
            {user && (
              <span className="text-sm text-muted-foreground">
                Welcome, {user.firstName || user.emailAddresses[0].emailAddress}
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to Portfolio
            </a>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: 'w-9 h-9',
                  userButtonPopoverCard: 'bg-white border-gray-200',
                  userButtonPopoverActionButton: 'text-gray-900 hover:bg-gray-100',
                  userButtonPopoverActionButtonText: 'text-gray-900',
                  userButtonPopoverActionButtonIcon: 'text-gray-700',
                  userButtonPopoverFooter: 'hidden',
                }
              }}
              afterSignOutUrl="/admin/login"
            />
          </div>
        </div>
      </header>

      {/* Redirecting message */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Redirecting to Sanity Studio...</h2>
          <p className="text-muted-foreground mb-6">
            You're being redirected to the Sanity Studio to manage your content.
          </p>
          <a
            href={SANITY_STUDIO_URL}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Open Sanity Studio
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
