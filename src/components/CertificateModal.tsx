import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { CalendarDays, Award, ExternalLink } from 'lucide-react';
import { Certificate } from '@/data/portfolio';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: Certificate | null;
  providerName: string;
}

const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  certificate,
  providerName
}) => {
  if (!certificate) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <Award className="w-6 h-6 text-primary-foreground" />
            </div>
            {certificate.name}
          </DialogTitle>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Certificate Image */}
          <div className="flex justify-center">
            <Card className="p-6 bg-gradient-card border-0 shadow-card">
              <div className="relative">
                <img
                  src={certificate.image}
                  alt={`${certificate.name} Certificate`}
                  className="max-w-full h-auto rounded-lg shadow-lg"
                  onError={(e) => {
                    // Fallback to a placeholder if image fails to load
                    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' fill='%23e5e7eb'%3E%3Crect width='100%25' height='100%25'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='16' fill='%236b7280' text-anchor='middle' dy='.3em'%3ECertificate Badge%3C/text%3E%3C/svg%3E";
                  }}
                />
                <div className="absolute -top-2 -right-2">
                  <Badge variant="secondary" className="bg-gradient-primary text-primary-foreground">
                    {certificate.year}
                  </Badge>
                </div>
              </div>
            </Card>
          </div>

          {/* Certificate Details */}
          <div className="space-y-4">
            {/* Provider & Date */}
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Award className="w-4 h-4" />
                <span>Issued by {certificate.issuer || providerName}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="w-4 h-4" />
                <span>Certified in {certificate.year}</span>
              </div>
            </div>

            {/* Description */}
            {certificate.description && (
              <Card className="p-4 bg-gradient-subtle border-0">
                <p className="text-sm leading-relaxed text-center">
                  {certificate.description}
                </p>
              </Card>
            )}

            {/* Skills */}
            {certificate.skills && certificate.skills.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold mb-3 text-center">Skills Demonstrated</h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  {certificate.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Credential ID */}
            {certificate.credentialId && (
              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  Credential ID: <span className="font-mono">{certificate.credentialId}</span>
                </p>
              </div>
            )}

            {/* Verification Link */}
            {certificate.verificationUrl && (
              <div className="flex justify-center">
                <a
                  href={certificate.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity duration-200"
                >
                  <ExternalLink className="w-4 h-4" />
                  Verify Certificate
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default CertificateModal;
