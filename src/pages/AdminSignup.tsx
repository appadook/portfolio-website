import { SignUp } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const AdminSignupPage = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-background overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-primary-glow/20 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Back to Portfolio Link */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-6 left-6 z-10"
      >
        <Link
          to="/"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="text-sm">Back to Portfolio</span>
        </Link>
      </motion.div>

      {/* Signup Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg px-6"
      >
        {/* Glassmorphic Card */}
        <div className="relative glass-effect rounded-2xl p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] border border-border/50">
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-50" />

          {/* Content */}
          <div className="relative">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center mb-8"
            >
              <h1 className="text-4xl font-black mb-3 bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
                Join Admin
              </h1>
              <p className="text-muted-foreground text-sm">
                Create an account to manage your portfolio
              </p>
            </motion.div>

            {/* Clerk SignUp Component */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <SignUp
                appearance={{
                  elements: {
                    rootBox: 'w-full',
                    card: 'bg-transparent shadow-none w-full p-0',
                    main: 'w-full',
                    header: 'hidden',
                    headerTitle: 'hidden',
                    headerSubtitle: 'hidden',
                    socialButtons: 'w-full flex flex-col gap-3',
                    socialButtonsBlockButton: 'bg-card/50 hover:bg-card/70 border border-border/70 text-foreground transition-all duration-300 hover:scale-[1.02] w-full h-12 flex items-center justify-center gap-3 rounded-lg font-medium',
                    socialButtonsBlockButtonText: 'text-foreground font-medium text-base',
                    socialButtonsBlockButtonArrow: 'hidden',
                    socialButtonsProviderIcon: 'w-5 h-5',
                    dividerLine: 'bg-border/50',
                    dividerText: 'text-muted-foreground text-sm font-normal',
                    dividerRow: 'my-8',
                    form: 'w-full flex flex-col gap-5',
                    formFieldRow: 'w-full',
                    formFieldInput: 'bg-input/50 border border-border/70 text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 w-full h-12 px-4 rounded-lg text-base font-normal',
                    formFieldLabel: 'text-foreground font-medium text-base mb-2 block',
                    formButtonPrimary: 'bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold text-base shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all duration-300 hover:scale-[1.02] w-full h-12 rounded-lg mt-2',
                    formFieldAction: 'mt-2 text-right',
                    formFieldActionLink: 'text-primary hover:text-primary-glow text-sm transition-colors font-medium',
                    footerAction: 'text-center mt-8',
                    footerActionLink: 'text-primary hover:text-primary-glow transition-colors duration-300 font-semibold text-base',
                    footerActionText: 'text-muted-foreground text-base',
                    identityPreview: 'w-full',
                    identityPreviewText: 'text-foreground text-base',
                    identityPreviewEditButton: 'text-primary hover:text-primary-glow text-sm font-medium',
                    formFieldInputShowPasswordButton: 'text-muted-foreground hover:text-foreground transition-colors',
                    formHeaderTitle: 'text-foreground text-xl font-semibold mb-4',
                    formHeaderSubtitle: 'text-muted-foreground text-base mb-6',
                    alternativeMethodsBlockButton: 'bg-card/50 hover:bg-card/70 border border-border/70 text-foreground w-full h-12 rounded-lg font-medium',
                    otpCodeFieldInput: 'bg-input/50 border border-border/70 text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 h-14 w-14 text-center text-xl font-semibold rounded-lg',
                    formResendCodeLink: 'text-primary hover:text-primary-glow text-sm font-medium',
                    footer: 'hidden',
                  },
                  layout: {
                    socialButtonsPlacement: 'top',
                    socialButtonsVariant: 'blockButton',
                  },
                }}
                routing="path"
                path="/admin/signup"
                signInUrl="/admin/login"
                afterSignUpUrl="/admin"
              />
            </motion.div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-6 text-center"
            >
              <p className="text-xs text-muted-foreground">
                Secured authentication powered by{' '}
                <span className="text-primary font-medium">Clerk</span>
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminSignupPage;
