import { Mail, Share2 } from "@/components/icons";
import { Link } from "react-router";

export default function Footer({showAlert} : {showAlert: (message:string, title:string | null) => void}) {
    const handleShare = async () => {
        await navigator.clipboard.writeText('https://cog-nify.app');
        showAlert('Link copied to clipboard!', 'Share Cognify');
    }
  return (
     <footer className="bg-muted border-t border-border">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">

          <div className="max-w-xs">
            <span className="text-2xl font-bold text-secondary-primary tracking-tight block mb-3">
              Cognify
            </span>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Science-backed cognitive assessments to help you understand and track your brain health over time.
            </p>
          </div>
          <div className="flex items-center gap-8">
            <Link
              to="/games"
              className="text-sm font-medium text-muted-foreground hover:text-secondary-primary transition-colors duration-200 relative group"
            >
              The Games
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-secondary-primary transition-all duration-200 group-hover:w-full" />
            </Link>
            <a
              href="mailto:daverapu47@yahoo.com?subject=Cognify Support&body=Hi, I have a question about..."
              className="text-sm font-medium text-muted-foreground hover:text-secondary-primary transition-colors duration-200 relative group"
            >
              Contact
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-secondary-primary transition-all duration-200 group-hover:w-full" />
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-border text-muted-foreground text-sm hover:border-secondary-primary hover:text-secondary-primary transition-all duration-200"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <a
              href="mailto:daverapu47@yahoo.com?subject=Cognify Support&body=Hi, I have a question about..."
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity duration-200"
            >
              <Mail className="w-4 h-4" />
              Get in touch
            </a>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-muted-foreground text-xs">
            © 2026 Cognify. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs">
            Built for brain health.
          </p>
        </div>
      </div>
    </footer>
  );
}
